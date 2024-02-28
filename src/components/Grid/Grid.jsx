import { useState } from "react"
import { Card } from "../Card/Card";
import { isWinner } from "../../helpers/checkWinner";
import './Grid.css';

function Grid({ numberOfcards}) {

    const [board, setBoard] = useState(Array(numberOfcards).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState(null);


    function play(index) {
        if(turn == true) {
            board[index] = 'O'

        }
        else {
            board[index] = 'X'
        }

        const win = isWinner(board, turn ? 'O' : 'X');
        if(win){
            setWinner(win);
        }

        setBoard([...board])
        setTurn(!turn);
    }

    function reset() {
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfcards).fill(""))
    }

    return(

        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight"> winner is {winner}</h1>
                        <button className="reset" onClick={reset}>reset game </button>
                    </>
                )
            }

                <h1 className="turn-highlight"> current turn {(turn) ? 'O' : 'X'}</h1>

            <div className="grid">
                
                
                {board.map((el, idx)=> <Card gameEnd={winner ? true : false} key={idx} onPlay={play}  player={el} index={idx} /> )}

            </div>
        </div>
        
    );

}

export {
    Grid
}