import {IMAGE_PATH} from "../constants/constants.js";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import authService from "../services/auth.js";

function EmpresasListaItem(props) {
    // Vamos a suscribirnos al estado de autenticación.
    const [auth, setAuth] = useState({
        user: {
            id_usuario: null,
            email: null,
        }
    });

    useEffect(() => {
        // Suscribimos al evento.
        authService.subscribe(user => {
            setAuth({
                user: {...user}
            })
        });
    }, []);

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

