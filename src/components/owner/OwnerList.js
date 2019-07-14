import React, { Component } from "react";

export default class OwnerList extends Component {
  render() {
    return (
      <section className="owners">
        {this.props.owners.map(owner => (
          <div key={owner.id}>{owner.name}</div>
        ))}
      </section>
    );
  }
}