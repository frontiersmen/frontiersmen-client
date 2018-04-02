import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody } from 'material-ui/Table';
import GameSummary from './GameSummary.js';

const styles = {
  table: {
    maxWidth: "600px",
    margin: "150px auto 100px"
  }
}

function GameList(props) {
  return (
    <Paper className={props.classes.table}>
      <Table>
        <TableBody>
          {props.games.map(game =>
            <GameSummary key={game.id} game={game} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(GameList);
