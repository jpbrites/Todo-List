import React, { useState, useEffect } from 'react';
import './updatetask.css';
import { useParams } from 'react-router-dom';
import Snackbar from '../../components/snackbar/Snackbar';

function UpdateTask() {
    const { id } = useParams(); // Use useParams para acessar parâmetros da URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [success, setSuccess] = useState(false);
    const [taskData, setTaskData] = useState(null); 
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Simulação de busca de dados da tarefa a ser atualizada
        fetchTaskData(id); // Use o ID da tarefa para buscar os dados

        // Função para buscar os dados da tarefa
        async function fetchTaskData(taskId) {
            console.log('id: '+taskId)
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/list/${taskId}`); // Substitua pela sua rota de API para buscar os detalhes da tarefa
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados da tarefa');
                }
                const data = await response.json();
                setTaskData(data);
            } catch (error) {
                console.error('Erro ao buscar os dados da tarefa:', error);
                // Lide com o erro de busca aqui
            }
        }
    }, [id]); // Adicione id como dependência para refetching quando o ID mudar

    useEffect(() => {
        // Preencher os campos de entrada com os dados da tarefa
        if (taskData) {
            setTitle(taskData.title);
            setDescription(taskData.description);
            setStatus(taskData.status);
        }
    }, [taskData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação dos campos
        let isValid = true;
        if (!title.trim()) {
            setTitleError('Campo obrigatório');
            isValid = false;
        } else {
            setTitleError('');
        }
        if (!description.trim()) {
            setDescriptionError('Campo obrigatório');
            isValid = false;
        } else {
            setDescriptionError('');
        }
        if (!status) {
            setStatusError('Campo obrigatório');
            isValid = false;
        } else {
            setStatusError('');
        }

        if (isValid) {
            console.log('Dados a serem atualizados:', { title, description, status });

            try {
                const taskId = id; // Obter o ID da tarefa da URL
                const response = await fetch(`http://127.0.0.1:8000/api/update/${taskId}`, {
                    method: 'PUT', // Use o método PUT para atualização
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, description, status })
                });

                if (response.ok) {
                    setSuccessMessage('Dados atualizados com sucesso!');
                    setSuccess(true);
                } else {
                    setErrorMessage('Falha ao atualizar os dados.');
                    console.error('Falha ao atualizar os dados.');
                }
            } catch (error) {
                console.error('Erro ao atualizar os dados:', error);
            }
        }
    };

    return (
        <div className='container-updatetask'>
            <h1>Atualize sua tarefa</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tíullo:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {titleError && <p className="error-message">{titleError}</p>}
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    {descriptionError && <p className="error-message">{descriptionError}</p>}
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <div className="status-options">
                        <label className="radio-label">
                            <input type="radio" value="Não Iniciado" checked={status === 'Não Iniciado'} onChange={() => setStatus('Não Iniciado')} />
                            <span className="radio-custom"></span>
                            Não Iniciado
                        </label>
                        <label className="radio-label">
                            <input type="radio" value="Em Andamento" checked={status === 'Em Andamento'} onChange={() => setStatus('Em Andamento')} />
                            <span className="radio-custom"></span>
                            Em Andamento
                        </label>
                        <label className="radio-label">
                            <input type="radio" value="Concluído" checked={status === 'Concluído'} onChange={() => setStatus('Concluído')} />
                            <span className="radio-custom"></span>
                            Concluído
                        </label>
                    </div>
                    {statusError && <p className="error-message">{statusError}</p>}
                </div>
                <button type="submit">Atualizar</button>
            </form>
            <Snackbar message={successMessage || errorMessage} isSuccess={successMessage !== ''} />

        </div>
    );
}

export default UpdateTask;
