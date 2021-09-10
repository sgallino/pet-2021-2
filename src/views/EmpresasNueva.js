import React, {useState} from 'react';
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
// Importamos la biblioteca de yup en el objeto "yup".
import * as yup from 'yup';

// Definimos el schema de validación usando yup.
// Queremos que sea un objeto con la siguiente forma:
const validationSchema = yup.object().shape({
    // Debemos tener una propiedad id_pais que sea numérica y no vacía.
    id_pais: yup.number().required('Tenés que elegir el país de la empresa.').moreThan(0, 'Tenés que elegir el país de la empresa.'),
    // También debemos tener una propiedad nombre que sea un string de al menos 2 caracteres.
    nombre: yup.string().required('Tenés que escribir el nombre de la empresa.').min(2, 'El nombre de la empresa debe tener al menos ${min} caracteres.'),
});

function EmpresasNueva() {
    const [data, setData] = useState({
        id_pais: '',
        nombre: '',
    });

    const [errors, setErrors] = useState({
        id_pais: null,
        nombre: null,
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleFormControl(ev) {
        if(isLoading) return;
        const name = ev.target.name;
        setData({
            ...data,
            // La variable entre [] en la key del objeto, significa que queremos usar el valor de la
            // variable como key.
            [name]: ev.target.value
        });
    }

    function handleSubmit(ev) {
        ev.preventDefault();

        if(isLoading) return;

        setIsLoading(true);

        // const localErrors = {};
        // if(data.nombre == null || data.nombre.trim() === '') {
        //     localErrors.nombre = 'Tenés que escribir el nombre de la empresa.';
        // }
        //
        // if(data.id_pais === '') {
        //     localErrors.id_pais = 'Tenés que indicar el país de la empresa.';
        // }

        // Object.entries retorna los datos del objeto como un array.
        // Por cada propiedad del objeto, recibimos un array de dos posiciones: [key, value]
        // if(Object.entries(localErrors).length > 0) {
        // // if(localErrors.nombre || localErrors.id_pais) {
        //     setIsLoading(false);
        //     setErrors(localErrors);
        //     // console.log("Errores de validación: ", localErrors);
        //     return;
        // }
        // setErrors({});

        // Validamos con yup.
        validationSchema
            .validate({
                ...data,
                id_pais: +data.id_pais
            }, {
                // Indica que no se corte ante el primer error.
                abortEarly: false,
            })
            .then(valid => {
                // console.log(valid);
                setIsLoading(false);
                empresasService
                    .create(data)
                    .then(data => {
                        if(!data.success) {
                            // Hubo algún error...
                            if(data.errors) {
                                setErrors(data.errors);
                            }
                        }
                        console.log("Success? ", data);
                    });
            })
            .catch(err => {
                // console.log(err.inner);
                // Definimos un objeto para almacenar los mensajes de error.
                const validationErrors = {};
                // Recorremos todos los errores que reciben las propiedades del objeto validado.
                // Por cada una, agregamos el valor al objeto de errores.
                err.inner.forEach(err => validationErrors[err.path] = err.errors);
                console.log(validationErrors);
                setIsLoading(false);
                setErrors(validationErrors);
            });


    }

    return (<main className="container">
        <h1>Crear nueva empresa</h1>
        <p>Completá los datos para crear la empresa.</p>

        <form
            action="#"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="id_pais" className="form-label">País</label>
                <select
                    name="id_pais"
                    id="id_pais"
                    className="form-control"
                    onChange={handleFormControl}
                    value={data.id_pais}
                    aria-describedby={
                        isLoading ? 'Cargando, por favor esperá...' :
                        errors.id_pais ? "error-id_pais" : null
                    }
                >
                    <option value="">Elegí un país</option>
                    <option value="1">Argentina</option>
                    <option value="2">Estados Unidos</option>
                </select>
                {errors.id_pais && <div className="text-danger" id="error-id_pais"><span className="visually-hidden">Error: </span>{errors.id_pais}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    onChange={handleFormControl}
                    value={data.nombre}
                    aria-describedby={
                        isLoading ? 'Cargando, por favor esperá...' :
                        errors.nombre ? "error-nombre" : null
                    }
                />
                {errors.nombre && <div className="text-danger" id="error-nombre"><span className="visually-hidden">Error: </span>{errors.nombre}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input type="file" id="logo" name="logo" className="form-control" disabled/>
            </div>
            <button type="submit" className="btn btn-primary w-100">
                {
                    isLoading ?
                        <Loader/> :
                        'Crear Empresa'
                }
            </button>
        </form>
    </main>);
}

export default EmpresasNueva;
