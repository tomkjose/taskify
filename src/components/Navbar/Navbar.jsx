import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  // console.log("currentUser", currentUser);
  return (
    <div className="navbar">
      <div className="nav__brand">Taskify</div>
      {!currentUser ? (
        <div className="auth__btns">
          <Link to="/signup">
            <button className="btn auth__button">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className="btn auth__button">Sign In</button>
          </Link>
        </div>
      ) : (
        <div className="auth__user">
          <FontAwesomeIcon icon={faBell} size="xl" className="nav__icons" />
          <FontAwesomeIcon icon={faCog} size="xl" className="nav__icons" />
          <div
            className="user__avatar"
            title={
              currentUser._delegate.displayName.length > 0
                ? currentUser._delegate.displayName
                : ""
            }
          >
            {currentUser._delegate.displayName.length > 0
              ? currentUser._delegate.displayName.charAt(0).toUpperCase()
              : ""}
          </div>
          {/* <img
          className="avatar"
          src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
          alt="avatar"
        /> */}
          <button className="btn auth__button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
