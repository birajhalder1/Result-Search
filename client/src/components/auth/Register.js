import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: ""
    };
  }

  isAllRight = () => {
    // Check all field are empty or not
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.mobile === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // Register auth
  onSaveAdmin = () => {
    if (this.isAllRight()) {
      // Make the data object
      let data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.mobile
      };

      // Call the backend route using axios
      axios.post("api/user/register", data).then(response => {});
    } else {
      alert("Please all field insert data");
    }
  };
  render() {
    return (
      <div className="container">
        <div className="card reg">
          <div className="card-body">
            <center>
              <h4>Register</h4>
            </center>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={e => this.setState({ mobile: e.target.value })}
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <h5>
                  {" "}
                  Already register ? <a href="/login">Click Here</a>
                </h5>
              </div>
            </form>
            <center>
              <button
                onClick={this.onSaveAdmin}
                className="btn btn-primary center"
              >
                Submit
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
