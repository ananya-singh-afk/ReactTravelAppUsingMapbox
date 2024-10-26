import React, { useRef, useState } from "react";
import "./register.css";
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const Register = ({setShowRegister}) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        try{
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
        }
        catch(err){
            setError(true);
            setSuccess(false);
            console.log(err); 
        }
    };
  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon/>
        Travel Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="registerButton">Register</button>
        {success &&
        <span className="success">Successful. You can login now!</span>
        }
        {error &&
        <span className="failure">Something went wrong!</span>}
      </form>
      <CloseIcon className="registerCancel" onClick={() => setShowRegister(false)}></CloseIcon>
    </div>
  );
};

export default Register;
