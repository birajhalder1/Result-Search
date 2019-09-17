import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      rollNumber: "",
      result: {}
    };
  }

  // Clear the input field
  handleClear = () => {
    this.setState({ rollNumber: "" });
  };

  allRight = () => {
    if (this.state.rollNumber === "") {
      return false;
    } else {
      return true;
    }
  };
  // Search roll number
  onSearch = rollNumber => {
    if (this.allRight()) {
      // Call backend route via axios
      axios.get(`api/mStudent/getMstudent/${rollNumber}`).then(response => {
        this.setState({ result: response.data });
      });
      this.handleClear();
    } else {
      alert("Please type your roll number..!");
    }
  };

  render() {
    return (
      <div className="bg">
        <div className="container">
          <form className="  form-group col-md-6 m-auto  ">
            <h4 className="text-center txt3">Result Search</h4>
            <input
              type="text"
              name="rollNumber"
              value={this.state.rollNumber}
              onChange={e => this.setState({ rollNumber: e.target.value })}
              className="form-control md-3 txt1 "
              placeholder="search madhyamik roll number"
            />
          </form>
          <center>
            <button
              onClick={() => this.onSearch(this.state.rollNumber)}
              className="btn btn-info txt2 "
            >
              Search
            </button>
          </center>
        </div>
        <center>
          <div>
            <hr />
            {this.state.result ? (
              // If student object is no empty

              <table className=" container table-bordered auto">
                <thead>
                  <tr>
                    <th className="text-center ">Name</th>
                    <th className="text-center">Roll Number</th>
                    <th className="text-center">Board</th>
                    <th className="text-center">Institution</th>
                    <th className="text-center">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center text-white">
                      {this.state.result.name}
                    </td>
                    <td className="text-center text-white">
                      {this.state.result.rollNumber}
                    </td>
                    <td className="text-center text-white">
                      {this.state.result.board}
                    </td>
                    <td className="text-center text-white">
                      {this.state.result.institution}
                    </td>
                    <td className="text-center text-white">
                      {this.state.result.result}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <h2>No Data available</h2>
            )}
          </div>
        </center>
      </div>
    );
  }
}
export default Landing;
