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
/*    const opened = {...cell,status: 'open'}
    const tempState = [...this.state.cells]

    tempState[cell.x][cell.y] = opened
    this.setState({
      cells: tempState
    })*/


/*  let nearbies = getNearbies(this.state.cells,cell.x,cell.y)
  let others = nearbies.filter(c => c.nearby === 0 && c.isMine === false)
  let a = others.map(b => getNearbies(this.state.cells,b.x,b.y))
  nearbies.push(a)
  console.log(nearbies)*/
  if (cell.isMine){
    console.log('boom!')
  }
  else{
    let arr = [cell]
    let near = getNearbies(this.state.cells,cell.x,cell.y)
    console.log(near)


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
