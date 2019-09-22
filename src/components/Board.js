import React from "react";
import "./Board.css";

const Square = props => {
    return (
        <td onClick={e => props.onSquareClick(props.index)} className="vert hori">
            {props.filled ? <h1>{props.filled}</h1> : null}
        </td>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 0, // [0 = X], [1 = O],
            player_0: [],
            player_1: [],
            won: undefined
        }
    }
    onSquareClick = index => {
        if (this.state.won !== undefined) return;
        let legal = this.state.player_0.indexOf(index) === -1 && this.state.player_1.indexOf(index) === -1
        console.log(legal)
        if (!legal) return;
        this.setState(prevState => {
            prevState[`player_${this.state.turn}`].push(index);
            prevState.turn = !prevState.turn ? 1 : 0
            return prevState;
        }, () => {
            let playerX_won = this.checkIfWon(0)
            let playerY_won = this.checkIfWon(1)
            if (playerX_won || playerY_won) {
                this.setState({ won: playerX_won })
            }
        })
    }
    checkIfWon = player => {
        let player_items = this.state[`player_${player}`]
        if (player_items.length < 3) return false;
        const rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let x = 0; x < rows.length; x++) {
            let row = rows[x];
            let breakUsed = false;
            for (let pos of row) {
                if (player_items.indexOf(pos) === -1) {
                    breakUsed = true;
                    break
                }
            }
            if (!breakUsed) return true;
        }
        return false;
    }
    renderSquare = index => {
        let filled;
        if (this.state.player_0.indexOf(index) !== -1) filled = "X";
        if (this.state.player_1.indexOf(index) !== -1) filled = "O";
        return <Square filled={filled} index={index} onSquareClick={this.onSquareClick} />
    }
    render() {
        let msg;
        if (this.state.won !== undefined) {
            msg = this.state.won ? "You won!" : "You lost!"
        }
        return (
            <div>
                <h1>Tic Tac Toe {msg && `- ${msg}`}</h1>
                <table>
                    <tbody><tr>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </tr>
                        <tr>
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </tr>
                        <tr>
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </tr>
                    </tbody></table>
            </div>
        )
    }
}

export default Board;