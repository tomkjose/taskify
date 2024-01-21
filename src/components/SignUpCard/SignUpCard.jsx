import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignUpCard() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password should be 6 letters");
    } else if (password !== confirmPassword) {
      setError("");
      setError("Password Miss-match");
    } else {
      setError("");
      try {
        await signup(email, password, name);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error signing up", error);
      }
    }
  };
  return (
    <div className="auth__card">
      <p className="auth__title">Taskify</p>
      <p className="auth__text">Sign up to Continue</p>
      <form className="auth__form" onSubmit={handleSignUp}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="auth__input"
          type="password"
          name="confirmPassword"
          placeholder="Retype Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Sign up{" "}
        </button>
      </form>
      {error ? <div className="auth__error">{error}</div> : ""}
      <div className="auth__text">
        Have an account?
        <Link to="/signin">
          <span style={{ color: "#0065ff", cursor: "pointer" }}> Sign In </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUpCard;
