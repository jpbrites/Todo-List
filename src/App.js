import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import NoteAddIcon from '@mui/icons-material/NoteAdd';import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import MyTasks from "./pages/MyTasks/MyTasks";
import UpdateTask from "./pages/update/UpdateTask";
import DeleteTask from "./pages/delete/DeleteTask";


function App() {
  const { collapseSidebar } = useProSidebar();

  return (
    <BrowserRouter>
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar className="sidebar" style={{ height: "100vh", background: 'linear-gradient(to bottom, #A77DCD, #F3B9C5)' }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Todo List</h2>
          </MenuItem>
          <MenuItem component={<Link to="/" />} icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem component={<Link to="/cadastro" />} icon={< NoteAddIcon />}>Cadastrar Tarefa</MenuItem>
          <MenuItem component={<Link to="/my_tasks" />}  icon={<ContactsOutlinedIcon />}>Minhas Tarefas</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{marginLeft: '3rem'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/my_tasks" element={<MyTasks />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} />
        </Routes>
      </main>
    </div>

    </BrowserRouter>
  );
}

export default App;