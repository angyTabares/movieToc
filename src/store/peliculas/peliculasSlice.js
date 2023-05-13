import { createSlice } from "@reduxjs/toolkit";

export const peliculasSlice = createSlice({
  name: "peliculas",
  initialState: {
    isLoadingPeliculas: true,
    peliculas: [],
    peliculaActiva: null,
  },
  reducers: {
    onSetPeliculaActiva: (state, { payload }) => {
      state.peliculaActiva = payload;
    },
    onAddNuevaPelicula: (state, { payload }) => {
      state.peliculas.push(payload);
      state.peliculaActiva = null;
    },
    onUpdatePelicula: (state, { payload }) => {
      state.peliculas = state.peliculas.map((pelicula) => {
        if (pelicula.id === payload.id) {
          return payload;
        }

        return pelicula;
      });
    },
    onDeletePelicula: (state) => {
      if (state.peliculaActiva) {
        state.peliculas = state.peliculas.filter(
          (pelicula) => pelicula.id !== state.peliculaActiva.id
        );
        state.peliculaActiva = null;
      }
    },
    onLoadPeliculas: (state, { payload = [] }) => {
      state.isLoadingPeliculas = false;

      payload.forEach((pelicula) => {
        const exists = state.peliculas.some(
          (dbPelicula) => dbPelicula.id === pelicula.id
        );
        if (!exists) {
          state.peliculas.push(pelicula);
        }
      });
    },
  },
});

export const {
  onSetPeliculaActiva,
  onAddNuevaPelicula,
  onUpdatePelicula,
  onDeletePelicula,
  onLoadPeliculas,
} = peliculasSlice.actions;
