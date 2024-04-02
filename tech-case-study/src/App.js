import "./App.css";
import OneProduct from "./components/OneProduct";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, redirect } from "react-router-dom";
import UserCard from "./pages/userCard/UserCard";

function App() {
  const authToken = localStorage.getItem("userToken");
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='login' element={<Login />} />
        <Route exact path='/products/:id' element={<OneProduct />} />
        <Route exact path='/cart/' element={<UserCard />} />
        <Route render={authToken ? <Home /> : redirect("/login")} />
      </Routes>
    </div>
  );
}

export default App;
