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
      level: 'beginner' 
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

    this.setState({ cells })
  }

  onClickCell(cell) {
    if (cell.isMine){
      /*open the cell but stop the game --rg*/
      console.log('boom!')
    }
    else if(cell.nearby >0 && cell.status == 'open'){
      return;
    }
    else {
      let near = getNearbies(this.state.cells,cell.x,cell.y).filter(c => !c.isMine)
      let arr = [cell,...near]
      
      
      arr.map(cell=> {
        const opened = {...cell,status: 'open'}
        const tempState = [...this.state.cells]

        tempState[cell.x][cell.y] = opened
        this.setState({
          cells: tempState
        })
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Minesweeper</h1>

        <Grid
          cells={this.state.cells}
          onClickCell={this.onClickCell}
        />

        <button
          style={styles.newGame}
          onClick={() => this.newGame()}
        >
          {'New Game'}
        </button>
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
