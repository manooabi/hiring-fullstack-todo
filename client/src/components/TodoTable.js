import React, { useState, useEffect } from "react";
import TodoModal from "./TodoModal";

function TodoTable() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  // Read token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/todos", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized! Please login again.");
        throw new Error("Failed to fetch todos");
      }
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => { setEditingTodo(null); setShowModal(true); };
  const openEditModal = (todo) => { setEditingTodo(todo); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = async (todoData) => {
    try {
      let res, data;
      if (editingTodo) {
        res = await fetch(`http://127.0.0.1:8000/api/todos/${editingTodo.id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(todoData)
        });
        if (!res.ok) throw new Error("Failed to update todo");
        data = await res.json();
        setTodos(prev => prev.map(t => t.id === data.id ? data : t));
      } else {
        res = await fetch("http://127.0.0.1:8000/api/todos", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(todoData)
        });
        if (!res.ok) throw new Error("Failed to create todo");
        data = await res.json();
        setTodos(prev => [data, ...prev]);
      }
    } catch (err) {
      alert(err.message);
    }
    setShowModal(false);
  };

  const toggleDone = async (todo) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/done`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to update todo");
      const updatedTodo = await res.json();
      setTodos(prev => prev.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmDeleteTodo = (id) => setConfirmDelete({ show: true, id });

  const deleteTodo = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${confirmDelete.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      setTodos(prev => prev.filter(t => t.id !== confirmDelete.id));
    } catch (err) {
      alert(err.message);
    }
    setConfirmDelete({ show: false, id: null });
  };

  return (
    <div>
      {loading && <div className="loading">Loading todos...</div>}
      {error && <div className="error">{error}</div>}

      <button className="add-btn" onClick={openAddModal}>Add Todo</button>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Done</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && !loading && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>No TODOs yet</td>
            </tr>
          )}
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <div
                  className={`toggle-btn ${todo.done ? "active" : ""}`}
                  onClick={() => toggleDone(todo)}
                ></div>
              </td>
              <td className={todo.done ? "done-title" : ""}>{todo.title}</td>
              <td className={todo.done ? "done-title" : ""}>{todo.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(todo)}
                  disabled={todo.done}
                  style={{
                    cursor: todo.done ? "not-allowed" : "pointer",
                    opacity: todo.done ? 0.5 : 1
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDeleteTodo(todo.id)}
                  disabled={todo.done}
                  style={{
                    cursor: todo.done ? "not-allowed" : "pointer",
                    opacity: todo.done ? 0.5 : 1
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <TodoModal
          show={showModal}
          onClose={closeModal}
          onSave={handleSave}
          editingTodo={editingTodo}
        />
      )}

      {confirmDelete.show && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this TODO?</p>
            <button className="confirm-yes" onClick={deleteTodo}>Yes</button>
            <button className="confirm-no" onClick={() => setConfirmDelete({ show: false, id: null })}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoTable;
