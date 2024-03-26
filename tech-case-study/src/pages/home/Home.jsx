import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (!currentUser && !token) {
            navigate("login");
        }
    }, [currentUser]);

    return <div>Home</div>;
}

export default Home;
