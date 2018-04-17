import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import LobbyConnection from './lobbyConnection.js';
import GameCreationDialog from './GameCreationDialog.js';
import LobbyHeader from './LobbyHeader.js';
import GameList from './GameList.js';
import PregameList from './PregameList.js';
import ConnectionErrorDialog from '../ConnectionErrorDialog.js';

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}

class LobbyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyConnection: null,
      games: [],
      pregames: [],
      displayName: '',
      gameCreationDialogOpen: false,
      connectionErrored: false
    };
  }

  componentWillMount() {
    var lobbyConnection = new LobbyConnection(this.props.playerId, this.props.authToken, this.openConnectionErrorDialog);
    lobbyConnection.on("LobbyUpdateEvent", event => {
      this.setState({ games: event.games });
      this.setState({ pregames: event.pregames });
    });
    lobbyConnection.on("PlayerNameChangeEvent", event => {
      if (event.playerId === this.props.playerId) {
        this.setState({ displayName: event.displayName });
      }
    });
    this.setState({ lobbyConnection: lobbyConnection });
  }

  componentWillUnmount() {
    this.state.lobbyConnection.disconnect();
  }

  openGameCreationDialog = () => {
    this.setState({ gameCreationDialogOpen: true });
  }

  closeGameCreationDialog = () => {
    this.setState({ gameCreationDialogOpen: false });
  }

  openConnectionErrorDialog = () => {
    this.setState({ connectionErrored: true });
  }

  renderGameList(view) {
    if (view === "open-games") {
      return (
        <PregameList pregames={this.state.pregames} />
      );
    } else if (view === "your-games") {
      var games = this.state.games.filter(game => game.players.hasOwnProperty(this.props.playerId));
      return (
        <GameList games={games} />
      );
    } else {
      return (
        <Redirect to="/lobby/open-games" />
      );
    }
  }

  render() {
    const view = this.props.match.params.view;

    return (
      <div>
        <LobbyHeader
          displayName={this.state.displayName}
          onNameChange={this.state.lobbyConnection.changeDisplayName}
          view={view} />
        { this.renderGameList(view) }
        <Button
          className={this.props.classes.button}
          variant="fab"
          color="secondary"
          aria-label="add"
          onClick={this.openGameCreationDialog}>
          <AddIcon />
        </Button>
        <GameCreationDialog
          open={this.state.gameCreationDialogOpen}
          playerId={this.props.playerId}
          onClose={this.closeGameCreationDialog}
          onSubmit={this.state.lobbyConnection.createGame} />
        <ConnectionErrorDialog open={this.state.connectionErrored} />
      </div>
    );
  }
}

export default withStyles(styles)(LobbyView);
