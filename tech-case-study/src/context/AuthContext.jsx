import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
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
                localStorage.setItem("userToken", token);
                console.log(user);
            });
    }

    useEffect(() => {
        function getUser() {
            fetch("https://dummyjson.com/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setCurrentUser(res);
                    return res.json();
                })
                .then(console.log);
        }
        getUser();
    }, [token]);

    function getUser(userToken) {
        fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                setCurrentUser(res);
                return res.json();
            })
            .then(console.log);
        return currentUser;
    }

    function logout() {
        localStorage.removeItem("userToken");
    }

    const value = {
        currentUser,
        login,
        getUser,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
