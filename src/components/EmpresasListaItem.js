import {IMAGE_PATH} from "../constants/constants.js";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
// import {useEffect, useState} from "react";
// import authService from "../services/auth.js";

function EmpresasListaItem(props) {
    // Vamos a suscribirnos al estado de autenticación.
    const auth = useAuth();
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

    return (
        <li className="EmpresasListaItem">
            <h2><Link to={`empresas/${props.item.id_empresa}`}>{props.item.nombre}</Link></h2>
            <img src={`${IMAGE_PATH}/empresas/${props.item.logo}`} alt="Logo"/>
            {
                auth.user.email !== null && (<div>
                    <button type="button" className="btn btn-secondary">Editar</button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                </div>)
            }
        </li>
    );
}

export default EmpresasListaItem;

