import React, { Component } from "react";
import "./Employee.css";

export default class EmployeeForm extends Component {
  // Set initial state
  state = {
    employeeName: "",
    dog: "",
    ownerId: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating employee object, and
        invoking the function reference passed from parent component
     */
  constructNewEmployee = evt => {
    evt.preventDefault();
    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const employee = {
        name: this.state.employeeName,
        dog: this.state.dog,
        // Make sure the ownerId is saved to the database as a number since it is a foreign key.
        ownerId: parseInt(this.state.ownerId)
      };

      // Create the employee and redirect user to employee list
      this.props
        .addEmployee(employee)
        .then(() => this.props.history.push("/employees"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeName"
              placeholder="Employee name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dog">Dog</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="dog"
              placeholder="Dog"
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner">Assign to owner</label>
            <select
              defaultValue=""
              name="owner"
              id="ownerId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an owner</option>
              {this.props.owners.map(owner => (
                <option key={owner.id} id={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewEmployee}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
