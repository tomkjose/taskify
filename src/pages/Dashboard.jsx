import React, { useEffect } from "react";
import "../styles/dashboard.css";
import TaskList from "../components/TaskList/TaskList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);
  return (
    <div className="dashboard">
      <TaskList />
    </div>
  );
}

export default Dashboard;
