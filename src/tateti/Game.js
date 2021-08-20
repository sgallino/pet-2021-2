import React from 'react';
import Board from "./Board.js";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsUp: true,
            stepNumber: 0,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsUp: (step % 2) === 0,
        });
    }

    // Por convención de React, todos los métodos que resuelvan un evento se llaman "handleEvento".
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // Antes de hacer nada, preguntamos que no haya aún un ganador.
        if(
            calculateWinner(squares) ||
            squares[i] !== null
        ) return;
        // Creamos la copia.
        squares[i] = this.state.xIsUp ? 'X' : 'O';
        // Verificamos si hay un ganador.
        this.setState({
            // Agregamos en el historial la última modificación.
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsUp: !this.state.xIsUp,
            // winner: winner,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // Historial de jugadas.
        const moves = history.map((step, move) => {
            const desc = move ?
                 'Ir a la jugada número #' + move :
                 'Ir al comienzo del juego.';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        let status;

        if(winner) {
            status = `Winner is: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsUp ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}



// Función para calcular un ganador.
// Básicamente, necesitamos definir una lista con todas las combinaciones ganadoras,
// y luego comparar si alguna de esas combinaciones existen en el listado de casilleros.
/*
[
null, null, null,
null, null, null,
null, null, null,
]
*/
function calculateWinner(squares) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // Recorremos las combinaciones.
    for(let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        // Preguntamos si todas las celdas de esas posiciones tienen el mismo valor.
        if(
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
