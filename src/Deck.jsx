import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";

const StyledDeck = styled.div`
  position: relative;
  height: 12em;
  width: 8em;
  border: 0.1rem solid grey;
  border-radius: 0.75em;
  div.card {
    position: absolute;
  }
`;

const Deck = ({ cards = [], showTop = false }) => {
  return (
    <StyledDeck empty={!cards.length}>
      {cards.map((value, idx) => (
        <Card
          key={idx}
          value={value}
          show={idx === cards.length - 1 && showTop}
          style={{ bottom: `${0.15 * idx}em`, right: `${0.1 * idx}em` }}
        />
      ))}
    </StyledDeck>
  );
};

Deck.propTypes = {
  cards: PropTypes.array,
  showTop: PropTypes.number,
};

export default Deck;
