import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  
  let title = props.title;
  let description = props.desc || "default description";
  let status = props.status;
  let createAt = props.createAt;
  let borderColor = props.borderColor;

  return (
    <div className='TodoItem' style={{ borderTop: `6px solid ${borderColor}` }} >
      <h2>{title}</h2>
      <p>{description}</p>
      <div className='stats'></div>
      <p className='para'>{status}</p>
      <p>created at: {createAt}</p>
    </div>
  )
}

export default TodoItem