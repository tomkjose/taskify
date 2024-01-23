import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./TaskList.css";
import { useNavigate } from "react-router-dom";
import CreateTask from "../CreateTask/CreateTask";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState(tasks);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((taskDoc) => ({
        id: taskDoc.id,
        ...taskDoc.data(),
      }));
      setTasks(tasksData);
      setFilteredTask(tasksData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const handleSearchFilter = (searchText) => {
    if (searchText.length > 0 && searchText.length !== " ") {
      const newTasks = tasks.filter((task) =>
        task.title.toLowerCase().startsWith(searchText.toLowerCase())
      );

      setFilteredTask(newTasks);
    } else {
      setFilteredTask(tasks);
    }
  };

  const handleDueDateFilter = (filterValue) => {
    console.log("filterValue", filterValue);
    if (filterValue === "oldest") {
      const newTasks = [...tasks].slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateB - dateA;
      });
      setFilteredTask(newTasks);
    } else if (filterValue === "latest") {
      const newTasks = [...tasks].slice().sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
      setFilteredTask(newTasks);
    } else {
      setFilteredTask(tasks);
    }
  };

  const handleStatusFilter = (filterValue) => {
    console.log("filteredValue", filterValue);
    if (filterValue === "active") {
      const newTasks = tasks.filter((task) => task.status === false);
      setFilteredTask(newTasks);
    } else if (filterValue === "completed") {
      const newTasks = tasks.filter((task) => task.status === true);
      setFilteredTask(newTasks);
    } else {
      setFilteredTask(tasks);
    }
  };

  return (
    <div className="tasklist">
      <CreateTask isOpen={isModalOpen} onClose={closeModal} />
      <h3 className="tasklist__title">Task Lists</h3>
      <div className="taskList__filter">
        <input
          type="search"
          placeholder="Search..."
          className="task__search"
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
        <select
          name="filter__duedate"
          className="task__select"
          onChange={(e) => handleDueDateFilter(e.target.value)}
        >
          <option value="">DueDate</option>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
        </select>
        <select
          name="filter__status"
          className="task__select"
          onChange={(e) => handleStatusFilter(e.target.value)}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn" onClick={openModal}>
          Create
        </button>
      </div>
      <div className="tasks__card">
        {filteredTask.length > 0 ? (
          filteredTask.map((task) => (
            <div
              className="task"
              onClick={() => handleTaskView(task.id)}
              key={task.id}
            >
              <div className="task__icon">
                <FontAwesomeIcon icon={faBookmark} style={{ color: "white" }} />
              </div>
              <div className="task__date">{task.date}</div>
              <div className="task__title">{task.title}</div>
              <div
                className={`task__status ${
                  task.status === false ? "Active" : "Completed"
                }`}
              >
                {task.status === false ? "Active" : "Completed"}
              </div>
              <div className="task__owner">
                {task.userId
                  ? task.userId.charAt(0).toUpperCase()
                  : "Unknown User"}
              </div>
            </div>
          ))
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
