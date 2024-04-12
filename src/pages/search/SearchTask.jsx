import React, { useState } from 'react';
import './searchtask.css';
import { format } from 'date-fns';

function SearchTask() {
    const [query, setQuery] = useState('');
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            if (!isNaN(query)) { // Se a query for um número (ID)
                const response = await fetch(`http://127.0.0.1:8000/api/list/${query}`);
                if (!response.ok) {
                    throw new Error('Tarefa não encontrada');
                }
                const data = await response.json();
                
                setTask(data);
                setError('');
            } else { // Se a query não for um número (Título)
                const response = await fetch('http://127.0.0.1:8000/api/list');
                if (!response.ok) {
                    throw new Error('Erro ao buscar as tarefas');
                }
                const data = await response.json();
                const matchingTask = data.find(task => task.title.toLowerCase() === query.toLowerCase());
                if (!matchingTask) {
                    throw new Error('Tarefa não encontrada');
                }
                setTask(matchingTask);
                setError('');
            }
        } catch (error) {
            setError(error.message);
            setTask(null);
        }
    };

    return (
        <div className="search-task">
            <h1>Buscar Tarefa</h1>
            <div className='conj-search'>
                <input
                    type="text"
                    placeholder="Digite o ID ou título da tarefa"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='button-buscar' onClick={handleSearch}>Buscar</button>
            </div>
            {error && <p className="error">{error}</p>}
            {task && (
                <>
                <h2>Tarefa Encontrada</h2>
                <div className="task-details">
                    <span className='title'>{task.title}</span>
                    <span className='description'>{task.description}</span>
                    <span className='status'>Status: {task.status}</span>
                    <span className='created-at'>{format(new Date(task.created_at), 'dd/MM/yyyy')}</span>
                </div>
                </>
            )}
        </div>
    );
}

export default SearchTask;
