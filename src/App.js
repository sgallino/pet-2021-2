// ¡Trabajando con hooks!
// Primero, hooks y clases son incompatibles. Si el componente usa "class", no puede usar
// hooks.
// Hooks solo se pueden usar en componentes de tipo función.
// Estos componentes se definen como una función común y corriente que retornen el elemento
// de React (ej: JSX).
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
import useAuth from "./hooks/useAuth.js";
import RouteAuth from "./components/RouteAuth.js";
import useAuthContext from "./hooks/useAuthContext.js";
import {useRef} from "react";
import {CSSTransition} from "react-transition-group";
import EmpresasEditar from "./views/EmpresasEditar.js";

function App() {
    // Definimos algo de state para almacenar el estado de autenticación.
    const auth = useAuth();
    // Definimos el contexto de auth para compartir con todos los componentes.
    const {AuthContext} = useAuthContext();

    const handleLogout = async () => {
        await authService.logout();
    }

    // console.log("[App] auth: ", auth);

    const routes = [
        {
            path: '/',
            // El componente de la ruta que queremos usar.
            RouteComponent: Route,
            // El componente que queremos renderizar.
            Component: Home,
            // Creamos una referencia para poder asociar el nodo a aplicar la transición con el
            // componente de transición.
            nodeRef: useRef(null),
        },
        {
            path: '/iniciar-sesion',
            RouteComponent: Route,
            Component: Login,
            nodeRef: useRef(null),
        },
        {
            path: '/vuelos',
            RouteComponent: Route,
            Component: Vuelos,
            nodeRef: useRef(null),
        },
        {
            path: '/empresas',
            RouteComponent: Route,
            Component: Empresas,
            nodeRef: useRef(null),
        },
        {
            path: '/empresas/nueva',
            RouteComponent: RouteAuth,
            Component: EmpresasNueva,
            nodeRef: useRef(null),
        },
        {
            // En las rutas de React Router podemos utilizar expresiones regulares para acotar el tipo
            // de dato que un parámetro debe tener. Esto se indica entre paréntesis a continuación del
            // nombre del parámetro.
            // \d => Cualquier dígito (0-9)
            // + => 1 o más ocurrencias de la expresión que lo precede.
            path: '/empresas/:id(\\d+)',
            RouteComponent: Route,
            Component: EmpresasDetalle,
            nodeRef: useRef(null),
        },
        {
            // En las rutas de React Router podemos utilizar expresiones regulares para acotar el tipo
            // de dato que un parámetro debe tener. Esto se indica entre paréntesis a continuación del
            // nombre del parámetro.
            // \d => Cualquier dígito (0-9)
            // + => 1 o más ocurrencias de la expresión que lo precede.
            path: '/empresas/:id(\\d+)/editar',
            RouteComponent: RouteAuth,
            Component: EmpresasEditar,
            nodeRef: useRef(null),
        },
    ];

    return (
    <AuthContext.Provider value={{
        user: auth.user,
        logged: auth.logged,
        // ...auth
    }}>
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
                                auth.logged ?
                                (
                                    <li className="nav-item">
                                        <button
                                            className="btn nav-link"
                                            onClick={handleLogout}
                                        >Cerrar Sesión ({auth.user.email})</button>
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
            {/* Este componente va a servir de base para estilizar las animaciones de cada ruta. */}
            <div className="transition-container-base">
                {routes.map(route => (
                    // De cada ruta, queremos primero que nada imprimir el componente de la ruta, que está
                    // en la propiedad "RouteComponent", y pasarle los datos relevantes (ej: el path).
                    <route.RouteComponent path={route.path} key={route.path} exact>
                        {/*
                        Definimos la transición.
                        Vamos a pasarle algunos parámetros.
                        - timeout: La duración en ms.
                        - onmountOnExit: Si queremos que se desmonte el componente luego de finalizar la
                                transición.
                        - classNames: (Noten el plural)
                        - nodeRef: La referencia al elemento del DOM a transicionar.
                        - in: Cuando el componente debe empezar a animar su transición. Es decir, cuando es
                            válido.
                            Como esto depende del estado de la ruta en particular que se esté parseando,
                            vamos a hacer una función anónima que reciba las propiedades del componente
                            Route padre (route.RouteComponent), y usarlas para configurar esto.

                        */}
                        {(routeProps) => (
                            <CSSTransition
                                classNames="mixed"
                                timeout={300}
                                in={routeProps.match !== null}
                                unmountOnExit={true}
                                nodeRef={route.nodeRef}
                            >
                                {/* Este div lo usamos para contener la transición.
                                Noten que le pasamos la misma referencia que al nodeRef de la transición.*/}
                                <div
                                    className="transition-container"
                                    ref={route.nodeRef}
                                >
                                    <route.Component />
                                </div>
                            </CSSTransition>
                        )}
                    </route.RouteComponent>
                ))}
            </div>
            <footer className="footer mt-3">
                <p>Da Vinci &copy; 2021</p>
            </footer>
        </div>
    </AuthContext.Provider>
    );
}

export default App;
