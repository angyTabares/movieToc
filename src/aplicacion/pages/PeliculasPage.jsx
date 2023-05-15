import { ModalPelicula, Navbar, Tabla,Loading, Footer, Buscador } from "../"
import { usePeliculasStore } from "../../hooks";
import { generos } from "../../data/generos"
import {  useEffect, useState } from "react";
import { filtrarDirectores } from "../../helpers/filtrarDirectores";

export const PeliculasPage = () => {
  const {peliculas,isLoadingPeliculas, peliculasDirectores,startLoadingPeliculas } = usePeliculasStore();
  const [peliculasFiltradas, setPeliculasFiltradas] = useState(peliculas);
  const [peliculaBuscador, setpeliculaBuscador] = useState(peliculas);
  const directores = filtrarDirectores(peliculasDirectores); 
  const [anio, setAnio] = useState(0);
  const [generoRadioStates, setgeneroRadioStates] = useState(Array(generos.length).fill(false));
  const [directorRadioStates, setdirectorRadioStates] = useState(Array(directores.length).fill(false));

  const onFiltrar = () => {
    const filteredMovies = peliculas.filter((pelicula) => {
      const filterGenero = !localStorage.getItem("genero") || pelicula.genero === localStorage.getItem("genero");
      const filterAnio = !localStorage.getItem("anio") || pelicula.anio == localStorage.getItem("anio");
      const filterDirector = !localStorage.getItem("director") || pelicula.director === localStorage.getItem("director");
      
      return filterGenero && filterAnio && filterDirector;
    });
    setPeliculasFiltradas(filteredMovies);
    setpeliculaBuscador(peliculas);
  };

  const onFavoritos = () => {
    setPeliculasFiltradas(peliculas.filter((pelicula)=>pelicula.favorita===true));
  }

  const onGeneroChange=(genero,index) => {
    localStorage.setItem("genero", genero.nombre);
    const newgeneroRadioStates = [...generoRadioStates];
    newgeneroRadioStates.fill(false);
    newgeneroRadioStates[index] = true;
    setgeneroRadioStates(newgeneroRadioStates);
  }

  const onDirectorChange=(director,index) => {
    localStorage.setItem("director", director);
    const newdirectorRadioStates = [...directorRadioStates];
    newdirectorRadioStates.fill(false);
    newdirectorRadioStates[index] = true;
    setdirectorRadioStates(newdirectorRadioStates);
  }

  const onLimpiar = () => {    
    localStorage.clear();
    setAnio(0);
    setPeliculasFiltradas(peliculas);
    setdirectorRadioStates(Array(directores.length).fill(false));
    setgeneroRadioStates(generoRadioStates.fill(false));
  }
  
  useEffect(() => {
    localStorage.clear();
    startLoadingPeliculas();
  }, [])

  /*
  useEffect(() => {
    startLoadingPeliculas();
  }, [peliculas])*/

  return (
    <>
     {isLoadingPeliculas && <Loading/>}
      <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
              <div className="d-grid gap-2 mt-3">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={onLimpiar}>Eliminar filtros</button>
                <button className="btn btn-secondary" type="button" style={{borderColor:"black"}} onClick={onFavoritos}>
                  <i className="fa fa-star" aria-hidden="true" style={{color:"gold"}}></i>
                    &nbsp;
                  <span>Favoritas</span>
                </button>
              </div>

            <div className="card mt-3">
              <div className="card-body">
                <h4 className="card-title">Género</h4>
                {
                      generos.map((genero, index) => (
                        <div className="form-check" key={genero.id}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`flexRadioDefault2`}
                            id={`flexRadioDefault2${genero.id}`}
                            checked={generoRadioStates[index]}
                            onChange={()=>onGeneroChange(genero,index)}
                          />
                          <label className="form-check-label">{genero.nombre}</label>
                        </div>
                      ))
                    }
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="btn btn-dark btn-sm mt-2" type="button" onClick={onFiltrar}>Aplicar</button>
                  </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <h4 className="card-title">Director</h4>
                  {
                          directores.map((director, index) => (
                            <div className="form-check" key={director}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`flexRadioDefault`}
                                id={`flexRadioDefault${director}`}
                                checked={directorRadioStates[index]}
                                onChange={()=>onDirectorChange(director,index)}
                              />
                              <label className="form-check-label">{director}</label>
                            </div>
                          ))
                  }
                  <div className="d-grid gap-1 col-12 mx-auto">
                    <button className="btn btn-dark btn-sm mt-2" type="button" onClick={onFiltrar}>Aplicar</button>
                  </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <h4 className="card-title">Año</h4>
                  {
                    <input
                      type="number"
                      className={`form-control`}
                      placeholder="Año"
                      name="anio"
                      min="1800" 
                      max="2023" 
                      step="1"
                      value={anio}
                      onChange= {(e)=>{localStorage.setItem("anio",e.target.value );setAnio(e.target.value )}}    
                    ></input>
                  }
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="btn btn-dark btn-sm mt-2" type="button" onClick={onFiltrar}>Aplicar</button>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-9">
          <Buscador/>
           {
             (peliculasFiltradas.length===0 || peliculaBuscador.length===1?<Tabla peliculas={peliculas}/>:<Tabla peliculas={peliculasFiltradas}/>)
           } 
          </div> 
        </div>
      </div>
      <Footer/>
      <ModalPelicula/>
    </>
  )
}
