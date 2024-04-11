// DeleteTask.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importe useParams para acessar parâmetros da URL e Link para navegação
import './deletetask.css';
import Snackbar from '../../components/snackbar/Snackbar';

function DeleteTask() {
    const { id } = useParams(); // Use useParams para acessar parâmetros da URL
    const [task, setTask] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Simulação de busca de dados da tarefa a ser deletada
        fetchTaskData(id); // Use o ID da tarefa para buscar os dados

        // Função para buscar os dados da tarefa
        async function fetchTaskData(taskId) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/list/${taskId}`); // Substitua pela sua rota de API para buscar os detalhes da tarefa
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados da tarefa');
                }
                const data = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Erro ao buscar os dados da tarefa:', error);
                // Lide com o erro de busca aqui
            }
        }
    }, [id]); // Adicione id como dependência para refetching quando o ID mudar

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
