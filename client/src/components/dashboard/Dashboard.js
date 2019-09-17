import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      rollNumber: "",
      board: "",
      institution: "",
      result: "",
      students: {},
      allStudents: []
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("Token") == null) {
      window.location.href = "/login";
    }
  };

  // Clear the input field
  handleClear = () => {
    this.setState({
      name: "",
      rollNumber: "",
      board: "",
      institution: "",
      result: ""
    });
  };

  isAllRight = () => {
    // Check all field are empty or not
    if (
      this.state.name === "" ||
      this.state.rollNumber === "" ||
      this.state.board === "" ||
      this.state.institution === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // Register auth
  madhyamikResultRegister = () => {
    if (this.isAllRight()) {
      // Make the data object
      let data = {
        name: this.state.name,
        rollNumber: this.state.rollNumber,
        board: this.state.board,
        institution: this.state.institution,
        result: this.state.result
      };

      // Call the backend route using axios
      axios.post("admin/ms/mStudentInfo", data).then(response => {
        alert("Successfully register madhyamik info..");
      });
      this.handleClear();
    } else {
      alert("Please all field insert data");
    }
    this.getAllStudent();
  };

  // Search name
  onSearchName = rollNumber => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "Token"
    );
    // Call the backend server route via axios
    axios.get(`admin/ms/getSingle/${rollNumber}`).then(response => {
      this.setState({ students: response.data });
    });
    this.handleClear();
  };

  // Logout
  handleLogout = () => {
    localStorage.removeItem("Token");
    window.location.href = "/login";
  };

  // GET all student
  componentDidMount = () => {
    this.getAllStudent();
  };
  getAllStudent = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "Token"
    );
    axios.get("admin/ms/getAll").then(response => {
      this.setState({ allStudents: response.data });
      //console.log(response.data);
    });
  };

  // Click edit button and show student info
  onEditStudent = id => {
    // Local storage to save the token
    // axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    //   "Token"
    // );

    // Call the backend route via axios
    axios.get(`admin/ms/get/${id}`).then(response => {
      this.setState({
        id: response.data._id,
        name: response.data.name,
        rollNumber: response.data.rollNumber,
        board: response.data.board,
        institution: response.data.institution,
        result: response.data.result
      });
    });
  };

  // Update student
  onUpdateStudent = () => {
    // Make a object
    let data = {
      name: this.state.name,
      rollNumber: this.state.rollNumber,
      board: this.state.board,
      institution: this.state.institution,
      result: this.state.result
    };

    axios.post(`admin/ms/update/${this.state.id}`, data).then(response => {
      alert("Update successfully");
      this.getAllStudent();
    });
    this.handleClear();
  };

  // Click delete button and delete student records
  onDeleteStudent = id => {
    // Call backend route via axios
    axios.delete(`admin/ms/delete/${id}`).then(response => {
      alert("Deleted successfully !");
    });
    this.getAllStudent();
  };
  render() {
    return (
      <div className="container">
        <div className="card reg">
          <div className="card-body">
            <div className="align_right">
              <button
                onClick={this.handleLogout}
                className="btn btn-outline-warning"
              >
                Logout
              </button>
            </div>
            <center>
              <h4>Dashboard</h4>
              <hr />
            </center>

            <form className="container">
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
                  type="text"
                  name="rollNumber"
                  value={this.state.rollNumber}
                  onChange={e => this.setState({ rollNumber: e.target.value })}
                  className="form-control"
                  id="exampleInputroll"
                  aria-describedby="rollHelp"
                  placeholder="Enter roll number"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="board"
                  value={this.state.board}
                  onChange={e => this.setState({ board: e.target.value })}
                  className="form-control"
                  id="exampleInputboard1"
                  placeholder="board"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="institution"
                  value={this.state.institution}
                  onChange={e => this.setState({ institution: e.target.value })}
                  className="form-control"
                  id="formGroupExampleinstitution"
                  placeholder="Enter institution"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="result"
                  value={this.state.result}
                  onChange={e => this.setState({ result: e.target.value })}
                  className="form-control"
                  id="formGroupExampleresult"
                  placeholder="Enter result"
                />
              </div>
            </form>
            <center>
              {this.state.id === "" ? (
                <button
                  onClick={this.madhyamikResultRegister}
                  className="btn btn-outline-success"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={this.onUpdateStudent}
                  className="btn btn-outline-info"
                >
                  Update
                </button>
              )}
            </center>
          </div>
        </div>

        <div className="container">
          <div className="card reg">
            <div className="card-body">
              <center>
                <h2>Show details</h2>
                <hr />
                <div className=" container input-group mb-3">
                  <input
                    type="text"
                    className="form-control btn_style"
                    name="rollNumber"
                    value={this.state.rollNumber}
                    onChange={e =>
                      this.setState({ rollNumber: e.target.value })
                    }
                    placeholder="Search name"
                    aria-label="Search roll number of a student"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => this.onSearchName(this.state.rollNumber)}
                      className="btn btn-outline-info "
                    >
                      Search
                    </button>
                  </div>
                </div>
              </center>
              {this.state.students !== null ? (
                // If student array is no empty

                <table className=" container table-bordered col-md-6 m-auto">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Roll Number</th>
                      <th className="text-center">Board</th>
                      <th className="text-center">Institution</th>
                      <th className="text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        {this.state.students.name}
                      </td>
                      <td className="text-center">
                        {this.state.students.rollNumber}
                      </td>
                      <td className="text-center">
                        {this.state.students.board}
                      </td>
                      <td className="text-center">
                        {this.state.students.institution}
                      </td>
                      <td className="text-center">
                        {this.state.students.result}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <h2>No Data available</h2>
              )}
            </div>
          </div>
        </div>

        {/* Show all student */}
        <div className="container auto">
          <center>
            <h1>Show all student</h1>
            <hr />
          </center>

          {this.state.allStudents.length > 0 ? (
            // If student array is not empty

            // <div className="card reg">
            //   <div className="card-body">
            <table className=" table-bordered  m-auto">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Roll Number</th>
                  <th className="text-center">Board</th>
                  <th className="text-center">Institution</th>
                  <th className="text-center">Result</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {this.state.allStudents.map(studentData => (
                <tbody key={studentData._id}>
                  <tr>
                    <td className="text-center">{studentData.name}</td>
                    <td className="text-center">{studentData.rollNumber}</td>
                    <td className="text-center">{studentData.board}</td>
                    <td className="text-center">{studentData.institution}</td>
                    <td className="text-center">{studentData.result}</td>
                    <td>
                      <center>
                        <button
                          onClick={() => this.onEditStudent(studentData._id)}
                          className="btn btn-outline-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.onDeleteStudent(studentData._id)}
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </center>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            //   </div>
            // </div>
            <h3>No data found</h3>
          )}
        </div>
        <hr />
      </div>
    );
  }
}
export default Dashboard;
