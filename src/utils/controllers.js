export const signupUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const todos = JSON.parse(localStorage.getItem("todos")) || {};

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return { success: false, message: "User already exists" };
  }

  const nextId =
    users.length > 0 ? Math.max(...users.map((u) => Number(u.id))) + 1 : 1;

  const newUser = {
    id: String(nextId),
    username,
    password,
  };

  users.push(newUser);
  todos[newUser.id] = [];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("todos", JSON.stringify(todos));
  // localStorage.setItem("currentUser", newUser.id);

  return { success: true, userId: newUser.id };
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid username or password" };
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ id: user.id, username: user.username })
  );

  return { success: true, userId: user.id };
};

export const addTodo = (userId, newTodoText) => {
  if (!userId) return;

  const allTodos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!allTodos[userId]) {
    allTodos[userId] = [];
  }

  const newTodo = {
    id: Date.now(),
    text: newTodoText,
  };

  allTodos[userId].push(newTodo);

  localStorage.setItem("todos", JSON.stringify(allTodos));
};

export const getUserTodos = (userId) => {
  if (!userId) return [];
  const todos = JSON.parse(localStorage.getItem("todos")) || {};
  return todos[userId] || [];
};

export const updateTodo = (userId, todoId, updatedText) => {
  console.log("updateTodo", userId, todoId, updatedText);

  if (!userId || !todoId) return;

  const allTodos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!Array.isArray(allTodos[userId])) return;

  const todoIndex = allTodos[userId].findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) return;

  allTodos[userId][todoIndex] = {
    ...allTodos[userId][todoIndex],
    text: updatedText,
  };

  localStorage.setItem("todos", JSON.stringify(allTodos));
};

export const deleteTodo = (userId, todoId) => {
  if (!userId || todoId === undefined) return;

  const allTodos = JSON.parse(localStorage.getItem("todos")) || {};

  if (!allTodos[userId]) return;

  const updatedTodos = allTodos[userId].filter((todo) => todo.id !== todoId);

  allTodos[userId] = updatedTodos;
  localStorage.setItem("todos", JSON.stringify(allTodos));
};
