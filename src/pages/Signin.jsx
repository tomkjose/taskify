import React, { useEffect } from "react";
import SignInCard from "../components/SignInCard/SignInCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  return (
    <div className="auth__container">
      <SignInCard />
    </div>
  );
}

export default Signin;
