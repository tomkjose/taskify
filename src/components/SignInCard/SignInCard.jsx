import React, { useState } from "react";
import "../../styles/index.css";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password should be 6 letters");
    } else {
      setError("");
      try {
        await login(email, password);
        navigate("/dashboard");
      } catch (error) {
        console.log("Signin error", error);
      }
    }
  };
  return (
    <div className="auth__card">
      <p className="auth__title">Taskify</p>
      <p className="auth__text">Sign in to Continue</p>
      <form className="auth__form" onSubmit={handleSignIn}>
        <input
          className="auth__input"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="btn">
          Continue
        </button>
      </form>
      {error ? <div className="auth__error">{error}</div> : ""}
      <Link to="/reset">
        <div className="auth__forgetpassword">Forgotten your password?</div>
      </Link>
      <div className="auth__text">
        Don't have an account?{" "}
        <Link to="/signup">
          <span style={{ color: "#0065ff", cursor: "pointer" }}> Sign up </span>
        </Link>
      </div>
    </div>
  );
}

export default SignInCard;
