import { Link} from "react-router-dom";
import { usePeliculasStore, useUiStore } from "../../hooks";

export const Navbar = () => {

  const { openDateModal } = useUiStore();
  const {setPeliculaActiva}=usePeliculasStore();
  
  const onAddMovie = ()=>{
    setPeliculaActiva(
      {
        titulo: "",
        director: "",
        anio: "",
        descripcion:
          " ",
        favorita: false,
        genero: "",
      }
    )
    openDateModal();
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <div className="container">
          <span className="navbar-brand">
              <i className="fa fa-film" aria-hidden="true"></i>
              <Link
                className="navbar-brand" 
                to="/*"
                >
                &nbsp;
                MovieToc
              </Link>

          </span>

          <button className="btn btn-outline-light" onClick={onAddMovie}>
            <i className="fa fa-plus" aria-hidden="true" ></i>
            &nbsp;
            <span>Agregar</span>
          </button>
        </div>
    </div>
  )
}
