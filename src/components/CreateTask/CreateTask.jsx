import React from "react";
import "./createTask.css";
function CreateTask({ isOpen, onClose }) {
  //   console.log("isOpen", isOpen);
  const handleCreateTask = (e) => {
    e.preventDefault();
  };
  return isOpen ? (
    <div className="modal">
      <div className="modal__content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form
          className="create__task"
          onSubmit={handleCreateTask}
          method="POST"
        >
          <input
            type="text"
            className="create__input"
            name="title"
            placeholder="Title"
            required
          />
          <input
            type="text"
            className="create__input"
            name="decription"
            placeholder="Description"
            required
          />
          <input
            type="date"
            className="create__input"
            name="duedate"
            placeholder="dueDate"
            required
          />
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CreateTask;
