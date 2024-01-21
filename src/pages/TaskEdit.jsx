import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import "../styles/taskedit.css";
function TaskEdit() {
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
      <p className="edit__title">Title: </p>
      <input className="taskedit__title" value={tasks[id].title} />
      <p className="edit__title">Description: </p>
      <input className="taskedit__description" value={tasks[id].description} />
      <p className="edit__title">Due Date: </p>
      <input type="date" name="duedate" className="taskedit__duedate " />
      <button className="btn comment__btn">
        <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#ffffff" }} />
        Update
      </button>
    </div>
  );
}

export default TaskEdit;
