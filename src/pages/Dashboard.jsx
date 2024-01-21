import React from "react";
import "../styles/dashboard.css";
import TaskList from "../components/TaskList/TaskList";
function Dashboard() {
  return (
    <div className="dashboard">
      <TaskList />
    </div>
  );
}

export default Dashboard;
