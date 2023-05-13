import { createSlice } from "@reduxjs/toolkit";

const pelitemp = {
  id: "1",
  titulo: "El señor de los anillos",
  director: "Peter Jackson",
  anio: "2001",
  descripcion:
    "En la Tierra Media, el Señor Oscuro Sauron forjó los Grandes Anillos del Poder y creó uno con el poder de esclavizar a toda la Tierra Media. ",
  favorita: true,
  genero: "Novela",
};

export const peliculasSlice = createSlice({
  name: "peliculas",
  initialState: {
    peliculas: [pelitemp],
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
  },
});

export const {
  onSetPeliculaActiva,
  onAddNuevaPelicula,
  onUpdatePelicula,
  onDeletePelicula,
} = peliculasSlice.actions;
