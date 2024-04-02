import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Image from "./../../components/images/foodie.jpeg";
import { useNavigate } from "react-router-dom";
import "../../../src/./App.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let Submit = (e) => {
    e.preventDefault();
    const newEntry = {
      email: email,
      password: password,
    };
    console.log([newEntry]);
    if (email === "" || password === "")
      return window.alert("Please Fill out the field first");
    else {
      // const url = "https://p28ihcca27.execute-api.ap-south-1.amazonaws.com/dev/api/login";
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      };
      fetch("https://hactvwuzyh.execute-api.ap-south-1.amazonaws.com/dev/api/login",params).then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.body.message);
          if (data.body.message !== "Login successful") return window.alert(data.body.message);
          navigate("/Home");
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={Submit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter your email id"/>
            <label htmlFor="password">password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="********"/>
            <button>Log In</button>
          </form>
        </div>
      </div>
      <img className="login" src={Image} />
    </>
  );
};
