import {IMAGE_PATH} from "../constants/constants.js";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useAuthContext from "../hooks/useAuthContext.js";
import empresasService from "../services/empresas.js";
// import {useEffect, useState} from "react";
// import authService from "../services/auth.js";

function EmpresasListaItem(props) {
    // Vamos a suscribirnos al estado de autenticación.
    // const auth = useAuth();
    // const [auth, setAuth] = useState({
    //     user: {
    //         id_usuario: null,
    //         email: null,
    //     }
    // });
    //
    // useEffect(() => {
    //     // Suscribimos al evento.
    //     // Nuestro subscribe retorna la función de cancelación a la suscripción.
    //     const unsubscribe = authService.subscribe(user => {
    //         setAuth({
    //             user: {...user}
    //         });
    //     });
    //     // El useEffect espera como retorno del efecto, una función de "limpieza".
    //     // Esa función de limpieza debería "limpiar" todo lo que el useEffect define.
    //     // Por el ejemplo, peticiones de Ajax sin completar, suscripciones, etc.
    //     return unsubscribe;
    // }, []);
    const {AuthConsumer} = useAuthContext();

    const handleDeleteClick = async () => {
        const success = await empresasService.delete(props.item.id_empresa);
        console.log("Éxito al eliminar: ", success);
        // Si se seteó un listener para el evento, lo invocamos.
        if(typeof props.onDelete === 'function') {
            props.onDelete(props.item.id_empresa);
        }
    }

    return (
        <li className="EmpresasListaItem">
            <h2><Link to={`empresas/${props.item.id_empresa}`}>{props.item.nombre}</Link></h2>
            <img src={`${IMAGE_PATH}/empresas/${props.item.logo}`} alt="Logo"/>
            {
                AuthConsumer.user.email !== null && (<div>
                    <Link
                        type="button"
                        className="btn btn-secondary"
                        to={`empresas/${props.item.id_empresa}/editar`}
                    >Editar</Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteClick}
                    >Eliminar</button>
                </div>)
            }
        </li>
    );
}

export default EmpresasListaItem;

