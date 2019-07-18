import React, { Component } from "react";
import AnimalManager from "../../modules/AnimalManager";

export default class AnimalEditForm extends Component {
  // Set initial state
  state = {
    animalName: "",
    breed: "",
    employeeId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingAnimal = evt => {
    evt.preventDefault();

    if (!this.state.employeeId) {
      window.alert("Please select a caretaker");
    } else {
      const editedAnimal = {
        id: this.props.match.params.animalId, //give it the existing id of what you are trying to update
        name: this.state.animalName,
        breed: this.state.breed,
        employeeId: parseInt(this.state.employeeId)
      };
      // calling updateAnimal
      this.props
        .updateAnimal(editedAnimal)
        .then(() => this.props.history.push("/animals"));
    }
  };
// sets the initial state when rendered;initially renders with
// no data then you populate the data and update state then it is rerendered with all the data
  componentDidMount() {
    AnimalManager.get(this.props.match.params.animalId).then(animal => {
      this.setState({
        animalName: animal.name,
        breed: animal.breed,
        employeeId: animal.employeeId
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="animalForm">
          <div className="form-group">
            <label htmlFor="animalName">Animal name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="animalName"
              // the value is what you set on state which allows
              // you to prepopulate the form with existing values the user can then change
              value={this.state.animalName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="breed"
              value={this.state.breed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employee">Assign to caretaker</label>
            <select
              name="employee"
              id="employeeId"
              onChange={this.handleFieldChange}
              value={this.state.employeeId}
            >
              <option value="">Select an employee</option>
              {this.props.employees.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            // onClick you call the existing updateExistingAnimal
            onClick={this.updateExistingAnimal}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
