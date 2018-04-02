import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody } from 'material-ui/Table';
import PregameSummary from './PregameSummary.js';

const styles = {
  table: {
    maxWidth: "600px",
    margin: "150px auto 100px"
  }
}

function PregameList(props) {
  return (
    <Paper className={props.classes.table}>
      <Table>
        <TableBody>
          {props.pregames.map(pregame =>
            <PregameSummary key={pregame.gameId} pregame={pregame} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(PregameList);
