import {IMAGE_PATH} from "../constants/constants.js";
import {Link} from "react-router-dom";

function EmpresasListaItem(props) {
    return (
        <li className="EmpresasListaItem">
            <h2><Link to={`empresas/${props.item.id_empresa}`}>{props.item.nombre}</Link></h2>
            <img src={`${IMAGE_PATH}/empresas/${props.item.logo}`} alt="Logo"/>
        </li>
    );
}

export default EmpresasListaItem;
