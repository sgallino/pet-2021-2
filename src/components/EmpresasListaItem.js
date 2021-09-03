function EmpresasListaItem(props) {
    return (
        <li className="EmpresasListaItem">
            <h2>{props.item.nombre}</h2>
            <img src={`imgs/empresas/${props.item.logo}`} alt="Logo"/>
        </li>
    );
}

export default EmpresasListaItem;
