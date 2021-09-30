import React, {useEffect, useState} from 'react';
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
import {Link, useParams} from "react-router-dom";
import {IMAGE_PATH} from "../constants/constants.js";

function EmpresasDetalle() {
    const {id} = useParams();

    const [empresa, setEmpresa] = useState({
        nombre: null,
        pais_id: null,
        logo: null,
    });
    const [estaCargando, setEstaCargando] = useState(true);

    useEffect(() => {
        (async () => {
            const dataEmpresa = await empresasService.get(id);
            setEmpresa(dataEmpresa.data);
            setEstaCargando(false);
        })();
    }, []);

    return (<main className="container">
        {
            estaCargando ?
                <Loader /> :
                // Las etiquetas "vacías" definen un "React Fragment", que permite agrupar múltiples etiquetas.
                (<>
                    <h1>{empresa.nombre}</h1>
                    <img src={`${IMAGE_PATH}/empresas/${empresa.logo}`} alt={`Logo de ${empresa.nombre}`}/>

                    <p>Empresa ubicada en: {empresa.pais?.nombre}</p>
                </>)
        }
    </main>);
}

export default EmpresasDetalle;
