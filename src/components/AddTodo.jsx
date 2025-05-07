import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { addTodo, getUserTodos } from "../utils/controllers";

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

export default function AddTodo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   console.log(currentUser);

  const [todo, setTodo] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(currentUser.id, todo.trim());
      setTodo("");
      handleClose();
    }
  };

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Add Todo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={formStyle}>
          <Typography variant="h6" gutterBottom>
            Add a Todo
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
              Add Todo
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
