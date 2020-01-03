import React, { Component } from "react";
import axios from "axios";
import Card from "./Cards";
import "./Deck.css";

const API_Base_URL = "https://deckofcardsapi.com/api/deck/";

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_Base_URL}/new/shuffle/`);
    this.setState({
      deck: deck.data
    });
  }
  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_Base_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No card Remaining!");
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} of ${card.value}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map(c => (
      <Card name={c.name} image={c.image} key={c.id} />
    ));

    return (
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">
          ♦ A short demo made with React ♦
        </h2>
        <button onClick={this.getCard} className="Deck-btn">
          Get Card!
        </button>
        <div className="Deck-cardarea">{cards}</div>
        <footer className="footer">
          icon by{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://icons8.com"
          >
            Icons8
          </a>
        </footer>
      </div>
    );
  }
}
