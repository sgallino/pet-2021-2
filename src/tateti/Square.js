import React from 'react';

// Update 2: Cambiamos el componente de clase a función.
// En la metodología con clases, esto lo hacíamos solo cuando el componente no tenía state.
// class Square extends React.Component {
//     // Update: Cambiamos para recibir la prop con el valor 'X' u 'O', así que no necesitamos más el constructor.
//     // constructor(props) {
//     //     // En JS, siempre deberíamos llamar al constructor padre en el método constructor.
//     //     // Esto se hace llamando a "super()".
//     //     super(props);
//     //
//     //     // Declaramos el state que queremos que tenga
//     //     // este componente.
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//
//     render() {
//         return (
//             // En el caso de los componentes con clases, las props se reciben automáticamente en la
//             // propiedad "props" del objeto.
//             // Ahora agreguemos un evento de click.
//             // Los eventos de React no son los eventos nativos del browser.
//             // Los definimos escribiendo (respetando mayúsculas) el nombre del evento en la etiqueta.
//             // setState es el método con el que se actualizan los valores del state en React (clases).
//             // La propiedad "state" debe considerarse de "solo lectura".
//             // Update: Cambiamos el setState por una llamada al "onClick" que recibimos como prop.
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// Los componentes como funciones reciben por parámetro las props, y deben retornar lo que renderizan.
// Con hooks, todos los componentes se definen de esta forma.
function Square(props) {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    )
}

export default Square;
