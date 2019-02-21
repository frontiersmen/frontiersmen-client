import WebSocketConnection from '../util/webSocketConnection.js';

export default class GameConnection extends WebSocketConnection {
  constructor(gameId, playerId, authTicket, onError) {
    var name = `Game ${gameId}`;
    var path = "game";
    var params = { gameId: gameId };
    super(playerId, authTicket, name, path, params, onError);
    this.startGame = this.startGame.bind(this);
    this.placeMark = this.placeMark.bind(this);
  }

  startGame() {
    this.send({
      eventType: "StartGameEvent"
    });
  }

  placeMark(row, col) {
    console.log(row, col);
    this.send({
      eventType: "PlaceMarkEvent",
      row: row,
      col: col
    });
  }
}
