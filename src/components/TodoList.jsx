import React from "react";
import { deleteTodo } from "../utils/controllers";
import EditTodo from "./EditTodo";
import { Button } from "@mui/material";

const TodoList = ({ todoList, userId }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <h2 className="text-xl font-semibold text-center mb-4">Your Todos</h2>
      {todoList.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet.</p>
      ) : (
        <ul className="space-y-3 w-full">
          {todoList.map((todo, index) => (
            <li
              key={index}
              className="flex justify-around items-center w-full bg-white p-3 rounded shadow hover:shadow-md transition"
            >
              <span className="text-gray-800 break-words w-full">
                {todo.text}
              </span>
              <div className="flex items-end justify-end w-full">
                <EditTodo
                  userId={userId}
                  todoId={todo.id}
                  todoText={todo.text}
                />

                <Button
                  onClick={() => deleteTodo(userId, todo.id)}
                  variant="outlined"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
