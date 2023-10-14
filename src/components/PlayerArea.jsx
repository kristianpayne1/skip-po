import styled from "styled-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import Deck from "./Deck";

const StyledPlayerArea = styled.div`
  div.player-piles {
    display: flex;
    gap: 5rem;
    div.player-discard-piles {
      display: flex;
      gap: 1rem;
    }
  }
`;

const PlayerArea = ({
  maxDiscardPilesPerPlayer,
  maxCardsPerStockPile,
}) => {
  const DiscardPiles = useMemo(() => {
    let discardPiles = [];
    for (let i = 0; i < maxDiscardPilesPerPlayer; i++) {
      discardPiles.push(
        <Deck
          key={`discard-${i}`}
          deckId={`discard-${i}`}
          showTop
          placeholder="discard"
        />
      );
    }
    return discardPiles;
  }, [maxDiscardPilesPerPlayer]);


  // temporary
  const stockPileCards = useMemo(() => {
    let stockPile = [];
    for (let i = 0; i < maxCardsPerStockPile; i++) {
      const card = Math.round(Math.random() * 12) + 1;
      stockPile.push(card === 13 ? "*" : `${card}`);
    }
    return stockPile;
  }, [maxCardsPerStockPile]);

  return (
    <StyledPlayerArea>
      <div className="player-piles">
        <div className="player-discard-piles">{DiscardPiles}</div>
        <Deck
          deckId="player-stock"
          showTop
          placeholder="stock"
          cards={stockPileCards}
        />
      </div>
    </StyledPlayerArea>
  );
};

PlayerArea.propTypes = {
  maxDiscardPilesPerPlayer: PropTypes.number,
  maxCardsPerStockPile: PropTypes.number,
};

export default PlayerArea;
