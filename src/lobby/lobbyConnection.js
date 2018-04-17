import WebSocketConnection from '../util/webSocketConnection.js';

export default class LobbyConnection extends WebSocketConnection {
  constructor(playerId, authToken, onError) {
    var name = "Lobby";
    var path = "lobby";
    super(playerId, authToken, name, path, null, onError);
    this.createGame = this.createGame.bind(this);
    this.changeDisplayName = this.changeDisplayName.bind(this);
  }

  createGame(owner, name) {
    this.send({
      eventType: "GameCreationEvent",
      name: name,
      attributes: {}
    });
  }

  changeDisplayName(name) {
    this.send({
      eventType: "PlayerNameChangeEvent",
      displayName: name
    });
  }
}
