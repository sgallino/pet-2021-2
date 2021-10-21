import React, {useState} from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import useAuth from "./../hooks/useAuth.js";
import useAuthContext from "../hooks/useAuthContext.js";

function RouteAuth(props) {
    // Verificamos si el usuario está autenticado. De no estarlo, lo mandamos al login.
    // const auth = useAuth();
    const {AuthConsumer} = useAuthContext();
    // const history = useHistory();
    // console.log("[RouteAuth] auth: ", AuthConsumer);
    if(!AuthConsumer.logged) {
        // history.push('/iniciar-sesion');
        // Retornamos un fragmento de React vacío.
        // return (<></>);
        // Como alternativa al hook "useHistory", tenemos el componente Redirect.
        return (<Redirect to='/iniciar-sesion' />);
    }

    return (<Route {...props} />);
}

export default RouteAuth;
