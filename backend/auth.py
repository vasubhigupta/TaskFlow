import database
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List,Optional
from fastapi import HTTPException, status, Query



router = APIRouter(tags=["auth"])

@router.get('/signup')
def sign_up():
    return 