import React, { useState } from 'react';
import './cadastro.css';
import Snackbar from '../../components/snackbar/Snackbar';

function Cadastro() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [statusError, setStatusError] = useState('');

    const [success, setSuccess] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
            console.log('Dados a serem enviados:', { title, description, status });

            try {
                const response = await fetch('http://127.0.0.1:8000/api/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, description, status })
                });

                if (response.ok) {
                    console.log('Dados enviados com sucesso!');
                    setSuccess(true)
                    setSuccessMessage('Tarefa Criada Com Sucesso!');
                    setTitle('');
                    setDescription('');
                    setStatus('');
                } else {
                    setErrorMessage('Falha ao criar tarefa');
                    console.error('Falha ao enviar os dados.');
                }
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
            }
        }
    };

    return (
        <div className='container-cadastro'>
            <h1>Cadastre sua tarefa</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título:</label>
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
                <button type="submit">Cadastrar</button>
            </form>
            <Snackbar message={successMessage || errorMessage} isSuccess={successMessage !== ''} />

        </div>
        
    )
}

export default Cadastro;
