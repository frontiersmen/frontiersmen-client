import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import { version } from '../../package.json'

const styles = theme => ({
  title: {
    paddingTop: "16px",
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "16px"
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "24px"
    },
    width: "264px"
  },
  subtitle: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "16px"
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "24px"
    },
    paddingBottom: "8px",
    width: "264px"
  }
})

function LobbyDrawer(props) {
  return (
    <div>
      <Drawer open={props.open} onClose={props.onClose}>
        <Typography color="secondary" variant="title" gutterBottom className={props.classes.title}>
          Frontiersmen of Banan
        </Typography>
        <Typography color="textSecondary" variant="body1" gutterBottom className={props.classes.subtitle}>
          Client v{version}
        </Typography>
        <Divider />
        <List>
          <ListItem
            button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/frontiersmen">
            <ListItemText primary="Read the source on Github" />
            <LaunchIcon />
          </ListItem>
          <ListItem
            button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/frontiersmen/frontiersmen.github.io/issues/new?labels=user%20reported">
            <ListItemText primary="Report an issue" />
            <LaunchIcon />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(LobbyDrawer);
