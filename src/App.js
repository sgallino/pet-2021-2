// ¡Trabajando con hooks!
// Primero, hooks y clases son incompatibles. Si el componente usa "class", no puede usar
// hooks.
// Hooks solo se pueden usar en componentes de tipo función.
// Estos componentes se definen como una función común y corriente que retornen el elemento
// de React (ej: JSX).
import {useEffect, useState} from "react";
import {Link, Route, Switch} from "react-router-dom";
// import EmpresasLista from "./components/EmpresasLista.js";
// import empresasService from "./services/empresas.js";
import Home from "./views/Home.js";
import Empresas from "./views/Empresas.js";
import Vuelos from "./views/Vuelos.js";
import EmpresasNueva from "./views/EmpresasNueva.js";
import EmpresasDetalle from "./views/EmpresasDetalle.js";
import Login from "./views/Login.js";
import authService from "./services/auth.js";

function App() {
    // Definimos algo de state para almacenar el estado de autenticación.
    const [authState, setAuthState] = useState({
        user: {
            id_usuario: null,
            email: null,
        },
        logged: false,
    });

    const handleLogin = user => {
        if(user.email !== null) {
            setAuthState({
                user: {...user},
                logged: true,
            });
            // console.log("App: ", user);
        }
    }

    const handleLogout = async () => {
        await authService.logout();
        setAuthState({
            user: {
                id_usuario: null,
                email: null,
            },
            logged: false,
        });
    }

    return (
        <div className="app">
            {/* Noten que en JSX hay que tener cuidado con los atributos de HTML que sean palabras reservadas en JS ("class" y "for").
         En esos casos, hay que reemplazarlos por sus equivalentes ("className" y "htmlFor").*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbar-menu"
                            aria-controls="navbar-menu" aria-expanded="false"
                            aria-label="Mostrar/ocultar menú de navegación">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/*<a className="nav-link" href="#">Home</a>*/}
                                {/* Link es el componente que crea un <a> para navegar con el Router. */}
                                <Link
                                    className="nav-link"
                                    to="/"
                                >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/empresas"
                                >Empresas</Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/vuelos"
                                >Vuelos</Link>
                            </li>
                            {
                                authState.logged ?
                                (
                                    <li className="nav-item">
                                        <button
                                            className="btn nav-link"
                                            onClick={handleLogout}
                                        >Cerrar Sesión ({authState.user.email})</button>
                                    </li>
                                ) :
                                (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/iniciar-sesion"
                                        >Iniciar Sesión</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<main className="container">*/}
            {/*    <h1>DV Flights</h1>*/}
            {/*    <p>Encontrá tu próxima aerolínea favorita</p>*/}
            {/*
            Route es la etiqueta que renderiza un componente siempre que matchee la URL.
            Para indicarle lo que queremos que renderice, podemos pasarle como hijo el componente.

            Las Routes matchen "parcialmente".
            En otras palabras. si el path indicado "está en el comienzo" de la URL actual, la ruta
            matchea. No necesita que el path sea completo.

            Si queremos evitar esto, tenemos 2 approachs que podemos tomar.
            1. Usar la prop "exact" en las rutas, para indicar que el matcheo debe ser exacto.
            2. Usar un componente Switch que contenga todas las rutas para que solo se imprima la
                primera que matchee.
            */}
            <Switch>
                <Route path="/empresas/nueva">
                    <EmpresasNueva />
                </Route>
                <Route path="/empresas/:id">
                    <EmpresasDetalle />
                </Route>
                <Route path="/empresas">
                    <Empresas
                        auth={authState}
                    />
                </Route>
                <Route path="/vuelos">
                    <Vuelos />
                </Route>
                <Route path="/iniciar-sesion">
                    <Login
                        onLogin={handleLogin}
                    />
                </Route>
                <Route path="/"> {/* El path "/", por lo mencionado arriba, va a matchear _todas_ las URLs. */}
                    <Home/>
                </Route>
            </Switch>
                {/*<EmpresasLista*/}
                {/*    items={empresas}*/}
                {/*/>*/}
            {/*</main>*/}
            <footer className="footer mt-3">
                <p>Da Vinci &copy; 2021</p>
            </footer>
        </div>
    );
}

export default App;
