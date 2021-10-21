// Nuestro primer hook va a encargarse de preparar todo lo necesario para obtener los datos de la
// autenticación manejados por authService.
// Esto implica crear el state, setear el efecto, y retornar el state.

import {useEffect, useState} from "react";
import authService from "../services/auth.js";

/**
 * Los datos del usuario autenticado.
 * Si no hay, sus valores son null.
 *
 * @return {{user: {id_usuario: null, email: null}}}
 */
function useAuth() {
    const user = authService.getUser();
    const [auth, setAuth] = useState({
        user,
        logged: user.email !== null,
    });

    useEffect(() => {
        // Suscribimos al evento.
        // Nuestro subscribe retorna la función de cancelación a la suscripción.
        // El useEffect espera como retorno del efecto, una función de "limpieza".
        // Esa función de limpieza debería "limpiar" todo lo que el useEffect define.
        // Por el ejemplo, peticiones de Ajax sin completar, suscripciones, etc.
        const unsubscribe = authService.subscribe(user => {
            // Verificamos que el nuevo user sea distinto a lo que ya tenemos.
            // console.log("user: ", user, " - auth.user: ", auth.user);
            if(user.email !== auth.user.email) {
                setAuth({
                    user: {...user},
                    logged: user.email !== null
                });
            }
        });
        return unsubscribe;
    }, [auth]);

    return auth;
}

export default useAuth;
