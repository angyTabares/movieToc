import { useState } from "react";
import { usePeliculasStore} from "../../hooks"
import PropTypes from 'prop-types';
import { BodyTable } from "./BodyTable";

export const Tabla = ({peliculas}) => {
  const { peliculas:pelis} = usePeliculasStore();
  
  const [paginaActual, setpaginaActual] = useState(1);
  const peliculasXPagina = 10;
  const totalPages = Math.ceil(peliculas.length / peliculasXPagina);

  const indiceUltimaPeli = paginaActual * peliculasXPagina;
  const indicePrimerPeli = indiceUltimaPeli - peliculasXPagina;
  const peliculasActuales = peliculas.slice(indicePrimerPeli, indiceUltimaPeli);

  const renderMovies = () => {
    if(pelis.length===1){
      return pelis.map((movie) => (
        <BodyTable key={movie.id} movie={movie}/>
        ));
    }
    return peliculasActuales.map((movie) => (
        <BodyTable key={movie.id} movie={movie}/>
    ));
  };

  const handlePrevClick = () => {
    if (paginaActual > 1) {
      setpaginaActual(paginaActual - 1);
    }
  };

  const handleNextClick = () => {
    if (paginaActual < totalPages) {
      setpaginaActual(paginaActual + 1);
    }
  }

  return (
    <>
      <div className="table-responsive mt-3" style={{backgroundColor:"white"}}>
          <table className="table table-bordered">
              <thead>
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Título</th>
                  <th width="50px" scope="col"></th>
                  <th width="50px" scope="col"></th>
              </tr>
              </thead>
              <tbody>
                {renderMovies()}
              </tbody>
          </table>
          <div>
            <button className="btn btn-secondary" onClick={handlePrevClick} disabled={paginaActual === 1}>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <span className="mx-2">{paginaActual}</span>
            <button className="btn btn-secondary" onClick={handleNextClick} disabled={paginaActual === totalPages}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
      </div>
    </>
  )
}

Tabla.propTypes = {
  peliculas: PropTypes.arrayOf(PropTypes.object).isRequired,
};