/**
 * generates random mine coordinates
 */
export function generateMines(rowCount, columnCount, mineCount) {
  let mines = []

  for (let i=0;i<mineCount;i++){
    const x = Math.floor(Math.random()*rowCount)
    const y = Math.floor(Math.random()*columnCount)
    const mine = `${x},${y}`
    mines.push(mine)    
  }
  console.log(mines)
  return mines
}

/**
 * generates cells with with mines
 */
export function generateCells(rowCount, columnCount, mines) {
  const cells = []

  for (let i=0;i<rowCount;i++){
    let arr = []
    for (let j=0;j<columnCount;j++){

      const nearbies = getNearbies(null,i,j).filter(c => mines.includes(c))

      arr.push({
        key: `${i},${j}`,
        x:i,
        y:j,
        isMine: mines.includes(`${i},${j}`),
        nearby: nearbies.length,
        status: 'close'
      })
    }
    cells.push(arr)
  }

  return cells
}

/**
 * returns the neighboring cells
 */
export function getNearbies(cells,row, col) {
  
  const a = `${row-1},${col-1}`
  const b = `${row-1},${col}`
  const c = `${row-1},${col+1}`
  const d = `${row},${col-1}`
  const e = `${row},${col+1}`
  const f = `${row+1},${col-1}`
  const g = `${row+1},${col}`
  const h = `${row+1},${col+1}`

  const coords = [a,b,c,d,e,f,g,h]
  const nearbies = []
  
  if (cells){
    cells.map(arr => arr.map(c => coords.includes(c.key) && nearbies.push(c)))
    return nearbies
  }
  else {
    return coords
  }
}
  /*
   * TODO create a method to generate an array of random
   * coordinates with uniform distribution e.g. ['0,1', '10,9', ...]
   */
  

  /*
   * TODO create a method to generate an array of cells
   * with this structure:
    
    cells = [
      {x}: [
        {y}: {
          key,
          x,
          y,
          isMine,
          nearby,
          status
        }
      ]
    ]
    
    key = (string) identifier key
    x = (int) x position
    y = (int) y position
    isMine = (bool) is it a mine?
    nearby = (int) number of surrounding mines
    status = (string, open|close) by default, it should be closed

   */
  /*
   * TODO create a method to get the nearby cells
   */