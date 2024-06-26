import React, { useState } from 'react'
import './home.css'
import Fundo from '../../assets/fundo.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <img src={Fundo} alt="Welcome" className="welcome-image" />
      <h1>Bem-Vindo!</h1>
      <span>Comece a organizar suas tarefas de forma eficiente e produtiva agora mesmo!</span>
      <Link to="/cadastro"><button>Adicionar Tarefa</button></Link>
    </div>
  )
}

export default Home