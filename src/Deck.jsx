import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const StyledDeck = styled.div`
  position: relative;
  height: 12em;
  width: 8em;
  border: 0.1rem solid lightgray;
  border-radius: 0.75em;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "${(props) => props.placeholder}";
    text-transform: uppercase;
    color: lightgray;
    position: absolute;
  }
`;

const getItemStyle = (snapshot, draggableStyle, idx) => {
  const initialStyle = {
    userSelect: "none",
    bottom: `${0.05 * idx}em`,
    right: `${0.025 * idx}em`,
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

const getListStyle = (isDraggingOver) => ({
  boxShadow: isDraggingOver ? "inset 0 0 1em lightgray, 0 0 2em lightgray" : "none",
});

const Deck = ({
  cards = [],
  showTop = false,
  deckId = "droppable",
  placeholder = "Deck",
}) => {
  return (
    <Droppable droppableId={deckId}>
      {(provided, snapshot) => (
        <StyledDeck
          ref={provided.innerRef}
          placeholder={placeholder}
          style={getListStyle(snapshot.isDraggingOver)}
        >
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
  showTop: PropTypes.bool,
  deckId: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Deck;
