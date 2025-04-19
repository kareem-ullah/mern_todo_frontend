import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/getTodos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Failed to fetch todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleEdit = (todo) => {
    console.log("Editing task: ", todo);
    setEditId(todo._id);
    setEditTask(todo.task);
  };

  const handleUpdate = () => {
    if (editTask === '') return; 

    console.log("Updating task with ID:", editId, "to", editTask);

    axios.put(`http://localhost:3001/update/${editId}`, { task: editTask })
        .then(() => {
            console.log("Task updated successfully");
            setEditId(null);
            setEditTask('');
            fetchTodos(); 
        })
        .catch(err => {
            console.error("Update failed:", err);
        });
};

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create
        onAdd={fetchTodos}
        editId={editId}
        editTask={editTask}
        setEditTask={setEditTask}
        handleUpdate={handleUpdate}
      />
      <ul>
        {todos.length === 0 ? (
          <li>No tasks</li>
        ) : (
          todos.map((todo) => (
            <li key={todo._id}>
              <span>{todo.task}</span>
              <button
              className="edit"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
              className="delete"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
