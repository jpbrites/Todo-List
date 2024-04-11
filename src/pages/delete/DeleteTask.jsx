// DeleteTask.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './deletetask.css';
import Snackbar from '../../components/snackbar/Snackbar';

function DeleteTask() {
    const { id } = useParams(); 
    const [task, setTask] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTaskData(id);

        async function fetchTaskData(taskId) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/list/${taskId}`); 
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados da tarefa');
                }
                const data = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Erro ao buscar os dados da tarefa:', error);
            }
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Tarefa deletada com sucesso!');
                setSuccessMessage('Dados excluídos com sucesso!');
                window.location.href = '/my_tasks'; // Use window.location.href para navegar para a página de listagem de tarefas

            } else {
                console.error('Erro ao deletar a tarefa.');
                setErrorMessage('Falha ao deletar os dados.');
            }
        } catch (error) {
            console.error('Erro ao deletar a tarefa:', error);
        }
    };

    return (
        <div className="delete-task">
            <h1>Excluir Tarefa</h1>
            {task && (
                <div>
                    <div className='form-group'>
                        <label>Títul:</label>
                        <input type="text" value={task.title} disabled />
                    </div>
                    <div className='form-group'>
                        <label>Descrição:</label>
                        <textarea id='description' value={task.description} disabled />
                    </div>
                    <div className='form-group'>
                        <label>Status:</label>
                        <input type="text" value={task.status} disabled />
                    </div>
                    <button className='button-delete' onClick={handleDelete}>Deletar</button>
                </div>
            )}
            <Snackbar message={successMessage || errorMessage} isSuccess={successMessage !== ''} />
        </div>
    );
}

export default DeleteTask;
