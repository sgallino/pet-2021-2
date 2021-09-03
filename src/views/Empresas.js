import React, {useEffect, useState} from 'react';
import EmpresasLista from "../components/EmpresasLista.js";
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
import {Link} from "react-router-dom";

function Empresas() {
    // Vamos a crear una lista de empresas con las que vamos a trabajar dentro de una
    // variable de state.
    // Para crear state, usamos el hook "useState".
    // Todos los hooks en React deben empezar con el prefijo "use".
    // Todos los hooks deben estar al comienzo de la función, y no pueden estar dentro
    // de estructuras de control de flujo, subfuciones, etc.
    // useState, en particular, recibe 1 parámetro: El valor por defecto del state.
    // Retorna un array de dos posiciones:
    // 0: El valor del state.
    // 1: La función "setter" para el state.
    // El state en React se considera "inmutable", y nunca deberíamos modificarlo a mano.
    // Si queremos cambiar algo, deberíamos hacerlo a través de ese setter.
    const [empresas, setEmpresas] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);

    useEffect(async () => {
        // async function fetchData() {
        //     // await solo se puede usar delante de una promesa (o equivalente), e implica 2 cosas:
        //     // 1. Detiene la ejecución de la _función_ hasta que la promesa se resuelva.
        //     // 2. Retorna el valor del resolve desenvuelto.
        //     const data = await empresasService.all();
        //     setEmpresas(data);
        // }
        // fetchData();
        // Usando una IIFE asíncrona.
        (async () => {
            const data = await empresasService.all();
            setEmpresas(data);
            setEstaCargando(false);
        })();
        // empresasService
        //     .all()
        //     .then(data => setEmpresas(data));
    }, []);

    return (<main className="container">
        <h1>Empresas</h1>
        <p>Trabajamos con las mejores aerolíneas, o las que nos den bola.</p>

        <div>
            <Link to="/empresas/nueva">Crear nueva empresa</Link>
        </div>

        {estaCargando ?
            <Loader /> :
            (<EmpresasLista
                items={empresas}
            />)
        }
    </main>);
}

export default Empresas;
