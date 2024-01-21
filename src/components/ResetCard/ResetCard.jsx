import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ResetCard() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      resetPassword(email);
      navigate("/signin");
    } catch (error) {
      console.log("Reset password error", error);
    }
  };
  return (
    <div className="auth__card">
      <p className="auth__title">Taskify</p>
      <p className="auth__text">Sign in to Continue</p>
      <form className="auth__form" onSubmit={handleResetPassword}>
        <input
          className="auth__input"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <button type="submit" className="btn">
          Continue
        </button>
      </form>
      <div className="auth__forgetpassword">Forgotten your password?</div>
    </div>
  );
}

export default ResetCard;
