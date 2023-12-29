import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hand: [], // i.e [1,2,3]
  discardPiles: [], // i.e [[1,2,3], [4,5,6]]
  stock: [], // i.e [4,5,6]
  maxDiscardPilesPerPlayer: 4,
  maxCardsPerHand: 5,
  maxCardsPerStockPile: 30,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Initialize player
    initialize: (state, action) => {
      const {
        maxDiscardPilesPerPlayer,
        maxCardsPerHand,
        maxCardsPerStockPile,
      } = action.payload;

      state.maxDiscardPilesPerPlayer = maxDiscardPilesPerPlayer;
      state.maxCardsPerHand = maxCardsPerHand;
      state.maxCardsPerStockPile = maxCardsPerStockPile;

      for (let i = 0; i < maxDiscardPilesPerPlayer; i++) {
        state.discardPiles.push([]);
      }
    },
    // Hand actions
    addCardsToHand: (state, action) => {
      const newCards = action.payload;
      if (!Array.isArray(newCards)) return;

      state.hand.push(...newCards);
      // ensure maximum allowed number of cards
      state.hand.slice(0, state.maxCardsPerHand);
    },
    removeCardFromHand: (state, action) => {
      const cardIndex = action.payload;
      if (typeof cardIndex !== "number") return;

      state.hand.splice(cardIndex, 1);
    },
    // Stock actions
    addCardsToStock: (state, action) => {
      const newCards = action.payload;
      if (!Array.isArray(newCards)) return;

      state.stock.push(...newCards);
      // ensure maximum allowed number of cards
      state.stock.slice(0, state.maxCardsPerStockPile);
    },
    popStock: (state) => {
      state.stock.pop();
    },
    // Discard actions
    addCardToDiscardPile: (state, action) => {
      const { pileIndex, newCard } = action.payload;
      if (
        typeof pileIndex !== "number" ||
        typeof newCard !== "string" ||
        !state.discardPiles[pileIndex]
      )
        return;

      state.discardPiles[pileIndex].push(newCard);
    },
    popDiscardPile: (state, action) => {
      const pileIndex = action.payload;
      if (typeof pileIndex !== "number") return;

      state.discardPiles[pileIndex].pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialize,
  addCardsToHand,
  removeCardFromHand,
  addCardsToStock,
  popStock,
  addCardToDiscardPile,
  popDiscardPile,
} = playerSlice.actions;

export default playerSlice.reducer;
