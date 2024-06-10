import React, { useState, useContext } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import axios from "axios";

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate()


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {

    dispatch({ type: "LOGIN_START" });
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      //localStorage.setItem('auth-token', dataObj.token);
      window.location.replace("/");
    }
    else {
      alert(dataObj.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" placeholder="Your name" name="username" value={credentials.username} onChange={handleChange} /> : <></>}
          <input type="email" placeholder="Email address" name="email" value={credentials.email} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
        </div>

        <button onClick={() => { state === "Login" ? handleClick() : signup() }}>Continue</button>

        {state === "Login" ?
          <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
          : <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
