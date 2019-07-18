import React, { Component } from "react";
import fire from "./EmployeeIcon.svg";
import { Link } from "react-router-dom";
import "./Employee.css";
import AnimalCard from "../animal/AnimalCard";

export default class EmployeeList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="employeeButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/employees/new");
            }}
          >
            Add Employee
          </button>
        </div>
        <section className="employees">
          {this.props.employees.map(employee => (
            <div key={employee.id} className="card card--employee">
              <div className="card-body">
                <div className="card-title">
                  <img src={fire} className="icon--fire" />
                  <h5>{employee.name}</h5>
                  <a
                    href="#"
                    onClick={() => this.props.deleteEmployee(employee.id)}
                    className="card-link"
                  >
                    Delete
                  </a>
                </div>

                <h6 class="card-subtitle mb-2 text-muted">Caretaker For</h6>
                <div className="animals--caretaker">
                {/* rendering multiples to get an array;react will put the elements in the DOM one at a time.
                this.props.animals came from the state in applicationViews(parent component) which is responsible for rendering
                certain components;filter returns an array of all the animals with the employee id property that
                matches the current employee; now you map through the new filter array to create an animal card
                for every animal this employee is caring for;then you take all the props and pass them all down to AnimalCard
                via ...props so you end up with one prop from animalCard that came down from above. */}
                  {this.props.animals
                    .filter(anml => anml.employeeId === employee.id)
                    .map(anml => (
                      <AnimalCard key={anml.id} animal={anml} {...this.props} />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
