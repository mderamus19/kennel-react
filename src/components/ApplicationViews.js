import { Route, Redirect } from "react-router-dom"; //Redirect is like history.push telling where to go next
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import Login from "./authentication/Login";
import AnimalManager from "../modules/AnimalManager";
import EmployeeManager from "../modules/EmployeeManager";
import LocationManager from "../modules/LocationManager";
import OwnerManager from "../modules/OwnerManager";

export default class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
  };

  componentDidMount() {
    const newState = {};

    AnimalManager.getAll()
      .then(animals => (newState.animals = animals))
      .then(() => {
        return EmployeeManager.getAll();
      })
      .then(employees => (newState.employees = employees))
      .then(() => {
        return LocationManager.getAll();
      })
      .then(locations => (newState.locations = locations))
      .then(() => {
       return OwnerManager.getAll();
      })
      .then(owners => (newState.owners = owners))
      .then(() => this.setState(newState));
  }

  // Check if credentials are in local storage; isAuthenticated is a method will return true or false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };
  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(e => e.json())
      .then(employees =>
        this.setState({
          employees: employees
        })
      );
  };
  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(e => e.json())
      .then(owners =>
        this.setState({
          owners: owners
        })
      );
  };
  deleteLocation = id => {
    return fetch(`http://localhost:5002/locations/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/locations`))
      .then(e => e.json())
      .then(locations =>
        this.setState({
          locations: locations
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <LocationList
                deleteLocation={this.deleteLocation}
                locations={this.state.locations}
              />
            );
          }}
        />
        <Route
          exact
          path="/animals"
          render={() => {
            return (
              <AnimalList
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return (
              <OwnerList
                deleteOwner={this.deleteOwner}
                owners={this.state.owners}
              />
            );
          }}
        />
        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
