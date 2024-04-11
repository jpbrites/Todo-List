import React, { useState, useEffect } from 'react';

import './mytasks.css';
import Task from '../../components/task/Task';
import { Link } from 'react-router-dom';

function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/list');
                if (!response.ok) {
                    throw new Error('Erro ao buscar as tarefas');
                }
                const data = await response.json();
                setTasks(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    const groupedTasks = tasks.reduce((grouped, task) => {
        if (!grouped[task.status]) {
            grouped[task.status] = [];
        }
        grouped[task.status].push(task);
        return grouped;
    }, {});
    const hasTasks = Object.values(groupedTasks).some(tasks => tasks.length > 0);
    console.log(tasks)

    return (
        <div className="my-tasks">
            <h1>Minhas Tarefas</h1>
            {hasTasks ? (
                <div className="task-columns">
                    <div className="task-column">
                        <h2>Não Iniciado</h2>
                        <ul>
                            {groupedTasks['Não Iniciado'] &&
                                groupedTasks['Não Iniciado'].map(task => (
                                    <li key={task.id}>
                                        <Task title={task.title} description={task.description} id={task.id} status={task.status} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="task-column">
                        <h2>Em Andamento</h2>
                        <ul>
                            {groupedTasks['Em Andamento'] &&
                                groupedTasks['Em Andamento'].map(task => (
                                    <li key={task.id}>
                                        <Task title={task.title} description={task.description} id={task.id} status={task.status} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="task-column">
                        <h2>Concluído</h2>
                        <ul>
                            {groupedTasks['Concluído'] &&
                                groupedTasks['Concluído'].map(task => (
                                    <li key={task.id}>
                                        <Task title={task.title} description={task.description} id={task.id} status={task.status} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>

                <div style={{marginBottom: '1rem'}}>Não há tarefas disponíveis.</div>
                <Link to="/cadastro"><button>Adicionar agora</button></Link>
                </div>
            )}
        </div>
    );
}

export default MyTasks;
