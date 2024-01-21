import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password, displayName) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            setUserDataToLocalStorage(userCredential.user);
          });
      });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser).user);
    }

    return unsubscribe;
  }, []);

  const setUserDataToLocalStorage = (userCredential) => {
    console.log("userCredential", userCredential);
    localStorage.setItem("user", JSON.stringify(userCredential));
  };

  const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const value = {
    currentUser,
    signup: (email, password, displayName) =>
      signup(email, password, displayName),
    login: (email, password) => login(email, password),
    logout: () => {
      removeUserDataFromLocalStorage();
      return logout();
    },
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
