import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
