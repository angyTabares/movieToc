import PropTypes from 'prop-types';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { BsTrashFill,BsFillEyeFill} from "react-icons/bs"
import { usePeliculasStore, useUiStore } from '../../hooks';

export const BodyTable = ({movie}) => {
   const {setPeliculaActiva, startdeletingPelicula} = usePeliculasStore();
   const { openDateModal } = useUiStore();

   const verPelicula=(pelicula)=>{
    setPeliculaActiva(pelicula);
    openDateModal();
  }

  const onDelete=(pelicula)=>{
    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta película?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:"No, salir",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setPeliculaActiva(pelicula);
        startdeletingPelicula(pelicula);
        Swal.fire("","Película eliminada", 'success');
      }
    })
  }
  return (
    <tr key={movie.id}>
      <td>{movie.id}</td>
      <td>{movie.titulo}</td>
      <td><BsFillEyeFill size={30} onClick={()=>verPelicula(movie)}></BsFillEyeFill></td>
      <td><BsTrashFill  size={30} onClick={()=>onDelete(movie)} style={{color:"red"}}></BsTrashFill></td>
    </tr>
  )
}

BodyTable.propTypes = {
    movie: PropTypes.object.isRequired,
};
