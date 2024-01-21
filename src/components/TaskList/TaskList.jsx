import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./TaskList.css";
import { useNavigate } from "react-router-dom";
import CreateTask from "../CreateTask/CreateTask";

function TaskList() {
  const tasks = [
    {
      id: 1,
      title: "This is a test Title for Project",
      date: "29-05",
      status: "active",
      owner: "Tom Jose",
    },
    {
      id: 2,
      title: "This is a test Title for Project by Tharesh",
      date: "29-05",
      status: "completed",
      owner: "Alex",
    },
    {
      id: 3,
      title: "This is a test Title for Project by Steve",
      date: "29-05",
      status: "active",
      owner: "Steve Joseph",
    },
  ];

  const navigate = useNavigate();
  const handleTaskView = (id) => {
    navigate(`/task/${id}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log("isModalOpen", isModalOpen);
  return (
    <div className="tasklist">
      <CreateTask isOpen={isModalOpen} onClose={closeModal} />
      <h3 className="tasklist__title">Task Lists</h3>
      <div className="taskList__filter">
        <input type="search" placeholder="Search..." className="task__search" />
        <select name="filter__duedate" className="task__select">
          <option value="Oldest">Oldest</option>
          <option value="Latest">Latest</option>
        </select>
        <select name="filter__status" className="task__select">
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>
        <button className="btn" onClick={openModal}>
          Create
        </button>
      </div>
      <div className="tasks__card">
        {tasks.length > 0
          ? tasks.map((task) => {
              return (
                <div
                  className="task"
                  onClick={() => handleTaskView(task.id)}
                  key={task.id}
                >
                  <div className="task__icon">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ color: "white" }}
                    />
                  </div>
                  <div className="task__date">{task.date}</div>
                  <div className="task__title">{task.title}</div>
                  <div className={`task__status ${task.status}`}>
                    {task.status}
                  </div>
                  <div className="task__owner">
                    {task.owner.charAt(0).toUpperCase()}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default TaskList;
