import { useDispatch, useSelector } from "react-redux";
import {
  onAddNuevaPelicula,
  onDeletePelicula,
  onSetPeliculaActiva,
  onUpdatePelicula,
} from "../store";
import Swal from "sweetalert2";

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
        //await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdatePelicula({ ...pelicula }));
        dispatch(onSetPeliculaActiva(pelicula));
        return;
      }
      //creando
      //const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNuevaPelicula({ ...pelicula, id: "123" }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error, "error");
    }
  };

  const startdeletingPelicula = async () => {
    try {
      if (peliculaActiva.id) {
        //await calendarApi.delete(`/events/${activeEvent.id}`);
        dispatch(onDeletePelicula());
        return;
      }
    } catch (error) {
      Swal.fire("Error al eliminar", error, "error");
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
  };
};
