import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div>
        <img width="300px" height="300px" src={this.props.imgUrl} />
      </div>
    );
  }
}
