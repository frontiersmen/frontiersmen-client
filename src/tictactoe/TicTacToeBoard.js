import React, { Component } from 'react';

export default class TicTacToeBoard extends Component {
  renderValue = value => {
    if (value === 0) {
      return "X";
    } else if (value === 1) {
      return "0";
    } else {
      return "null";
    }
  }

  onCellClick = (row, col) => () => {
    this.props.onPlaceMark(row, col);
  }

  render() {
    return (
      <table className="game-board">
        <tbody>
          {this.props.board.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {row.map((cell, colIndex) =>
                <td key={colIndex} onClick={this.onCellClick(rowIndex, colIndex)}>
                  {this.renderValue(cell)}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
