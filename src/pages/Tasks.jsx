import React, { useEffect } from "react";
import TaskView from "../components/TaskView/TaskView";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Tasks() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, []);
  return (
    <div>
      <TaskView />
    </div>
  );
}

export default Tasks;
