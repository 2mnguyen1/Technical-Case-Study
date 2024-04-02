import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  function login(username, password) {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 60,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        setToken(user.token);
        localStorage.setItem("userToken", user.token);
        navigate("/");
      });
  }

  function getUser(userToken) {
    return fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => {
      return res.json();
    });
  }

  function logout() {
    localStorage.removeItem("userToken");
    return;
  }

  const value = {
    login,
    token,
    getUser,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
