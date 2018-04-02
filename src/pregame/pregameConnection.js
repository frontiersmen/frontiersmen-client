import WebSocketConnection from '../util/webSocketConnection.js';

export default class PregameConnection extends WebSocketConnection {
  constructor(gameId, playerId, authToken) {
    var name = `Pregame ${gameId}`;
    var path = "pregame";
    var params = { gameId: gameId };
    super(playerId, authToken, name, path, params);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.send({
      eventType: "StartGameEvent"
    });
  }
}
