import WebSocketConnection from '../util/webSocketConnection.js';

export default class GameConnection extends WebSocketConnection {
  constructor(gameId, playerId, authToken, onError) {
    var name = `Game ${gameId}`;
    var path = "game";
    var params = { gameId: gameId };
    super(playerId, authToken, name, path, params, onError);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.send({
      eventType: "StartGameEvent"
    });
  }
}
