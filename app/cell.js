import React from 'react'

export default class Cell extends React.Component {
  render() {
    const value = this.props.isMine ? 'x' : this.props.nearby
    const styles = this.createStyles()

    return (
      <button
        style={styles.cell}
        status={this.props.status}
        onClick={() => this.props.onClick()}
      >
        {this.props.status === 'open' && !!value ? value : ''}
      </button>
    )
  }

  createStyles() {
    return {
      cell: {
        verticalAlign: 'top',
        width: '50px',
        height: '50px',
        fontSize: '14px',
        textAlign: 'center',
        outline: 'none',
        backgroundColor: this.props.status === 'open' ? '#eee' : '#ccc'
      }
    }
  }
}

Cell.propTypes = {
  isMine: React.PropTypes.bool,
  status: React.PropTypes.oneOf(['close', 'open']),
  onClick: React.PropTypes.func.isRequired
}

Cell.defaultProps = {
  status: 'close'
}
