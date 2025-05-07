import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Create from "./Create";
import "./Todo.css";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const fetchTodos = () => {
    axios
      .get(`${BACKEND_URL}/getTodos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  };

  useEffect(() => {
    console.log("BACKEND_URL:", BACKEND_URL);
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${BACKEND_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => fetchTodos())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTask(todo.task);
  };

  const handleUpdate = () => {
    if (editTask === "") return;

    axios
      .put(
        `${BACKEND_URL}/update/${editId}`,
        { task: editTask },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setEditId(null);
        setEditTask("");
        fetchTodos();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleLogout = () => {
    // localStorage se user ka data clear karna
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to Login page
    navigate("/login");
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
          <button onClick={handleLogout} className="delete-btn">
            Logout
          </button>
        </nav>
        <h1 className="todo-title">Todo List</h1>

        <Create
          onAdd={fetchTodos}
          editId={editId}
          editTask={editTask}
          setEditTask={setEditTask}
          handleUpdate={handleUpdate}
        />

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">No tasks yet. Add one above!</div>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <span className="todo-text">{todo.task}</span>
                <div className="todo-actions">
                  <button className="edit-btn" onClick={() => handleEdit(todo)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
