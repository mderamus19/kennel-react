import React, { Component } from "react";
import fire from "./EmployeeIcon.svg";
import { Link } from "react-router-dom";
import "./Employee.css";

export default class EmployeeList extends Component {
  render() {
    return (
      <section className="employees">
        {this.props.employees.map(employee => (
          <div key={employee.id} className="card">
            <div className="card-body">
              <div className="card-title">
                <img src={fire} alt="fire" className="icon--fire" />
                <h5>{employee.name}</h5>
                <Link className="nav-link" to={`/employees/${employee.id}`}>
                  Details
                </Link>
                <button
                  onClick={() => this.props.deleteEmployee(employee.id)}
                  className="card-link"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
