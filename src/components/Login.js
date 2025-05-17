import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json(); 
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("login successfully", "success");
      } else {
        props.showAlert(json.error, "warning");
      }
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="my-6 container border border-1"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "white",
          width: "30%",
          padding: "25px",
          marginTop: "30px",
          boxShadow: "0px 10px 20px rgba(0, 6, 62, 0.67)",
        }}
      >
        <h2
          className="mb-2 text-center"
          style={{
            color: "black",
            fontSize: "1.9rem",
            fontWeight: "bolder",
            fontFamily: "revert",
          }}
        >
          Login to your account
        </h2>
        <div className="mb-3">
          <label
            htmlFor="email"
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
              color: "black",
            }}
            className="form-label mt-5"
          >
            Email
          </label>
          <input
            type="email"
            className="form-control mb-4"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
          <label
            htmlFor="password"
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
              color: "black",
            }}
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control "
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <button
          style={{
            backgroundColor: "rgba(20, 4, 112, 0.95)",
            color: "white",
            padding: "10px",
            fontSize: "15px",
            margin: "35px 0px",
            border: "none",
            width: "100%",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
