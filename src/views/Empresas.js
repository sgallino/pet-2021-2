import React, {useEffect, useState} from 'react';
import EmpresasLista from "../components/EmpresasLista.js";
import empresasService from "../services/empresas.js";
import Loader from "../components/Loader.js";
import {Link} from "react-router-dom";
// import authService from "../services/auth.js";
import useAuth from "../hooks/useAuth.js";

function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        // Usando una IIFE asíncrona.
        (async () => {
            const data = await empresasService.all();
            setEmpresas(data);
            setEstaCargando(false);
        })();
    }, []);

    // Esta versión tiene el problema de que no se entera de cuando hay cambios en el estado de
    // autenticación que ocurran mientras este componente está montado.
    // const [authState, setAuthState] = useState({
    //     user: {
    //         email: null,
    //         password: null,
    //     },
    //     logged: false,
    // });
    // useEffect(() => {
    //     const user = authService.getUser();
    //     setAuthState({
    //         user,
    //         logged: user.email !== null,
    //     })
    // }, []);

    return (<main className="container">
        <h1>Empresas</h1>
        <p>Trabajamos con las mejores aerolíneas, o las que nos den bola.</p>

        {
            auth.logged && (<div>
                <Link to="/empresas/nueva">Crear nueva empresa</Link>
            </div>)
        }

        {estaCargando ?
            <Loader /> :
            (<EmpresasLista
                items={empresas}
            />)
        }
    </main>);
}

export default Empresas;
