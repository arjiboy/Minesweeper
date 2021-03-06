import React from 'react'
import ReactDOM from 'react-dom'
import Grid from './grid'
import {generateMines,generateCells,getNearbies} from './utils'

const LEVELS = {
  beginner: {
    rows: 9,
    columns: 9,
    mines: 10
  }
}

const styles = {
  newGame: {
    fontSize: '20px',
    padding: '10px 25px'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      cells: [], 
      level: 'beginner',
      gameOver: false,
      message: ''
    }
    this.onClickCell = this.onClickCell.bind(this)
  }

  componentDidMount() {
    this.newGame()
  }

  

  newGame() {
    const { rows, columns, mines } = LEVELS[this.state.level]
    const minesList = generateMines(rows, columns, mines)
    const cells = generateCells(rows, columns, minesList)

    this.setState({ cells,gameOver: false })
  }

  onClickCell(cell) {
    const {cells,gameOver} = this.state
    const self = this

    function checkWin() {
      const {cells,gameOver} = self.state
      let closed = []

      cells.map(c => c.map(e => (!e.isMine && e.status == 'close') && closed.push(e)))
      console.log(closed.length)
      if (closed.length === 0){
        self.setState({
          gameOver: true,
          message: 'YOU WIN!'
        })
      }
    }
    function openCells(trg){
      const opened = {...trg,status: 'open'}
      const tempState = [...cells]

      tempState[trg.x][trg.y] = opened
      self.setState({
        cells: tempState
      })
    }
    if (gameOver || cell.status == 'open'){
      return;
    }
    else if((!cell.isMine && cell.nearby !== 0)){
      openCells(cell)
    }
    else if (cell.isMine){
      let mines = []
      cells.map(c => c.map(e => e.isMine && mines.push(e)))
      mines.map(c => openCells(c))  
      self.setState({
        gameOver: true,
        message:'GAME OVER. YOU LOSE!'
      }) 
    }
    else if (cell.nearby === 0){
      let arr = []
      let temp = [cell]

      while(temp.length > 0){
        let cont = []
        temp.map(c => {
          arr.push(c)

          const nears = getNearbies(cells,c.x,c.y).filter(e => !e.isMine).filter(e=> e.status == 'close')
          const nears2 = nears.filter(e => !cont.includes(e)).filter(e => !arr.includes(e)).filter(e => e.length !== 0)

          nears2.map(e =>{
             e.nearby === 0 ? cont.push(e) : arr.push(e)
          })
        })
        temp = cont
      }
      arr.map(cell=> openCells(cell))
    }
    checkWin();    
  }

  render() {
    const gameOver = {
      fontSize:'26px',
      margin: '5px'
    }

    return (
      <div className="container">
        <h1>Minesweeper</h1>

        <Grid
          cells={this.state.cells}
          onClickCell={this.onClickCell}
        />

        <div>
          <button
            style={styles.newGame}
            onClick={() => this.newGame()}
          >
            {'New Game'}
          </button>
          {
            this.state.gameOver &&
            <strong style={gameOver}>
              {this.state.message}
            </strong>
          }
        </div>        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

/*
     * TODO handle click of cell
     *      - open if close
     *      - open ALL nearby cells if there are no nearby mines, until there's a number.
     *      - display game over if the cell is a mine and restrict clicking the grid
     */
