import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  isAllRight = () => {
    // Check all field are empty or not
    if (this.state.email === "" || this.state.password === "") {
      return false;
    } else {
      return true;
    }
  };

  // Register auth
  onLoged = () => {
    if (this.isAllRight()) {
      // Make the data object
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      // Call the backend route using axios
      axios.post("api/user/login", data).then(response => {
        if (response.data.success === true && response.data.token !== "") {
          alert("Loged in successfully");
          localStorage.setItem("Token", response.data.token);
          this.props.history.push("/Dashboard");
        } else {
          alert("Incurrect email or password");
        }
      });
    } else {
      alert("Please all field insert data");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card log">
          <div className="card-body">
            <center>
              <h4>Login</h4>
            </center>
            <form className="container">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  className="form-control"
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
                  placeholder="Password"
                />
              </div>

              {/* <div>
                <h5>
                  {" "}
                  New register ? <a href="/register">Click Here</a>
                </h5>
              </div> */}
              <div className="align_right">
                <a href="/forgot">Forgot Password</a>
              </div>
            </form>
            <center>
              <button onClick={this.onLoged} className="btn btn-info">
                Submit
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
