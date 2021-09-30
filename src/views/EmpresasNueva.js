import React, {useRef, useState} from 'react';
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
// Importamos la biblioteca de yup en el objeto "yup".
import * as yup from 'yup';
// Importamos React Hook Form.
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// Definimos el schema de validación usando yup.
// Queremos que sea un objeto con la siguiente forma:
const validationSchema = yup.object().shape({
    // Debemos tener una propiedad id_pais que sea numérica y no vacía.
    id_pais: yup.number().typeError('Tenés que elegir el país de la empresa.').required('Tenés que elegir el país de la empresa.').moreThan(0, 'Tenés que elegir el país de la empresa.'),
    // También debemos tener una propiedad nombre que sea un string de al menos 2 caracteres.
    nombre: yup.string().required('Tenés que escribir el nombre de la empresa.').min(2, 'El nombre de la empresa debe tener al menos ${min} caracteres.'),
});

function EmpresasNueva() {
    // Instanciamos RHF (React Hook Form).
    // Como vemos en su documentación, useForm retorna un objeto con varias propiedades, de las cuales
    // deestructuramos solo las que nos interesan.
    // Noten que ninguno de estos valores representan los datos en sí. Esos nos los va a pasar
    // automáticamente cuando se envíe el form.
    // register es particularmente importante. Este método es el que vamos a utilizar para crear los
    // datos del state y asociarlos al mismo tiempo con el control de form.
    // Si queremos usar Yup para la validación, tenemos que instalar los resolvers (@hookform/resolvers)
    // e indicar el que queremos usar en las opciones del hook.
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    // RHF reemplaza este state.
    // const [data, setData] = useState({
    //     id_pais: '',
    //     nombre: '',
    // });

    // RHF también reemplaza esto.
    // const [errors, setErrors] = useState({
    //     id_pais: null,
    //     nombre: null,
    // });

    // Creamos la "ref" para almacenar la referencia al input del logoRef.
    const logoRef = useRef(null);
    let logoData = null;

    const [isLoading, setIsLoading] = useState(false);

    /**
     * Lee la imagen elegida, y la convierte a base64 para prepararla para el upload.
     *
     * @param ev
     */
    function handleChangeLogo(ev) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            logoData = reader.result;
            // console.log("La imagen leída: ", logoData);
        });

        reader.readAsDataURL(logoRef.current.files[0]);
    }

    // RHF también reemplaza esto.
    // function handleFormControl(ev) {
    //     if(isLoading) return;
    //     const name = ev.target.name;
    //     setData({
    //         ...data,
    //         // La variable entre [] en la key del objeto, significa que queremos usar el valor de la
    //         // variable como key.
    //         [name]: ev.target.value
    //     });
    // }

    // UPDATE: Esta función ahora va a ser invocada por el "handleSubmit" de RHF.
    // Como parámetro, va a recibir un objeto con los datos del formulario.
    function onSubmit(data) {
        // ev.preventDefault();

        // console.log(logoRef.current);
        // return;
        console.log("La data recibida por RHF es: ", data);
        // return;

        if(isLoading) return;

        setIsLoading(true);

        empresasService
            .create({
                ...data,
                logo: logoData
            })
            .then(data => {
                setIsLoading(false);
                if(!data.success) {
                    // Hubo algún error...
                    // if(data.errors) {
                    //     setErrors(data.errors);
                    // }
                }
                console.log("Success? ", data);
            });
    }
    console.log('Errors: ', errors);

    return (<main className="container">
        <h1>Crear nueva empresa</h1>
        <p>Completá los datos para crear la empresa.</p>

        {/* En el onSubmit llamamos al handleSubmit que provee RHF, y lo ejecutamos pasando como argumento la función onSubmit que creamos y que va a recibir la data. */}
        <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="mb-3">
                <label htmlFor="id_pais" className="form-label">País</label>
                <select
                    id="id_pais"
                    className="form-control"
                    aria-describedby={
                        isLoading ? 'Cargando, por favor esperá...' :
                        errors.id_pais ? "error-id_pais" : null
                    }
                    {...register('id_pais'/*, {required: 'Tenés que elegir el país'}*/)}
                >
                    <option value="">Elegí un país</option>
                    <option value="1">Argentina</option>
                    <option value="2">Estados Unidos</option>
                </select>
                {errors.id_pais && <div className="text-danger" id="error-id_pais"><span className="visually-hidden">Error: </span>{errors.id_pais.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    aria-describedby={
                        isLoading ? 'Cargando, por favor esperá...' :
                        errors.nombre ? "error-nombre" : null
                    }
                    {...register('nombre', /*{
                        required: 'Tenés que escribir el nombre',
                        minLength: {
                            value: 2,
                            message: 'El nombre tiene que tener al menos 2 caracteres.'
                        }
                    }*/)}
                />
                {errors.nombre && <div className="text-danger" id="error-nombre"><span className="visually-hidden">Error: </span>{errors.nombre.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    ref={logoRef}
                    onChange={handleChangeLogo}
                />
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
