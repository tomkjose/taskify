import React, { useEffect } from "react";
import SignUpCard from "../components/SignUpCard/SignUpCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  return (
    <div className="auth__container">
      <SignUpCard />
    </div>
  );
}

export default Signup;
