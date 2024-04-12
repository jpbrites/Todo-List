// Task.js
import React from 'react';
import { Link } from 'react-router-dom';
import './task.css';
import { MdEdit, MdDelete } from 'react-icons/md';

function Task({ title, description, id, status, time }) {
    console.log(id)
    return (
        <div className="task-container">
            <div className='conj-info-task'>
                <span className='title-task'>{title}</span>
                <p className='description-task'>{description}</p>
            </div>

            <div className='conj-icons-task'>
                <Link to={`/update/${id}`} style={{color: 'black'}}>
                    <MdEdit className='edit' size={20}/>
                </Link>
                <Link to={`/delete/${id}`} style={{color: 'red'}}>
                    <MdDelete className='delete' size={20}/>

                </Link>
            </div>
        </div>
    );
}

export default Task;
