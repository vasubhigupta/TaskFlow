import database
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List,Optional
from fastapi import HTTPException, status, Query



router = APIRouter(tags=["todos"])
# conn = database.get_db()
# cursor = conn.cursor()

class Todo(BaseModel):
    title: str
    descr: str
    status: str


#get all todos
@router.get('/api/v1/todos',status_code=status.HTTP_200_OK)
def get_all_todos(limit: Optional[int] = Query(10), offset:Optional[int] = Query(0)) -> List[dict]: 

    start_idx = int(offset)
    end_idx = start_idx + int(limit)

    query = "select title,descr,status from todo"
    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    cursor.execute(query)
    todos_from_db = cursor.fetchall() # list of tuples
    #print("Fetched Data:", todos_from_db)
    todos = [] # list of dict
    for row in todos_from_db:
        todos.append({"title" : row[0]
                    ,"descr" : row[1]
                    ,"status" : row[2]
                    })
    cursor.close()
    conn.close()

    return todos[start_idx: end_idx]


#particular todo by title
@router.get('/api/v1/todos/title/{title}', status_code=status.HTTP_200_OK) 
def get_todos_by_title(title: str) -> dict: #this return only one todo as dictionay, to return all todos with similar name convert return type to list

    query = f"select title,descr,status from todo where title ='{title}'"
    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    cursor.execute(query)
    todos_from_db = cursor.fetchall() # single row

    #print("Fetched Data:", todos_from_db)

    todos = [] # list of dict
    for row in todos_from_db:
        todos.append({"title" : row[0]
                    ,"descr" : row[1]
                    ,"status" : row[2]
                    })
    cursor.close()
    conn.close()

    if len(todos):
        return todos[0]
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"todo not found with this {title}")


#get todos by status
@router.get('/api/v1/todos/status/{status}', status_code=status.HTTP_200_OK) 
def get_todos_by_status(status: str) -> List[dict]:


    query = f"select title,descr,status from todo where status ='{status}'"
    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    cursor.execute(query)
    todos_from_db = cursor.fetchall() # single row

    #print("Fetched Data:", todos_from_db)

    todos = [] # list of dict
    for row in todos_from_db:
        todos.append({"title" : row[0]
                    ,"descr" : row[1]
                    ,"status" : row[2]
                    })
    cursor.close()
    conn.close()

    if len(todos):
        return todos
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"todo not found with this {status}")    



#create a todo and enforce that title is unique
@router.post('/api/v1/todos/createTodo', status_code=status.HTTP_200_OK)
def create_Todo(todo: Todo):

    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()

    # Check if the todo already exists
    query = "SELECT title FROM todo WHERE title = %s"
    cursor.execute(query, (todo.title,))  # Use parameterized queries
    existing_todo = cursor.fetchone()

    if existing_todo:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Todo with title '{todo.title}' already exists.")

    # Insert new todo (Prevent SQL Injection)
    query = "INSERT INTO todo (title, descr, status) VALUES (%s, %s, %s)"
    cursor.execute(query, (todo.title, todo.descr, todo.status))
    conn.commit()

    cursor.close()
    conn.close()
    
    return {"message": "Todo created successfully"}
  

@router.put('/api/v1/todos/updateTodo', status_code=status.HTTP_200_OK)
def updateTodo(payload:dict):

    query = f"update todo set descr = '{payload['descr']}', status = '{payload['status']}' where title = '{payload['title']}' "
    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    cursor.close()
    conn.close() 
    return {"message" : "Todo updated successfully"}


@router.delete('/api/v1/todos/delete-by-title/{title}', status_code=status.HTTP_200_OK)
def deleteTodo(title: str):
    query = f" delete from todo where title = '{title}';"
    conn = database.get_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    cursor.close()
    conn.close() 
    return {"message" : "Todo deleted successfully"}


#status
    # res = []
    # todos = []
    # for todo in todos:
    #     if todo['status'] == status:
    #         res.append(todo)
    # return res

