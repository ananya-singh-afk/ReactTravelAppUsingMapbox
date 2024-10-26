import React, { useRef, useState } from "react";
import "./login.css";
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const Login = ({setShowLogin, localStorage, setCurrentUser}) => {
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };
        try{
            const res = await axios.post("/users/login", user);
            localStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
        }
        catch(err){
            setError(true);
            console.log(err); 
        }
    };
  return (
    <div className="loginContainer">
      <div className="logo">
        <RoomIcon/>
        Travel Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="loginButton">Login</button>
        {error &&
        <span className="failure">Something went wrong!</span>}
      </form>
      <CloseIcon className="loginCancel" onClick={() => setShowLogin(false)}></CloseIcon>
    </div>
  );
};

export default Login;
