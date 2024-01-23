import React, { useState } from "react";
import "./createTask.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

function CreateTask({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState();
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await db.collection("tasks").add({
        userId: currentUser._delegate.displayName,
        title: title.trim(),
        description,
        status,
        dueDate,
        comments,
      });

      await db.collection("notifications").add({
        userName: currentUser._delegate.displayName,
        userId: currentUser._delegate.uid,
        title,
        type: "post",
      });

      setTitle("");
      setDescription("");
      setStatus(false);
      setDueDate(null);
      setComments([]);
      onClose();
    } catch (error) {
      console.log("Error in creating tasks", error);
    }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="create__input"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            className="create__input"
            name="duedate"
            placeholder="Due Date"
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default CreateTask;
