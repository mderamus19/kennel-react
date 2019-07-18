import React, { Component } from "react";
import discharge from "./OwnerIcon.svg";
import "./Owner.css";

export default class OwnerList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ownerButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/owners/new");
            }}
          >
            Add Owner
          </button>
        </div>
        <section className="owners">
          {this.props.owners.map(owner => (
            <div key={owner.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <img
                    src={discharge}
                    alt="discharge"
                    className="icon--discharge"
                  />
                  <h5>{owner.name}</h5>
                  <button
                    onClick={() => this.props.deleteOwner(owner.id)}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
