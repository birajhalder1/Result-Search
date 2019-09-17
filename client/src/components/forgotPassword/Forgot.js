import React, { Component } from "react";
import "../../App.css";

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      id: ""
    };
  }
  handleMail = () => {
    alert("Some technical problem");
  };
  render() {
    return (
      <div className="container">
        <div className="card log">
          <div className="card-body">
            <center>
              <span>
                Send varified email address and reset your password in check
                mail
              </span>
              <hr />
            </center>
            <form className="container">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  //value={this.state.email}
                  //onChange={e => this.setState({ email: e.target.value })}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter varified email"
                />
              </div>
            </form>
            <center>
              <button onClick={this.handleMail} className="btn btn-info ">
                Send
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Forgot;
