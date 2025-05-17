import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  let success=false;
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
        }),
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.error || `Error ${response.status}: ${response.statusText}`);
      }
  
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert(json.error || "Something went wrong", "danger");
      }
    } catch (e) {
      console.error(e.message);
      props.showAlert(e.message, "danger");
    }
  };
  
  return (
    <div className="container">
      <div>
        <form
          onSubmit={handleSubmit}
          className="my-6 container border border-1"
          style={{
            color: "white",
            width: "40%",
            padding: "25px",
            marginTop: "30px",
            backgroundColor: "rgba(254, 254, 255, 0.88)",
            boxShadow: "0px 10px 20px rgba(0, 6, 62, 0.67)",
          }}
        >
          <h2
            className="mb-2 text-center"
            style={{
              color: "black",
              fontSize: "1.9rem",
              alignItems: "center",
              fontWeight: "bolder",
              fontFamily: "revert",
            }}
          >
            Welcome to I Notebook
          </h2>
          <div className="mb-3">
            <label
              htmlFor="name"
              style={{
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label mt-5"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
            <label
              htmlFor="email"
              style={{
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label my-2"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
            <label
              htmlFor="password"
              style={{
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label my-2"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control "
              id="password"
              name="password"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={8}
              required
            />
            <label
              htmlFor="cpassword"
              style={{
                fontWeight: "bold",
                color: "black",
              }}
              className="form-label my-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control "
              id="cpassword"
              name="cpassword"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={8}
              required
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
