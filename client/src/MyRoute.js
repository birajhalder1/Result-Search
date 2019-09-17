import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Forgot from "./components/forgotPassword/Forgot";

class MyRoute extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/forgot" component={Forgot} />
        </Router>
      </div>
    );
  }
}

export default MyRoute;
