import { useDispatch, useSelector } from "react-redux";

import Deck from "./Deck";
import { DragDropContext } from "react-beautiful-dnd";
import PlayerArea from "./PlayerArea";
import PropTypes from "prop-types";
import { initialize as initializeGame } from "../logic/gameSlice";
import { initialize as initializePlayer } from "../logic/playerSlice";
import styled from "styled-components";
import { useEffect } from "react";

const StyledPlayArea = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 171, 6, 1) 0%,
    rgba(10, 75, 0, 1) 100%
  );
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
  const buildPiles = useSelector((s) => s.game.buildPiles);
  const dispatch = useDispatch();

  useEffect(() => {
    // initialize game
    dispatch(initializeGame(gameRules));
    dispatch(initializePlayer(gameRules));
  }, [gameRules]);

  return (
    <DragDropContext onDragEnd={console.log}>
      <StyledPlayArea>
        <div className="build-piles">
          {buildPiles.map((buildPile, index) => (
            <Deck
              key={`build-${index}`}
              deckId={`build-${index}`}
              showTop
              placeholder="build"
              cards={buildPile}
            />
          ))}
        </div>
        <PlayerArea />
      </StyledPlayArea>
    </DragDropContext>
  );
};

Game.propTypes = {
  gameRules: PropTypes.object,
};

export default Game;
