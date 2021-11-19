import React, {useEffect, useRef, useState} from 'react';
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
// Importamos la biblioteca de yup en el objeto "yup".
import * as yup from 'yup';
// Importamos React Hook Form.
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useParams} from "react-router-dom";
import {IMAGE_PATH} from "../constants/constants.js";
import {showNotificacion} from "../services/notificaciones.js";

// Definimos el schema de validación usando yup.
// Queremos que sea un objeto con la siguiente forma:
const validationSchema = yup.object().shape({
    // Debemos tener una propiedad id_pais que sea numérica y no vacía.
    id_pais: yup.number().typeError('Tenés que elegir el país de la empresa.').required('Tenés que elegir el país de la empresa.').moreThan(0, 'Tenés que elegir el país de la empresa.'),
    // También debemos tener una propiedad nombre que sea un string de al menos 2 caracteres.
    nombre: yup.string().required('Tenés que escribir el nombre de la empresa.').min(2, 'El nombre de la empresa debe tener al menos ${min} caracteres.'),
});

function EmpresasEditar() {
    // Instanciamos RHF (React Hook Form).
    // Como vemos en su documentación, useForm retorna un objeto con varias propiedades, de las cuales
    // deestructuramos solo las que nos interesan.
    // Noten que ninguno de estos valores representan los datos en sí. Esos nos los va a pasar
    // automáticamente cuando se envíe el form.
    // register es particularmente importante. Este método es el que vamos a utilizar para crear los
    // datos del state y asociarlos al mismo tiempo con el control de form.
    // Si queremos usar Yup para la validación, tenemos que instalar los resolvers (@hookform/resolvers)
    // e indicar el que queremos usar en las opciones del hook.
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const {id} = useParams();
    const [logoActual, setLogoActual] = useState(null);
    // console.log(id);

    useEffect(() => {
        if(!id) return;
        (async function() {
            // console.log(id);
            const empresa = await empresasService.get(id);
            setValue('id_pais', empresa.data.id_pais);
            setValue('nombre', empresa.data.nombre);
            setLogoActual(empresa.data.logo);
            // console.log(empresa);
        })().catch(err => console.error("Error editar: ", err));
    }, [id])

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
            .update(id, {
                ...data,
                logo: logoData
            })
            .then(responseData => {
                setIsLoading(false);
                if(responseData.success) {
                    showNotificacion({
                        title: 'Éxito',
                        message: 'Empresa ' + data.nombre + ' actualizada correctamente.',
                        type: 'success',
                        closable: true,
                    });
                } else {
                    showNotificacion({
                        title: 'Error',
                        message: 'Ocurrió un error inesperado y la empresa no pudo actualizarse.',
                        type: 'danger',
                        closable: true,
                    });
                    console.log("Error de actualización data: ", responseData);
                }
                console.log("Success? ", responseData);
            });
    }
    // console.log('Errors: ', errors);

    return (<main className="container">
        <h1>Editar empresa</h1>
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
                <p>Logo actual:</p>
                {
                    logoActual != null ?
                    (<><img src={`${IMAGE_PATH}/empresas/${logoActual}`} alt=""/>
                    <p id="logo-help" className="text-muted">Solo elegí un nuevo logo si querés cambiar la
                        actual.</p></>) :
                    'Sin logo'
                }
            </div>
            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    aria-describedby='logo-help'
                    ref={logoRef}
                    onChange={handleChangeLogo}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">
                {
                    isLoading ?
                        <Loader/> :
                        'Editar Empresa'
                }
            </button>
        </form>
    </main>);
}

export default EmpresasEditar;
