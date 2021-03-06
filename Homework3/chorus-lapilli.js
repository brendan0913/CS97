import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
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
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        movingTurn: false,
        prevSpot: -1,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.numberOfXsandOs(squares) >= 6 && !calculateWinner(squares))
      {
        if (this.state.xIsNext)
        {
          if(squares[i] !== "X" && !this.state.movingTurn) { return; }
          if(squares[i] === "X" && this.state.movingTurn) 
          { 
            this.setState({
              prevSpot: i
            });
            return;
           }
          if(squares[i] === "X" && !this.state.movingTurn)
           {
            this.setState({
              prevSpot: i,
              movingTurn: true
          });
            return;
           }
           if (squares[i] === "O" && this.state.movingTurn)
            { 
              this.setState({
                prevSpot: -1,
                movingTurn: false
                });
              return;
             }
          if(squares[i] === null && this.state.movingTurn) 
          {
            if (this.state.prevSpot === 0)
             {
              if (i === 3 || i === 1 || i === 4)
              {
                if (squares[4] === "X")
                {
                  const temp_squares = squares.slice();
                  temp_squares[this.state.prevSpot] = null;
                  temp_squares[i] = "X";
                  if (!calculateWinner(temp_squares))
                  {
                    return;
                  }
                }
                squares[this.state.prevSpot] = null;
                this.setState({
                  prevSpot: -1,
                  movingTurn: false
                               });       
              }
              else { return; }
            }
            if (this.state.prevSpot === 1)
            {
             if (i === 0 || i === 2 || i === 3 || i === 4 || i === 5)
             {
              if (squares[4] === "X")
              {
                const temp_squares = squares.slice();
                temp_squares[this.state.prevSpot] = null;
                temp_squares[i] = "X";
                if (!calculateWinner(temp_squares))
                {
                  return;
                }
              }
               squares[this.state.prevSpot] = null;
               this.setState({
                 prevSpot: -1,
                 movingTurn: false
                              });       
             }
             else { return; }
           }
           if (this.state.prevSpot === 2)
           {
            if (i === 1 || i === 5 || i === 4)
            {
              if (squares[4] === "X")
              {
                const temp_squares = squares.slice();
                temp_squares[this.state.prevSpot] = null;
                temp_squares[i] = "X";
                if (!calculateWinner(temp_squares))
                {
                  return;
                }
              }
              squares[this.state.prevSpot] = null;
              this.setState({
                prevSpot: -1,
                movingTurn: false
                             });       
            }
            else { return; }
          }
          if (this.state.prevSpot === 3)
          {
           if (i === 0 || i === 1 || i === 6 || i === 4 || i === 7)
           {
            if (squares[4] === "X")
            {
              const temp_squares = squares.slice();
              temp_squares[this.state.prevSpot] = null;
              temp_squares[i] = "X";
              if (!calculateWinner(temp_squares))
              {
                return;
              }
            }
             squares[this.state.prevSpot] = null;
             this.setState({
               prevSpot: -1,
               movingTurn: false
                            });       
           }
           else { return; }
         }
         if (this.state.prevSpot === 4)
         {
           if (i === 4) { return; }
           else 
           {
            squares[this.state.prevSpot] = null;
            this.setState({
              prevSpot: -1,
              movingTurn: false
                           });   
           }     
        }
        if (this.state.prevSpot === 5)
        {
         if (i === 2 || i === 1 || i === 8 || i === 4 || i === 7)
         {
          if (squares[4] === "X")
          {
            const temp_squares = squares.slice();
            temp_squares[this.state.prevSpot] = null;
            temp_squares[i] = "X";
            if (!calculateWinner(temp_squares))
            {
              return;
            }
          }
           squares[this.state.prevSpot] = null;
           this.setState({
             prevSpot: -1,
             movingTurn: false
                          });       
         }
         else { return; }
       }
       if (this.state.prevSpot === 6)
       {
        if (i === 3 || i === 7 || i === 4)
        {
          if (squares[4] === "X")
          {
            const temp_squares = squares.slice();
            temp_squares[this.state.prevSpot] = null;
            temp_squares[i] = "X";
            if (!calculateWinner(temp_squares))
            {
              return;
            }
          }
          squares[this.state.prevSpot] = null;
          this.setState({
            prevSpot: -1,
            movingTurn: false
                         });       
        }
        else { return; }
      }
      if (this.state.prevSpot === 7)
      {
       if (i === 3 || i === 5 || i === 8 || i === 4 || i === 6)
       {
        if (squares[4] === "X")
        {
          const temp_squares = squares.slice();
          temp_squares[this.state.prevSpot] = null;
          temp_squares[i] = "X";
          if (!calculateWinner(temp_squares))
          {
            return;
          }
        }
         squares[this.state.prevSpot] = null;
         this.setState({
           prevSpot: -1,
           movingTurn: false
                        });       
       }
       else { return; }
     }
     if (this.state.prevSpot === 8)
     {
      if (i === 5 || i === 7 || i === 4)
      {
        if (squares[4] === "X")
        {
          const temp_squares = squares.slice();
          temp_squares[this.state.prevSpot] = null;
          temp_squares[i] = "X";
          if (!calculateWinner(temp_squares))
          {
            return;
          }
        }
        squares[this.state.prevSpot] = null;
        this.setState({
          prevSpot: -1,
          movingTurn: false
                       });       
      }
      else { return; }
    }
  }
        }
        else
        {
          if(squares[i] !== "O" && !this.state.movingTurn) { return; }
          if(squares[i] === "O" && this.state.movingTurn) 
          { 
            this.setState({
              prevSpot: i
            });
            return;
           }
          if(squares[i] === "O" && !this.state.movingTurn)
           {
            this.setState({
              prevSpot: i,
              movingTurn: true
          });
            return;
           }
           if (squares[i] === "X" && this.state.movingTurn) 
           {               
             this.setState({
                   prevSpot: -1,
                  movingTurn: false
            });
             return; 
            }
          if(squares[i] === null && this.state.movingTurn) 
          {
            if (this.state.prevSpot === 0)
             {
              if (i === 1 || i === 3 || i === 4)
              {
                if (squares[4] === "O")
                {
                  const temp_squares = squares.slice();
                  temp_squares[this.state.prevSpot] = null;
                  temp_squares[i] = "O";
                  if (!calculateWinner(temp_squares))
                  {
                    return;
                  }
                }
                squares[this.state.prevSpot] = null;
                this.setState({
                  prevSpot: -1,
                  movingTurn: false
                               });       
              }
              else { return; }
            }
            if (this.state.prevSpot === 1)
            {
             if (i === 0 || i === 2 || i === 3 || i === 4 || i === 5)
             {
              if (squares[4] === "O")
              {
                const temp_squares = squares.slice();
                temp_squares[this.state.prevSpot] = null;
                temp_squares[i] = "O";
                if (!calculateWinner(temp_squares))
                {
                  return;
                }
              }
               squares[this.state.prevSpot] = null;
               this.setState({
                 prevSpot: -1,
                 movingTurn: false
                              });       
             }
             else { return; }
           }
           if (this.state.prevSpot === 2)
           {
            if (i === 1 || i === 5 || i === 4)
            {
              if (squares[4] === "O")
              {
                const temp_squares = squares.slice();
                temp_squares[this.state.prevSpot] = null;
                temp_squares[i] = "O";
                if (!calculateWinner(temp_squares))
                {
                  return;
                }
              }
              squares[this.state.prevSpot] = null;
              this.setState({
                prevSpot: -1,
                movingTurn: false
                             });       
            }
            else { return; }
          }
          if (this.state.prevSpot === 3)
          {
           if (i === 0 || i === 1 || i === 6 || i === 4 || i === 7)
           {
            if (squares[4] === "O")
            {
              const temp_squares = squares.slice();
              temp_squares[this.state.prevSpot] = null;
              temp_squares[i] = "O";
              if (!calculateWinner(temp_squares))
              {
                return;
              }
            }
             squares[this.state.prevSpot] = null;
             this.setState({
               prevSpot: -1,
               movingTurn: false
                            });       
           }
           else { return; }
         }
         if (this.state.prevSpot === 4)
         {
           if (i === 4) { return; }
           else 
           {
            squares[this.state.prevSpot] = null;
            this.setState({
              prevSpot: -1,
              movingTurn: false
                           });   
           }     
        }
        if (this.state.prevSpot === 5)
        {
         if (i === 2 || i === 1 || i === 8 || i === 4 || i === 7)
         {
          if (squares[4] === "O")
          {
            const temp_squares = squares.slice();
            temp_squares[this.state.prevSpot] = null;
            temp_squares[i] = "O";
            if (!calculateWinner(temp_squares))
            {
              return;
            }
          }
           squares[this.state.prevSpot] = null;
           this.setState({
             prevSpot: -1,
             movingTurn: false
                          });       
         }
         else { return; }
       }
       if (this.state.prevSpot === 6)
       {
        if (i === 3 || i === 7 || i === 4)
        {
          if (squares[4] === "O")
          {
            const temp_squares = squares.slice();
            temp_squares[this.state.prevSpot] = null;
            temp_squares[i] = "O";
            if (!calculateWinner(temp_squares))
            {
              return;
            }
          }
          squares[this.state.prevSpot] = null;
          this.setState({
            prevSpot: -1,
            movingTurn: false
                         });       
        }
        else { return; }
      }
      if (this.state.prevSpot === 7)
      {
       if (i === 3 || i === 5 || i === 8 || i === 4 || i === 6)
       {
        if (squares[4] === "O")
        {
          const temp_squares = squares.slice();
          temp_squares[this.state.prevSpot] = null;
          temp_squares[i] = "O";
          if (!calculateWinner(temp_squares))
          {
            return;
          }
        }
         squares[this.state.prevSpot] = null;
         this.setState({
           prevSpot: -1,
           movingTurn: false
                        });       
       }
       else { return; }
     }
     if (this.state.prevSpot === 8)
     {
      if (i === 5 || i === 7 || i === 4)
      {
        if (squares[4] === "O")
        {
          const temp_squares = squares.slice();
          temp_squares[this.state.prevSpot] = null;
          temp_squares[i] = "O";
          if (!calculateWinner(temp_squares))
          {
            return;
          }
        }
        squares[this.state.prevSpot] = null;
        this.setState({
          prevSpot: -1,
          movingTurn: false
                       });       
      }
      else { return; }
    }
  }
 
}
}
if (calculateWinner(squares) || squares[i]) {
  return;
}
squares[i] = this.state.xIsNext ? "X" : "O";
this.setState({
  history: history.concat([
    {
      squares: squares
    }
  ]),
  stepNumber: history.length,
  xIsNext: !this.state.xIsNext,
  movingTurn: false,
  prevSpot: -1,
});
}

numberOfXsandOs(s) {
  let num = 0;
  for(let i = 0; i < s.length; i++) {
    if (s[i]) { num++;}
  }
  return num;
}

jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  });
}

render() {
  const history = this.state.history;
  const current = history[this.state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (this.state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => this.handleClick(i)}
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
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
