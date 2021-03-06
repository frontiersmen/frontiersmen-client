import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import UserInfo from './UserInfo.js';
import LobbyDrawer from './LobbyDrawer.js'

const styles = {
  title: {
    marginLeft: "32px",
    flex: 1
  }
}

class LobbyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  openDrawer = () => {
    this.setState({ drawerOpen: true });
  }

  closeDrawer = () => {
    this.setState({ drawerOpen: false });
  }

  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.openDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={this.props.classes.title}>
              Lobby
            </Typography>
            <UserInfo displayName={this.props.displayName} onNameChange={this.props.onNameChange} onSignOut={this.props.onSignOut} />
          </Toolbar>
          <Tabs value={this.props.view} centered>
            <Tab value="open-games" label="Open Games" component={Link} to="/lobby/open-games" />
            <Tab value="your-games" label="Your Games" component={Link} to="/lobby/your-games" />
          </Tabs>
        </AppBar>
        <LobbyDrawer open={this.state.drawerOpen} onClose={this.closeDrawer} />
      </div>
    );
  }
}

export default withStyles(styles)(LobbyHeader);
