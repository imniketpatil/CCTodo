import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddTodo from "../components/AddTodo.jsx";
import { getUserTodos, logoutUser } from "../utils/controllers.js";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList.jsx";

export default function Todos() {
  const navigate = useNavigate();

  const [todoList, setTodoList] = React.useState([]);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      const todos = getUserTodos(storedUser.id);
      setTodoList(todos);
    }
  });

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) return null; // prevent UI flash

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hey {user.username}
          </Typography>
          <AddTodo />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TodoList todoList={todoList} userId={user.id} />
    </Box>
  );
}
