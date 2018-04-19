import WebSocketConnection from '../util/webSocketConnection.js';

export default class PregameConnection extends WebSocketConnection {
  constructor(gameId, playerId, authToken, onError) {
    var name = `Pregame ${gameId}`;
    var path = "pregame";
    var params = { gameId: gameId };
    super(playerId, authToken, name, path, params, onError);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.send({
      eventType: "StartGameEvent"
    });
  }

  takeSeat(seat) {
    this.send({
      eventType: "TakeSeatEvent",
      seat: seat
    });
  }

  leaveSeat(seat) {
    this.send({
      eventType: "LeaveSeatEvent",
      seat: seat
    });
  }
}
