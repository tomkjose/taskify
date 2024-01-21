import React from "react";
import "./TaskView.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
function TaskView() {
  const { id } = useParams();
  const tasks = [
    {
      id: 1,
      title: "This is a test Title for Project",
      date: "29-05",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      status: "active",
      owner: "Tom Jose",
    },
    {
      id: 2,
      title: "This is a test Title for Project by Tharesh",
      date: "29-05",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      status: "completed",
      owner: "Alex",
    },
    {
      id: 3,
      title: "This is a test Title for Project by Steve",
      date: "29-05",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",

      status: "active",
      owner: "Steve Joseph",
    },
  ];
  return (
    <div className="taskview">
      <div className="taskview__main">
        <h2 className="taskview__title">{tasks[id].title}</h2>
        <button className="btn">
          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff" }} />{" "}
          <span>Edit</span>
        </button>
        <button className="btn" style={{ backgroundColor: "#0d7f64" }}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} />{" "}
          <span>Delete</span>
        </button>
      </div>
      <div className="task__description">{tasks[id].description}</div>
      <div className="task__comments">
        <h4 className="comment__title">Comments :</h4>
        <textarea
          placeholder="Comment..."
          className="taskview__comment"
        ></textarea>
        <button className="btn comment__btn">
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#ffffff" }} />{" "}
          Post
        </button>
      </div>
      <div className="comment__container">
        <div className="comment">
          <div className="comment__user">T</div>
          <div className="comment__content">
            Hello hi do we need to complete this task today ???
          </div>
        </div>
        <div className="comment">
          <div className="comment__user">T</div>
          <div className="comment__content">
            Hello hi do we need to complete this task today ???
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskView;
