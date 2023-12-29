import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buildPiles: [], // i.e [[1,2,3], [4,5,6]]
  draw: [], // i.e [4,5,6]
  maxBuildPiles: 4,
  maxColorCards: 144,
  maxSkipPoCards: 18,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Initialize game
    initialize: (state, action) => {
      const { maxBuildPiles, maxColorCards, maxSkipPoCards } = action.payload;

      state.maxBuildPiles = maxBuildPiles;
      state.maxColorCards = maxColorCards;
      state.maxSkipPoCards = maxSkipPoCards;

      for (let i = 0; i < maxBuildPiles; i++) {
        state.buildPiles.push([]);
      }
    },
    // Draw actions
    addCardsToDraw: (state, action) => {
      const newCards = action.payload;
      if (!Array.isArray(newCards)) return;

      state.draw.push(...newCards);
    },
    removeCardsFromDraw: (state, action) => {
      const numberOfCards = action.payload;
      if (typeof numberOfCards !== "number") return;

      state.draw.slice(0, -numberOfCards);
    },
    // Build actions
    addCardToBuildPile: (state, action) => {
      const { pileIndex, newCard } = action.payload;
      if (
        typeof pileIndex !== "number" ||
        typeof newCard !== "string" ||
        !state.buildPiles[pileIndex]
      )
        return;

      const parsedPreviousTopCard = parseInt(
        state.buildPiles[pileIndex][state.buildPiles.length - 1]
      );
      const parsedNewCard = parent(newCard);
      // new card must be an increment of previous top card
      if (parsedNewCard - parsedPreviousTopCard !== 1) return;

      state.buildPiles[pileIndex].push(newCard);
    },
    clearBuildPile: (state, action) => {
      const pileIndex = action.payload;
      if (typeof pileIndex !== "number") return;

      state.buildPiles[pileIndex] = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialize,
  addCardsToDraw,
  removeCardsFromDraw,
  addCardToBuildPile,
  clearBuildPile,
} = gameSlice.actions;

export default gameSlice.reducer;
