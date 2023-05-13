import { ModalPelicula, Navbar, Tabla } from "../"


export const PeliculasPage = () => {
  return (
    <>
      <Navbar/>

      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h2>Filtros</h2>
          </div>

          <div className="col-md-9">
            <Tabla/>
          </div>
        </div>
      </div>

      <ModalPelicula/>
    </>
  )
}
