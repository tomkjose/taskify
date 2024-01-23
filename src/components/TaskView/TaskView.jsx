import React, { useEffect, useState } from "react";
import "./TaskView.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import {
  faPaperPlane,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

function TaskView() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [currentTask, setCurrentTask] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();

  const handleChangeStatus = async () => {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await updateDoc(taskDocRef, {
        status: !currentTask.status,
      });
    } catch (error) {
      console.error("Error changing task status", error);
    }
  };

  const handlePostComment = async () => {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await updateDoc(taskDocRef, {
        comments: arrayUnion({
          displayName: currentUser.displayName,
          content: commentContent,
        }),
      });
      await db.collection("notifications").add({
        userName: currentUser._delegate.displayName,
        userId: currentUser._delegate.uid,
        title: currentTask.title,
        type: "comment",
      });
      setCommentContent("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDocRef = doc(db, "tasks", id);
        const taskDocSnap = await getDoc(taskDocRef);

        if (taskDocSnap.exists()) {
          setCurrentTask({ id: taskDocSnap.id, ...taskDocSnap.data() });
        } else {
          console.error("Task not found");
          setCurrentTask(null);
        }
      } catch (error) {
        console.error("Error fetching task", error);
        setCurrentTask(null);
      }
    };

    fetchTask();

    const unsubscribe = onSnapshot(doc(db, "tasks", id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCurrentTask({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.error("Task not found");
        setCurrentTask(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleDeleteTask = async () => {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await deleteDoc(taskDocRef);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTask = () => {
    navigate(`/task/${id}/edit`);
  };

  return (
    <div className="taskview">
      {currentTask === null ? (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="taskview__main">
            <h2 className="taskview__title">{currentTask.title}</h2>
            <button className="btn" onClick={handleUpdateTask}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#ffffff" }}
              />{" "}
              <span>Edit</span>
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#0d7f64" }}
              onClick={handleDeleteTask}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />{" "}
              <span>Delete</span>
            </button>
          </div>
          {currentTask ? (
            <div
              className={`task__status ${
                currentTask.status === false ? "Active" : "Completed"
              }`}
              style={{
                width: "8rem",
                marginLeft: "0.6rem",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={handleChangeStatus}
              title="Current status"
            >
              {currentTask.status === false ? "Active" : "Completed"}
            </div>
          ) : (
            ""
          )}
          <div className="task__description">{currentTask.description}</div>
          {currentTask.dueDate ? (
            <div className="task__duedate">Due date: {currentTask.dueDate}</div>
          ) : (
            ""
          )}
          {currentTask.comments ? (
            <div className="task__comments">
              <h4 className="comment__title">Comments :</h4>
              <textarea
                placeholder="Comment..."
                className="taskview__comment"
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <button className="btn comment__btn" onClick={handlePostComment}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{ color: "#ffffff" }}
                />{" "}
                Post
              </button>
            </div>
          ) : (
            ""
          )}
          {currentTask?.comments?.length > 0 ? (
            <div className="comment__container">
              {currentTask.comments.map((comment, index) => (
                <div className="comment" key={index}>
                  <div className="comment__user">
                    {comment.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment__content">{comment.content}</div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default TaskView;
