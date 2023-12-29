import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice.js";
import playerReducer from "./playerSlice.js";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
  },
});
