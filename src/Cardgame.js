import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
export default class Cardgame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://deckofcardsapi.com/api/deck/bjhgaga5umgt/shuffle/")
      .then(Response => {
        console.log(Response);
      });
  }

  handleClick() {
    axios
      .get("https://deckofcardsapi.com/api/deck/bjhgaga5umgt/draw/?count=1")
      .then(Response => {
        let url = Response.data.cards[0].image;

        this.setState({
          cards: [...this.state.cards, Response]
        });

        console.log(this.state.cards);
      });
  }

  render() {
    return (
      <div>
        <h1>Play Card</h1>
        {this.state.cards.map(cards => (
          <Card imgUrl={cards.data.cards[0].image} key={cards.data.remaining} />
        ))}
        <button onClick={this.handleClick}>New Card</button>
      </div>
    );
  }
}
