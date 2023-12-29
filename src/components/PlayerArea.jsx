import Deck from "./Deck";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import PropTypes from "prop-types";

const StyledPlayerArea = styled.div`
  div.player-piles {
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
    justify-content: center;
    div.player-discard-piles {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`;

const PlayerArea = ({}) => {
  const stock = useSelector((s) => s.player.stock);
  const discardPiles = useSelector((s) => s.player.discardPiles);

  return (
    <StyledPlayerArea>
      <div className="player-piles">
        <div className="player-discard-piles">
          {discardPiles.map((discardPile, index) => (
            <Deck
              key={`discard-${index}`}
              showTop
              placeholder="discard"
              cards={discardPile}
              deckId={`discard-${index}`}
            />
          ))}
        </div>
        <Deck deckId="player-stock" showTop placeholder="stock" cards={stock} />
      </div>
    </StyledPlayerArea>
  );
};

PlayerArea.propTypes = {};

export default PlayerArea;
