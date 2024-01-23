import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import "./Notification.css";

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const notificationsRef = db.collection("notifications");

    const unsubscribe = notificationsRef.onSnapshot((snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setNotifications(updatedNotifications);
    });

    return () => unsubscribe();
  }, []);

  // const handleClearNotification = async () => {
  //   if (currentUser) {
  //     const db = firebase.firestore();
  //     const notificationsRef = db.collection("notifications");

  //     try {
  //       const userId = currentUser.uid;

  //       const querySnapshot = await notificationsRef
  //         .where("userId", "==", userId)
  //         .get();
  //       const batch = db.batch();
  //       querySnapshot.forEach((doc) => {
  //         batch.delete(doc.ref);
  //       });

  //       await batch.commit();
  //     } catch (error) {
  //       console.error("Error clearing notifications:", error);
  //     }
  //   }
  // };

  return (
    <div className="notification">
      <h4 className="notification__title">Notifications</h4>
      {notifications.map((notification) => (
        <div key={notification.id} className="notification__item">
          {notification.data.type === "post" ? (
            <>
              <span className="notification__user">
                {notification.data.userName.charAt(0).toUpperCase()}
              </span>{" "}
              <span className="notification__content">
                {" "}
                added a task:<b> {notification.data.title}</b>
              </span>
            </>
          ) : (
            <>
              <span className="notification__user">
                {notification.data.userName.charAt(0).toUpperCase()}
              </span>{" "}
              <span className="notification__content">
                {" "}
                commented on:<b> {notification.data.title}</b>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notification;
