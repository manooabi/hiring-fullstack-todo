import React, { useState, useEffect } from "react";

function TodoModal({ show, onClose, onSave, editingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
      setDone(editingTodo.done); // we won't show toggle for editing, but we keep state for completeness
    } else {
      setTitle("");
      setDescription("");
      setDone(false);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, done });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingTodo ? "Edit Todo" : "Add Todo"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {/* Only show Done toggle when adding a new TODO */}
          {/* {!editingTodo && (
            <label>
              <div
                className={`toggle-btn ${done ? "active" : ""}`}
                onClick={() => setDone(!done)}
              ></div>
            </label>
          )}

          <button type="submit" className="save-btn">
            {editingTodo ? "Update" : "Save"}
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button> */}
          {/* Only show Done toggle when adding a new TODO */}
{!editingTodo && (
  <div className="toggle-wrapper">
    <label>
      <div
        className={`toggle-btn ${done ? "active" : ""}`}
        onClick={() => setDone(!done)}
      ></div>
      Done
    </label>
  </div>
)}

<div className="modal-actions">
  <button type="submit" className="save-btn">
    {editingTodo ? "Update" : "Save"}
  </button>
  <button type="button" className="cancel-btn" onClick={onClose}>
    Cancel
  </button>
</div>

        </form>
      </div>
    </div>
  );
}

export default TodoModal;
