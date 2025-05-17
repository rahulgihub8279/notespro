import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    if(!confirm("confirm logout")){
      return;
    }
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "rgb(5, 0, 68)" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand me-5"
          to="/"
          style={{ fontWeight: "bold", fontSize: "25px" }}
        >
          I Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 gap-4 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                style={{ fontWeight: "bold" }}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                style={{ fontWeight: "bold" }}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname.startsWith("/more") ? "active" : ""
                }`}
                style={{ fontWeight: "bold" }}
                to="/more1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/more1">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/more2">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex gap-3" role="search">
              <Link
                className="btn btn-light"
                style={{ fontWeight: "bold" }}
                role="button"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-light"
                style={{ fontWeight: "bold" }}
                role="button"
                to="/signup"
              >
                Sign up
              </Link>
            </form>
          ) : (
            <button
              className="btn btn-light"
              style={{ fontWeight: "bold" }}
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
