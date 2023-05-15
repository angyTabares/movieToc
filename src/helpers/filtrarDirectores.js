export const filtrarDirectores = (peliculas) => {
  return [...new Set(peliculas.map((pelicula) => pelicula.director))];
};
