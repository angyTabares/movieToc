import { useDispatch, useSelector } from "react-redux";
import {
  onChangeLoading,
  onAddNuevaPelicula,
  onDeletePelicula,
  onLoadPeliculas,
  onSetPeliculaActiva,
  onUpdatePelicula,
  searchPeliculaById,
} from "../store";
import Swal from "sweetalert2";
import peliculasApi from "../api/peliculasApi";

export const usePeliculasStore = () => {
  const dispatch = useDispatch();
  const { peliculas, peliculaActiva, isLoadingPeliculas, peliculasDirectores } =
    useSelector((state) => state.peliculas);

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
        Swal.fire("", "Película actualizada", "success");
        return;
      }
      //creando
      const { data } = await peliculasApi.post("/peliculas", pelicula);
      dispatch(onAddNuevaPelicula({ ...pelicula, id: data.id }));
      Swal.fire("", "Película agregada", "success");
    } catch (error) {
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startdeletingPelicula = async (pelicula) => {
    try {
      await peliculasApi.delete(`/peliculas/${pelicula.id}`);
      dispatch(onDeletePelicula());
      return;
    } catch (error) {
      Swal.fire("Error al eliminar", "error");
    }
  };

  const startLoadingPeliculas = async () => {
    dispatch(onChangeLoading());
    try {
      const { data } = await peliculasApi.get("/peliculas");
      dispatch(onLoadPeliculas(data));
    } catch (error) {
      Swal.fire("Error al cargar películas", error.msg, "error");
    }
  };

  const startSearchingPeliculaById = async (id) => {
    try {
      await peliculasApi.get(`/peliculas/${id}`);
      dispatch(searchPeliculaById(id));
    } catch (error) {
      Swal.fire("Error al cargar película", "", "error");
    }
  };
  return {
    //*propiedades
    peliculas,
    peliculaActiva,
    isLoadingPeliculas,
    peliculasDirectores,

    //*Metodos
    setPeliculaActiva,
    startSavingPelicula,
    startdeletingPelicula,
    startLoadingPeliculas,
    startSearchingPeliculaById,
  };
};
