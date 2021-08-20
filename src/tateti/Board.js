import React from 'react';
import Square from "./Square.js";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Array(9) crea un array de 9 posiciones.
            // .fill(null) llena el array con el valor null.
            squares: Array(9).fill(null),
            xIsUp: true,
            winner: null,
            /*
            La idea del array es que funcione para los casilleros del tatetí tipo:
            [
                null, null, null,
                null, null, null,
                null, null, null,
            ]
            */
        }
    }

    renderSquare(i) {
        // Para pasar valores a un hijo, lo hacemos usando "props".
        // Las "props" se escriben básicamente como atributos de HTML en JSX.
        // A diferencia de Vue, con JSX no necesitamos hacer una distinción en los atributos que reciben
        // valores dinámicos (de JS) o estáticos.
        // Para usar valores de JS en JSX, siempre tenemos que interpolar usando {}.
        // Nota: Siempre que un componente vaya a ocupar múltiples líneas, tenemos que asegurarnos de que:
        // a. El componente abra en la misma línea donde se está usando (ej: al lado del return).
        // b. Rodearlo con paréntesis.
        // De lo contrario, va a romperse el código por culpa del mecanismo de JS "ASI".
        // ASI => Automatic Semicolon Insertion.
        // Es el mecanismo por el cual JS automáticamente agrega un ";" al final de toda instrucción.
        return <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />;
    }

    // Por convención de React, todos los métodos que resuelvan un evento se llaman "handleEvento".
    // handleClick(i) {
    //     // Antes de hacer nada, preguntamos que no haya aún un ganador.
    //     if(
    //         this.state.winner ||
    //         this.state.squares[i] !== null
    //     ) return;
    //     // El state se considera de "solo lectura", o
    //     // en términos informáticos, es una variable "inmutable".
    //     // this.state.squares[i] = 'X'; // Esto ta mal.
    //     // En su lugar, si queremos modificar parte del array, lo que tenemos que hacer es crear una
    //     // copia del array, modificar esa copia, y luego sobrescribir el array
    //     // original con su copia.
    //     // Creamos la copia.
    //     const squares = this.state.squares.slice();
    //     // Alternativa...
    //     // const squares = [...this.state.squares];
    //     squares[i] = this.state.xIsUp ? 'X' : 'O';
    //     // Verificamos si hay un ganador.
    //     const winner = calculateWinner(squares);
    //     this.setState({
    //         squares: squares,
    //         xIsUp: !this.state.xIsUp,
    //         winner: winner,
    //     });
    //     // Alternativamente...
    //     // this.setState({squares});
    // }

    render() {

        return (
            <div>
                {/*<div className="status">{status}</div>*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
