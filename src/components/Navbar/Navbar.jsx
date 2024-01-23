import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Notification from "../Notification/Notification";
import { db } from "../../firebase";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const authUserRef = useRef(null);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const notificationsRef = db.collection("notifications");
        const unsubscribe = notificationsRef.onSnapshot((snapshot) => {
          setNotificationCount(snapshot.size);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authUserRef.current && !authUserRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [authUserRef]);

  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="navbar">
      <Link to="/dashboard">
        <div className="nav__brand">Taskify</div>
      </Link>
      {currentUser ? (
        <div ref={authUserRef} className="auth__user">
          {showNotification && <Notification />}
          <FontAwesomeIcon
            icon={faBell}
            size="xl"
            className="nav__icons"
            onClick={handleNotification}
          />
          {notificationCount > 0 && (
            <div className="notification__count">
              {notificationCount > 99 ? "99+" : notificationCount}
            </div>
          )}

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
          <button className="btn auth__button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signin">
            <button className="btn">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
