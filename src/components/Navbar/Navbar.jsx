import React, { useEffect, useState } from "react";
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
  const [notificationCount, setNotifcationCount] = useState(0);
  // console.log("currentUser", currentUser);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const notificationsRef = db.collection("notifications");
        const unsubscribe = notificationsRef.onSnapshot((snapshot) => {
          setNotifcationCount(snapshot.size);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, []);
  const handleNotfication = () => {
    setShowNotification(!showNotification);
  };
  return (
    <div className="navbar">
      {showNotification && <Notification />}
      <Link to="/dashboard">
        <div className="nav__brand">Taskify</div>
      </Link>
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
          <FontAwesomeIcon
            icon={faBell}
            size="xl"
            className="nav__icons"
            onClick={handleNotfication}
          />
          <div className="notification__count">
            {notificationCount > 99 ? "99+" : notificationCount}
          </div>
          {/* <FontAwesomeIcon icon={faCog} size="xl" className="nav__icons" /> */}
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
