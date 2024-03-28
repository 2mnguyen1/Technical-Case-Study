import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, redirect } from "react-router-dom";

function App() {
    const authToken = localStorage.getItem("userToken");
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="login" element={<Login />} />
                <Route render={authToken ? <Home /> : redirect("/login")} />
            </Routes>
        </div>
    );
}

export default App;
