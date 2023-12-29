import { DragDropContext } from "react-beautiful-dnd";
import Deck from "./Deck";
import styled from "styled-components";
import { useMemo } from "react";
import PropTypes from "prop-types";
import PlayerArea from "./PlayerArea";

const StyledPlayArea = styled.div`
  background-color: #00ae0d;
  height: 100vh;
  width: 100%;
  box-shadow: inset 0 0 2rem black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  div.build-piles {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Game = ({ gameRules = {} }) => {
  const BuildPiles = useMemo(() => {
    let buildPiles = [];
    for (let i = 0; i < gameRules.maxBuildPiles; i++) {
      buildPiles.push(
        <Deck
          key={`build-${i}`}
          deckId={`build-${i}`}
          showTop
          placeholder="build"
        />
      );
    }
    return buildPiles;
  }, [gameRules.maxBuildPiles]);

  return (
    <DragDropContext onDragEnd={console.log}>
      <StyledPlayArea>
        <div className="build-piles">{BuildPiles}</div>
        <PlayerArea
          maxCardsPerStockPile={gameRules.maxCardsPerStockPile}
          maxDiscardPilesPerPlayer={gameRules.maxDiscardPilesPerPlayer}
          maxCardsPerHand={gameRules.maxCardsPerHand}
        />
      </StyledPlayArea>
    </DragDropContext>
  );
};

Game.propTypes = {
  gameRules: PropTypes.object,
};

export default Game;
