import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { addTodo, getUserTodos, updateTodo } from "../utils/controllers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  p: 4,
  width: { xs: "90%", sm: 400 },
  maxWidth: "100%",
  mx: "auto",
  my: 4,
  boxShadow: 3,
  borderRadius: 2,
  backgroundColor: "white",
};

export default function EditTodo({ userId, todoId, todoText }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(todoId);
  console.log("todoText", todoText);
  const [todo, setTodo] = React.useState("");
  console.log("todo", todo);

  React.useEffect(() => {
    setTodo(todoText || "");
  }, [todoText, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(userId, todoId, todo.trim());
    setTodo("");
    handleClose();
  };

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Edit Todo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={formStyle}>
          <Typography variant="h6" gutterBottom>
            Edit Todo
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Todo"
              variant="outlined"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth>
              Update Todo
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
