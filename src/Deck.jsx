import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const StyledDeck = styled.div`
  position: relative;
  height: 12em;
  width: 8em;
  border: 0.1rem solid grey;
  border-radius: 0.75em;
`;

const getItemStyle = (snapshot, draggableStyle, idx) => {
  const initialStyle = {
    userSelect: "none",
    bottom: `${0.15 * idx}em`,
    right: `${0.1 * idx}em`,
    position: "absolute",
  };

  if (!snapshot.isDragging) return initialStyle;
  if (!snapshot.isDropAnimating) return draggableStyle;

  return {
    ...initialStyle,
    position: "initial",
    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

const Deck = ({ cards = [], showTop = false, deckId = "droppable" }) => {
  return (
    <Droppable droppableId={deckId}>
      {(provided) => (
        <StyledDeck ref={provided.innerRef}>
          {cards.map((value, idx) => (
            <Draggable
              key={`${value}-${idx}`}
              draggableId={`${value}-${idx}`}
              index={idx}
              isDragDisabled={idx !== cards.length - 1}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot,
                    provided.draggableProps.style,
                    idx
                  )}
                  ref={provided.innerRef}
                >
                  <Card
                    value={value}
                    show={idx === cards.length - 1 && showTop}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </StyledDeck>
      )}
    </Droppable>
  );
};

Deck.propTypes = {
  cards: PropTypes.array,
  showTop: PropTypes.number,
  deckId: PropTypes.string,
};

export default Deck;
