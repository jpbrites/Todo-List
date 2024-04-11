# Documentação de Instalação e Configuração da Aplicação Todo List #

Esta documentação descreve os passos necessários para instalar e configurar a aplicação Todo List, que consiste em um front-end React e um back-end Laravel.

## Requisitos do Sistema
- Node.js e npm (para o front-end React)
- PHP e Composer (para o back-end Laravel)
- MySQL ou outro banco de dados compatível
  
## Instalação

### Clonar o Repositório:

Clone o repositório do GitHub em sua máquina local:
```
git clone https://github.com/jpbrites/Todo-List
```
### Instalar Dependências do Front-end:

Navegue até a pasta do front-end React:
```
cd todo
```
Instale as dependências usando npm:
```
npm install
```
### Instalar Dependências do Back-end:

Navegue até a pasta do back-end Laravel:
```
cd todo/todo-back
```
Instale as dependências usando o Composer:

```
composer install
```
### Configuração do Banco de Dados:

Configure as credenciais do banco de dados no arquivo .env na pasta todo-back. Você pode usar o arquivo .env.example como referência.

Execute as migrações para criar as tabelas necessárias no banco de dados:

```
php artisan migrate
```
## Executando a Aplicação
### Iniciar o Servidor Back-end:

Navegue até a pasta do back-end Laravel:
```
cd todo/todo-back
```
Inicie o servidor PHP embutido:

```
php artisan serve
```
O servidor estará disponível em http://localhost:8000.

### Iniciar o Servidor Front-end:

Navegue até a pasta do front-end React:
```
cd ..
```
Inicie o servidor de desenvolvimento do React:
```
npm start
```
O front-end estará disponível em http://localhost:3000.

## Uso
Acesse a aplicação no seu navegador usando o endereço http://localhost:3000. Você pode se cadastrar, visualizar, editar e excluir suas tarefas.

# Documentação dos Endpoints da API REST
A API REST da aplicação Todo List oferece endpoints para criar, listar, visualizar, atualizar e excluir tarefas.

## Criar uma tarefa
Endpoint: POST /api/create

Este endpoint permite criar uma nova tarefa.

### Parâmetros da Requisição
- title (string): Título da tarefa.
- description (string): Descrição da tarefa.
- status (string): Status da tarefa.

### Respostas
- Status: 201 Created

Tarefa criada com sucesso.
Exemplo de resposta:

```
{
    "message": "Tarefa cadastrada com sucesso"
}
```
- Status: 404 Not Found

Erro ao cadastrar a tarefa.
Exemplo de resposta:

```
{
    "message": "Erro ao cadastrar tarefa"
}
```

## Listar Todas as Tarefas
Endpoint: GET /api/list

Este endpoint retorna todas as tarefas cadastradas.

### Resposta
- Status: 200 OK
Lista de todas as tarefas.
Exemplo de resposta:

```
[
    {
        "id": 1,
        "title": "Tarefa 1",
        "description": "Descrição da tarefa 1",
        "created_at": "2024-04-12T12:00:00Z",
        "updated_at": "2024-04-12T12:00:00Z"
    },
    {
        "id": 2,
        "title": "Tarefa 2",
        "description": "Descrição da tarefa 2",
        "created_at": "2024-04-12T12:00:00Z",
        "updated_at": "2024-04-12T12:00:00Z"
    }
]
```

## Listar uma Tarefa Específica
Endpoint: GET /api/list/{id}

Este endpoint retorna uma tarefa específica com base no seu ID.

### Parâmetros da Requisição
- id (integer): ID da tarefa a ser visualizada.
  
### Respostas
- Status: 200 OK

Tarefa encontrada.
Exemplo de resposta:

```
{
    "id": 1,
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "created_at": "2024-04-12T12:00:00Z",
    "updated_at": "2024-04-12T12:00:00Z"
}
```
- Status: 404 Not Found

Erro ao encontrar a tarefa.
Exemplo de resposta:

```
{
    "message": "Erro ao encontrar tarefa"
}
```

## Atualizar uma Tarefa
Endpoint: PUT /api/update/{id}

Este endpoint permite atualizar uma tarefa existente com base no seu ID.

### Parâmetros da Requisição
- id (integer): ID da tarefa a ser atualizada.
- title (string): Novo título da tarefa.
- description (string): Nova descrição da tarefa.
- status (string): Novo status da tarefa.
  
### Respostas
- Status: 200 OK

Tarefa atualizada com sucesso.
Exemplo de resposta:

```
{
    "id": 1,
    "title": "Tarefa 1 Atualizada",
    "description": "Nova descrição da tarefa 1",
    "created_at": "2024-04-12T12:00:00Z",
    "updated_at": "2024-04-12T12:30:00Z"
}
```
- Status: 404 Not Found

Erro ao atualizar a tarefa.
Exemplo de resposta:

```
{
    "message": "Erro ao atualizar tarefa"
}
```
## Excluir uma Tarefa
Endpoint: DELETE /api/delete/{id}

Este endpoint permite excluir uma tarefa existente com base no seu ID.

### Parâmetros da Requisição
- id (integer): ID da tarefa a ser excluída.
  
### Respostas
- Status: 200 OK

Tarefa excluída com sucesso.
Exemplo de resposta:

```
{
    "message": "Tarefa excluída com sucesso"
}
```

- Status: 404 Not Found

Erro ao excluir a tarefa.
Exemplo de resposta:

```
{
    "message": "Erro ao excluir tarefa"
}
```
