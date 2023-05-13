import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, peliculasSlice } from "./";

export const store = configureStore({
  reducer: {
    peliculas: peliculasSlice.reducer,
    ui: uiSlice.reducer,
  },
});
