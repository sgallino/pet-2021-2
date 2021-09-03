// ¡Trabajando con hooks!
// Primero, hooks y clases son incompatibles. Si el componente usa "class", no puede usar
// hooks.
// Hooks solo se pueden usar en componentes de tipo función.
// Estos componentes se definen como una función común y corriente que retornen el elemento
// de React (ej: JSX).
import {useEffect, useState} from "react";
import EmpresasLista from "./components/EmpresasLista.js";

function App() {
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
    const [empresas, setEmpresas] = useState([
        {
            id_empresa: 1,
            nombre: 'Aerolíneas Argentinas',
            logo: 'aerolineas-argentinas.jpg',
        },
        {
            id_empresa: 2,
            nombre: 'LATAM Chile',
            logo: 'latam-airlines.jpg',
        },
        {
            id_empresa: 3,
            nombre: 'American Airlines',
            logo: 'american-airlines.jpg',
        },
    ]);

    // useEffect permite agregar código para que se ejecute cada vez que el componente
    // se crea o actualiza.
    // Recibe como argumento una función NO "async", con el código a ejecutar.
    // Como segundo parámetro opcional, podemos pasar un array de "dependencias".
    // Esas dependencias deben incluir qué valores son los que tienen que cambiar para
    // que el efecto se vuelva a ejecutar.
    // Normalmente, un useEffect suele incluir en sus dependencias todos los valores
    // de state o props que utilice en su interior.
    // Si queremos que un efecto SOLO se ejecute UNA VEZ al crear el componente, entonces
    // le pasamos un array de dependencias vacío.
    useEffect(() => {
        setTimeout(() => {
            // Si no usamos el setter, React no se entera del cambio.
            // empresas.push({
            //     id_empresa: 4,
            //     nombre: 'Delta Airlines',
            //     logo: 'delta-airlines.jpg',
            // });
            // Usamos el set para asignarle el nuevo valor completo.
            // Si quiero agregar, tengo que crear una copia del valor actual, agregarle lo
            // nuevo, y pisar el viejo con el setter.
            // const nuevo = empresas.slice();
            // nuevo.push({
            //     id_empresa: 4,
            //     nombre: 'Delta Airlines',
            //     logo: 'delta-airlines.jpg',
            // });
            // setEmpresas(nuevo);
            // Usando ES6+
            setEmpresas([
                ...empresas,
                {
                    id_empresa: 4,
                    nombre: 'Delta Airlines',
                    logo: 'delta-airlines.jpg',
                }
            ]);
        }, 2000);
    }, []);

    // Vamos a agregar una empresa a los 2 segundos de cargada la página.
    // Si ponemos el setTimeout directamente, vamos a var que se re-ejecuta constantemente
    // agregando múltiples veces la empresa.
    // Esto se debe a que el código contenido dentro del componente se re-ejecuta cada
    // vez que el state (o las props) del componente cambia.
    // Para evitarlo, vamos a necesitar ayuda del hook useEffect (ver arriba).
    // setTimeout(() => {
    //     // Si no usamos el setter, React no se entera del cambio.
    //     // empresas.push({
    //     //     id_empresa: 4,
    //     //     nombre: 'Delta Airlines',
    //     //     logo: 'delta-airlines.jpg',
    //     // });
    //     // Usamos el set para asignarle el nuevo valor completo.
    //     // Si quiero agregar, tengo que crear una copia del valor actual, agregarle lo
    //     // nuevo, y pisar el viejo con el setter.
    //     // const nuevo = empresas.slice();
    //     // nuevo.push({
    //     //     id_empresa: 4,
    //     //     nombre: 'Delta Airlines',
    //     //     logo: 'delta-airlines.jpg',
    //     // });
    //     // setEmpresas(nuevo);
    //     // Usando ES6+
    //     setEmpresas([
    //         ...empresas,
    //         {
    //             id_empresa: 4,
    //             nombre: 'Delta Airlines',
    //             logo: 'delta-airlines.jpg',
    //         }
    //     ]);
    // }, 2000);

    return (
        <div className="app">
            {/* Noten que en JSX hay que tener cuidado con los atributos de HTML que sean palabras reservadas en JS ("class" y "for").
         En esos casos, hay que reemplazarlos por sus equivalentes ("className" y "htmlFor").*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                <a className="nav-link" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="container">
                <h1>DV Flights</h1>
                <p>Encontrá tu próxima aerolínea favorita</p>

                <EmpresasLista
                    items={empresas}
                />
                {/*<ul className="EmpresasLista">*/}
                {/*    /!* Para imprimir un array de múltiples elementos de React, simplemente interpolamos el array.*/}
                {/*    Tengan en cuenta que _no_ podemos escribir bucles ni otras estructuras dentro de JSX. *!/*/}
                {/*    {empresasLista}*/}
                {/*</ul>*/}
            </main>
            <footer className="footer">
                <p>Da Vinci &copy; 2021</p>
            </footer>
        </div>
    );
}

export default App;
