// Creamos nuestro componente de base para la App de Tateti.
// Como dijimos, vamos a usar clases para este ejemplo, para ver un poco de qué se tratan.

// Los componentes con clases se definen heredando de la clase React.Component, y definiendo un método
// render() que retorne los elementos de React a renderizar. Puede ser con JSX.
import React from 'react';
import Game from './Game.js';

class TatetiApp extends React.Component {
    // Los métodos en clases de JS se definen directamente escribiendo el nombre del método seguido
    // de los paréntesis seguidos de las llaves.
    render() {
        // Retornamos el componente "Game" del tateti.
        // En React, con JSX, _TODOS_ los elementos deben cerrar.
        // Ya sea con un par de cierre o con el / al final.
        return <Game />;
    }
}

export default TatetiApp;
