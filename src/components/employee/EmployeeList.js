import React, { Component } from "react";
import fire from "./EmployeeIcon.svg"
// import "./Animal.css"

export default class EmployeeList extends Component {
    render () {
        return (
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <img src= {fire} alt ="fire" className="icon--fire" />
                                <h5>{employee.name}</h5>
                                <button
                                    onClick={() => this.props.deleteEmployee(employee.id)}
                                    className="card-link">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}

