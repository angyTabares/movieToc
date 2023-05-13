import { useEffect, useMemo, useState } from "react";
import { usePeliculasStore, useUiStore } from "../../hooks";
import Modal from "react-modal";
import {generos } from "../../data/generos.js";
import "./styles/styles.css"
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const ModalPelicula = () => {

    const {isDateModalOpen,closeDateModal} = useUiStore();
    const {peliculaActiva, startSavingPelicula} = usePeliculasStore();
    const [genero, setGenero] = useState(peliculaActiva?.genero);
    const [formSubmitted, setFormSubmmited] = useState(false);

    const [formValues, setFormValues] = useState({
        titulo: '',
        director: '',
        anio:'',
        descripcion:"",
        favorita:false,
    })
    
    const titleClass= useMemo(()=>{
        if(!formSubmitted) return '';
    
        return (formValues.titulo.length > 0 || formValues.director.length > 0 || formValues.descripcion.length > 0 )
          ? ''
          : 'is-invalid';
      })
    
    useEffect(() => {
        if(peliculaActiva!==null){
          setGenero(peliculaActiva.genero);
          setFormValues({...peliculaActiva});
        }
    }, [peliculaActiva])

    const onInputChanged=({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCloseModal=()=>{
        closeDateModal();
    }

    const onSubmit=async(event)=>{
        event.preventDefault();  
        setFormSubmmited(true);

        await startSavingPelicula({...formValues,genero});
        closeDateModal();
        setFormSubmmited(false);
        console.log(formValues,genero) 
    }

    return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <button
          className="btn btn-outline-danger btn-block ReactModal__Close"
          onClick={onCloseModal}
        >
         <i className="fa fa-times" aria-hidden="true"></i>
        </button>

        <h1> Película </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
            <div className="form-group mb-2">
                <label>Titulo</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título de la película"
                    name="titulo"
                    autoComplete="off"
                    value={ formValues.titulo}
                    onChange={onInputChanged}
                />
            </div>

            <div className="form-group mb-2">
                <label>Director </label>
                <input
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Director"
                    name="director"
                    value={ formValues.director}
                    onChange={onInputChanged}    
                ></input>
            </div>

            <div className="form-group mb-2">
                <label>Año</label>
                <input
                    type="number"
                    className={`form-control ${titleClass}`}
                    placeholder="Año"
                    name="anio"
                    value={ formValues.anio}
                    onChange={onInputChanged}    
                ></input>
            </div>


            <div className="form-group mb-2">
                <label>Género</label>
                <select className="form-select" aria-label="Default select example" value={genero} onChange={(event) => {setGenero(event.target.value)} } >
                    <option>Seleccione el género</option>
                    {
                        generos.map((genero)=>(
                            <option key={genero.id} value={genero.nombre}>{genero.nombre}</option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group mb-2">
                <label>Descripción</label>
                <textarea 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Descripción"
                    rows="5"
                    name="descripcion"
                    value={ formValues.descripcion}
                    onChange={onInputChanged}
                ></textarea>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
    )
}
