import React from 'react'
import Cell from './cell'

const styles = {
  grid: {
    fontSize: '0',
    margin: '20px 0'
  }
}

export default class Grid extends React.Component {
  render() {
    const cells = this.props.cells.map((row, y) => {
      return (
        <div key={y}>
          {row.map(
            cell => {
              return (
                <Cell {...cell} onClick={() => this.props.onClickCell(cell)}/>
              )}
          )}
        </div>
      )
    })

    return <div style={styles.grid}>{cells}</div>
  }
}
