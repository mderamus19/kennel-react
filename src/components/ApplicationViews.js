import { Route, Redirect } from "react-router-dom"; //Redirect is like history.push telling where to go next
import React, { Component } from "react";
import { withRouter } from "react-router";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import Login from "./authentication/Login";
import AnimalEditForm from "./animal/AnimalForm";
import AnimalForm from "./animal/AnimalForm";
import EmployeeForm from "./employee/EmployeeForm";
import OwnerForm from "./owner/OwnerForm";
import AnimalDetail from "./animal/AnimalDetail";
import LocationDetail from "./location/LocationDetail";
import EmployeeDetail from "./employee/EmployeeDetail";
import AnimalManager from "../modules/AnimalManager";
import EmployeeManager from "../modules/EmployeeManager";
import LocationManager from "../modules/LocationManager";
import OwnerManager from "../modules/OwnerManager";

class ApplicationViews extends Component {
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
      .then(AnimalManager.getAll)
      .then(animals => {
        this.props.history.push("/animals");
        this.setState({ animals: animals });
      });
  };
  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(EmployeeManager.getAll)
      .then(employees => {
        this.props.history.push("/employees");
        this.setState({ employees: employees });
      });
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
      .then(LocationManager.getAll)
      .then(locations => {
        this.props.history.push("/locations");
        this.setState({ locations: locations });
      });
  };
  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  addEmployee = employee =>
    EmployeeManager.post(employee)
      .then(() => EmployeeManager.getAll())
      .then(employees =>
        this.setState({
          employees: employees
        })
      );
  addOwner = owner =>
    OwnerManager.post(owner)
      .then(() => OwnerManager.getAll())
      .then(owners =>
        this.setState({
          owners: owners
        })
      );
  updateAnimal = editedAnimalObject => {
    return AnimalManager.put(editedAnimalObject)
      .then(() => AnimalManager.getAll())
      .then(animals => {
        this.setState({
          animals: animals
        });
      });
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
          path="/locations/:locationId(\d+)"
          render={props => {
            // Find the location with the id of the route parameter
            let location = this.state.locations.find(
              location =>
                location.id === parseInt(props.match.params.locationId)
            );

            // If the location wasn't found, create a default one
            if (!location) {
              location = {
                id: 404,
                name: "404",
                location: "Location not found"
              };
            }

            return (
              <LocationDetail
                location={location}
                deleteLocation={this.deleteLocation}
              />
            );
          }}
        />
        {/* animal routes */}
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        {/* Our shiny new route. We pass employees to the AnimalForm so a
        dropdown can be populated */}
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          exact
          path="/animals/:animalId(\d+)"
          render={props => {
            // Find the animal with the id of the route parameter
            let animal = this.state.animals.find(
              animal => animal.id === parseInt(props.match.params.animalId)
            );

            // If the animal wasn't found, create a default one
            if (!animal) {
              animal = { id: 404, name: "404", breed: "Dog not found" };
            }

            return (
              <AnimalDetail animal={animal} deleteAnimal={this.deleteAnimal} />
            );
          }}
        />
        <Route
          path="/animals/:animalId(\d+)/edit"
          render={props => {
            return (
              <AnimalEditForm
                {...props}
                employees={this.state.employees}
                updateAnimal={this.updateAnimal}
              />
            );
          }}
        />
        {/* employees route */}
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  {...props}
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        {/* Our shiny new route. We pass employees to the EmployeeForm so a
        dropdown can be populated */}
        <Route
          path="/employees/new"
          render={props => {
            return (
              <EmployeeForm
                {...props}
                addOwner={this.addOwner}
                owners={this.state.owners}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees/:employeeId(\d+)"
          render={props => {
            // Find the employee with the id of the route parameter
            let employee = this.state.employees.find(
              employee =>
                employee.id === parseInt(props.match.params.employeeId)
            );

            // If the employee wasn't found, create a default one
            if (!employee) {
              employee = { id: 404, name: "404", person: "Employee not found" };
            }

            return (
              <EmployeeDetail
                employee={employee}
                deleteEmployee={this.deleteEmployee}
              />
            );
          }}
        />
        <Route
          exact
          path="/owners"
          render={props => {
            return (
              <OwnerList
                {...props}
                deleteOwner={this.deleteOwner}
                owners={this.state.owners}
              />
            );
          }}
        />
        <Route path="/login" component={Login} />
        {/* Our shiny new route. We pass employees to the AnimalForm so a
        dropdown can be populated */}
        <Route
          path="/owners/new"
          render={props => {
            return (
              <OwnerForm
                {...props}
                addOwner={this.addOwner}
                employees={this.state.employees}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
export default withRouter(ApplicationViews);
