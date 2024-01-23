import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/taskedit.css";

function TaskEdit() {
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDocRef = doc(db, "tasks", id);
        const taskDocSnap = await getDoc(taskDocRef);

        if (taskDocSnap.exists()) {
          setCurrentTask({ id: taskDocSnap.id, ...taskDocSnap.data() });
        } else {
          console.error("Task not found");
        }
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };

    fetchTask();

    const unsubscribe = onSnapshot(doc(db, "tasks", id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCurrentTask({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.error("Task not found");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await updateDoc(taskDocRef, {
        title: document.querySelector(".taskedit__title").value,
        description: document.querySelector(".taskedit__description").value,
        dueDate: document.querySelector(".taskedit__duedate").value,
      });
      navigate(`/task/${id}`);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="taskview">
      <p className="edit__title">Title: </p>
      <input className="taskedit__title" defaultValue={currentTask.title} />
      <p className="edit__title">Description: </p>
      <input
        className="taskedit__description"
        defaultValue={currentTask.description}
      />
      <p className="edit__title">Due Date: </p>
      <input
        type="date"
        name="duedate"
        className="taskedit__duedate"
        defaultValue={currentTask.dueDate}
      />
      <button className="btn comment__btn" onClick={handleUpdateTask}>
        <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#ffffff" }} />
        Update
      </button>
    </div>
  );
}

export default TaskEdit;
