import { useEffect, useState } from "react";
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
    const [favorita, setFavorita] = useState((peliculaActiva?.favorita=== true ? true : false));
    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        titulo: '',
        director: '',
        anio:'',
        descripcion:"",
        favorita:false,
    })
    
    const validate=async()=>{
        const newErrors = {};

        if (formValues.titulo.length<=0) {
          newErrors.titulo = "El campo titulo es obligatorio";
        }
        if (formValues.director.length<=0) {
            newErrors.director = "El campo director es obligatorio";
        }
        if (formValues.anio==0) {
            newErrors.anio = "El campo año es obligatorio";
        }
        if (formValues.descripcion.length<=0) {
            newErrors.descripcion = "El campo descripcion es obligatorio";
        }
        if (genero.length<=0) {
            newErrors.genero = "El campo genero es obligatorio";
        }
      
        setErrors(newErrors);

        if(!newErrors.titulo && !newErrors.director && !newErrors.anio && !newErrors.descripcion && !newErrors.genero){
            await startSavingPelicula({...formValues,genero,favorita});
            closeDateModal();
        }
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        if(peliculaActiva!==null){
          setGenero(peliculaActiva.genero);
          setFavorita(peliculaActiva.favorita);
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
        setErrors({});
        closeDateModal();
    }

    const onSubmit=async(event)=>{
        event.preventDefault();  
        validate();
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
                <label>Titulo </label>
                <input 
                    type="text" 
                    className={`form-control`}
                    placeholder="Título de la película"
                    name="titulo"
                    autoComplete="off"
                    value={ formValues.titulo}
                    onChange={onInputChanged}
                />
                {errors.titulo && <span className="text-danger">{errors.titulo}</span>}
            </div>

            <div className="form-group mb-2">
                <label>Director </label>
                <input
                    type="text" 
                    className={`form-control`}
                    placeholder="Director"
                    name="director"
                    value={ formValues.director}
                    onChange={onInputChanged}    
                ></input>
                {errors.director && <span className="text-danger">{errors.director}</span>}
            </div>

            <div className="form-group mb-2">
                <label>Año</label>
                <input
                    type="number"
                    className={`form-control`}
                    placeholder="Año"
                    name="anio"
                    value={ formValues.anio}
                    onChange={onInputChanged}
                    min="1800" 
                    max="2023" 
                    step="1"    
                ></input>
                {errors.anio && <span className="text-danger">{errors.anio}</span>}
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
                {errors.genero && <span className="text-danger">{errors.genero}</span>}
            </div>

            <div className="form-group mb-2">
                <label>Descripción</label>
                <textarea 
                    type="text" 
                    className={`form-control`}
                    placeholder="Descripción"
                    rows="3"
                    name="descripcion"
                    value={ formValues.descripcion}
                    onChange={onInputChanged}
                ></textarea>
                {errors.descripcion && <span className="text-danger">{errors.descripcion}</span>}
            </div>

            <div className="form-group mb-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck3" checked={favorita} onChange= {()=>setFavorita(!favorita)} />
                    <label className="form-check-label" >
                        {
                            (favorita ? "Favorita ": "Marcar como favorita")
                        }
                    </label>
                </div>
            </div>
            
            <button
                type="submit"
                className="btn btn-outline-primary btn-block mt-3"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
    )
}
