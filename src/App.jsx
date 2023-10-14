import Game from "./Game";

const defaultGameRules = {
  maxColorCards: 144,
  maxSkipPoCards: 18,
  maxBuildPiles: 4,
  maxDiscardPilesPerPlayer: 4,
  maxCardsPerHand: 5,
  maxCardsPerStockPile: 30,
  maxPlayers: 4,
  allowBots: true,
  allowOnline: true,
};

function App() {
  return <Game gameRules={defaultGameRules} />;
}

export default App;
