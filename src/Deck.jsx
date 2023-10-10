import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";

const StyledDeck = styled.div`
  position: relative;
  height: 13em;
  div.card {
    position: absolute;
  }
`;

const Deck = ({ cards = ["12"], showTop = false }) => {
  return (
    <StyledDeck>
      {cards.map((value, idx) => (
        <Card
          key={idx}
          value={value}
          show={idx === cards.length - 1 && showTop}
          style={{ bottom: `${0.15 * idx}rem`, right: `${0.1 * idx}rem` }}
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
