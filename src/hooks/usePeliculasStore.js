import { useDispatch, useSelector } from "react-redux";
import {
  onAddNuevaPelicula,
  onDeletePelicula,
  onLoadPeliculas,
  onSetPeliculaActiva,
  onUpdatePelicula,
} from "../store";
import Swal from "sweetalert2";
import peliculasApi from "../api/peliculasApi";

export const usePeliculasStore = () => {
  const dispatch = useDispatch();
  const { peliculas, peliculaActiva } = useSelector((state) => state.peliculas);

  const setPeliculaActiva = (pelicula) => {
    dispatch(onSetPeliculaActiva(pelicula));
  };

  const startSavingPelicula = async (pelicula) => {
    try {
      if (pelicula.id) {
        //actualizando
        await peliculasApi.put(`/peliculas/${pelicula.id}`, pelicula);
        dispatch(onUpdatePelicula({ ...pelicula }));
        dispatch(onSetPeliculaActiva(pelicula));
        return;
      }
      //creando
      const { data } = await peliculasApi.post("/peliculas", pelicula);
      dispatch(onAddNuevaPelicula({ ...pelicula, id: data.id }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startdeletingPelicula = async () => {
    try {
      if (peliculaActiva.id) {
        await peliculasApi.delete(`/peliculas/${peliculaActiva.id}`);
        dispatch(onDeletePelicula());
        return;
      }
    } catch (error) {
      Swal.fire("Error al eliminar", "error");
    }
  };

  const startLoadingPeliculas = async () => {
    try {
      const { data } = await peliculasApi.get("/peliculas");
      dispatch(onLoadPeliculas(data));
      console.log({ data });
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //*propiedades
    peliculas,
    peliculaActiva,

    //*Metodos
    setPeliculaActiva,
    startSavingPelicula,
    startdeletingPelicula,
    startLoadingPeliculas,
  };
};
