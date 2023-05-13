import { usePeliculasStore, useUiStore } from "../../hooks"
import { BsTrashFill,BsFillEyeFill} from "react-icons/bs"

export const Tabla = () => {
  const {peliculas, setPeliculaActiva, startdeletingPelicula} = usePeliculasStore();
  const { openDateModal } = useUiStore();

  const verPelicula=(pelicula)=>{
    setPeliculaActiva(pelicula);
    openDateModal();
    
  }

  const onDelete=(pelicula)=>{
    setPeliculaActiva(pelicula);
    startdeletingPelicula();
  }

  return (
    <div className="table-responsive">
        <table className="table table-bordered border-dark">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Titulo</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
              {
                peliculas.map(pelicula => (
                  <tr key={pelicula.id}>
                    <td>{pelicula.id}</td>
                    <td>{pelicula.titulo}</td>
                    <td><BsFillEyeFill size={30} onClick={()=>verPelicula(pelicula)}></BsFillEyeFill></td>
                    <td><BsTrashFill size={30} onClick={()=>onDelete(pelicula)}></BsTrashFill></td>
                  </tr>
                ))
              }
            </tbody>
        </table>
</div>
  )
}
