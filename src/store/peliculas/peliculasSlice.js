import { createSlice } from "@reduxjs/toolkit";

export const peliculasSlice = createSlice({
  name: "peliculas",
  initialState: {
    isLoadingPeliculas: true,
    peliculas: [],
    peliculaActiva: null,
    peliculasDirectores: [],
  },
  reducers: {
    onSetPeliculaActiva: (state, { payload }) => {
      state.peliculaActiva = payload;
    },
    onAddNuevaPelicula: (state, { payload }) => {
      state.peliculas.push(payload);
      state.peliculaActiva = null;
      state.peliculasDirectores.push(payload);
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

        state.peliculasDirectores = state.peliculasDirectores.filter(
          (pelicula) => pelicula.id !== state.peliculaActiva.id
        );
        state.peliculaActiva = null;
      }
    },
    onChangeLoading: (state) => {
      state.isLoadingPeliculas = !state.isLoadingPeliculas;
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

      payload.forEach((pelicula) => {
        const exists = state.peliculasDirectores.some(
          (dbPelicula) => dbPelicula.id === pelicula.id
        );
        if (!exists) {
          state.peliculasDirectores.push(pelicula);
        }
      });
    },
    onLoadPeliculaById: (state, { payload = [] }) => {
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
    searchPeliculaById: (state, action) => {
      state.peliculas = state.peliculas.filter(
        (pelicula) => pelicula.id == action.payload
      );
    },
  },
});

export const {
  onSetPeliculaActiva,
  onAddNuevaPelicula,
  onUpdatePelicula,
  onDeletePelicula,
  onLoadPeliculas,
  onChangeLoading,
  searchPeliculaById,
} = peliculasSlice.actions;
