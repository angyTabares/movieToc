import { useState } from "react";
import { usePeliculasStore } from "../../hooks";

export const Buscador = () => {
  
  const [id, setid] = useState("");

  const {startSearchingPeliculaById} = usePeliculasStore();
  const onBuscar = async()=>{
    await startSearchingPeliculaById(id);
    setid("");
  }

  const onInputChange=({target})=>{
    setid(target.value);
  }

  return (
    <div className="input-group rounded mt-3">
        <input type="text" className="form-control rounded" placeholder="Busqueda por id" value={id} onChange={onInputChange} />
        <button className="btn btn-dark" type="button" onClick={onBuscar}>
            Buscar
        </button>
    </div>
  )
}

