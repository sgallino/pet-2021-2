import React, {useEffect, useState} from 'react';
import EmpresasLista from "../components/EmpresasLista.js";
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
import {Link} from "react-router-dom";
// import authService from "../services/auth.js";
import useAuth from "../hooks/useAuth.js";
import useAuthContext from "../hooks/useAuthContext.js";

function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);
    // const auth = useAuth();
    const {AuthConsumer} = useAuthContext();
    // const [counter, setCounter] = useState(0)

    async function cargarEmpresas() {
        empresasService.all();
        setEstaCargando(true);
        // const data = await empresasService.all();
        // setEmpresas(data);
        return empresasService.subscribe(empresas => {
            setEmpresas(empresas);
            setEstaCargando(false);
        });
    }

    useEffect(() => {
        return cargarEmpresas();
    }, [/*counter*/]);

    const handleDelete = () => {
        // cargarEmpresas();
        // setCounter(counter + 1);
    }

    return (<main className="container">
        <h1>Empresas</h1>
        <p>Trabajamos con las mejores aerolíneas, o las que nos den bola.</p>

        {
            AuthConsumer.logged && (<div>
                <Link to="/empresas/nueva">Crear nueva empresa</Link>
            </div>)
        }

        {estaCargando ?
            <Loader /> :
            (<EmpresasLista
                items={empresas}
                onDelete={handleDelete}
            />)
        }
    </main>);
}

export default Empresas;
