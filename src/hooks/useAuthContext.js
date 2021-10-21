import {createContext, useContext} from "react";
// Creamos el contexto _fuera_ del hook.
// Esto es importante para asegurarnos de que el Contexto no se esté recreando constantemente.
const AuthContext = createContext({
    user: {
        id_usuario: null,
        email: null,
    },
    logged: false
});

// Cómo queremos que se vea el nombre en las DevTools de React.
AuthContext.displayName = "AuthContext";

/**
 *
 * @return {{AuthContext: React.Context<{logged: boolean, user: {id_usuario: null, email: null}}>, AuthConsumer: {logged: boolean, user: {id_usuario: null, email: null}}}}
 */
function useAuthContext() {
    const AuthConsumer = useContext(AuthContext);

    return {
        AuthContext,
        AuthConsumer,
    };
}

export default useAuthContext;
