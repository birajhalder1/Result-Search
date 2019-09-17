import React, { Component } from "react";
import "../../App.css";
//import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item active">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li> */}
            <li className="nav-item text-right">
              <a className="nav-link" href="/login">
                Admin Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
