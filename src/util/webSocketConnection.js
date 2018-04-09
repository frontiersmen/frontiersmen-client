import { WEBSOCKET_ENDPOINT } from '../config.js';
import { WEBSOCKET_RETRY_DELAY } from '../config.js';

export default class WebSocketConnection {
  constructor(playerId, authToken, targetName, path, params) {
    var createWebSocket = () => {
      var url = `${WEBSOCKET_ENDPOINT}/ws/${path}?playerId=${playerId}&authToken=${authToken}`;
      if (params) {
        for (var param in params) {
          url += `&${param}=${params[param]}`;
        }
      }
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log(`Opened WebSocket connection to ${targetName}`);
      };

      this.ws.onclose = (closeEvent) => {
        console.log(`WebSocket connection to ${targetName} was closed. (Reason: ${closeEvent.reason})`);
        setTimeout(createWebSocket, WEBSOCKET_RETRY_DELAY);
      }

      this.ws.onmessage = (message) => {
        var event = JSON.parse(message.data);
        console.log(event);
        if (this.eventHandlers[event.eventType]) {
          this.eventHandlers[event.eventType].forEach(handler => handler(event));
        }
      }
    }

    createWebSocket();
    this.eventHandlers = {};
  }

  disconnect() {
    this.ws.close(1000, 'User disconnect');
  }

  send(event) {
    this.ws.send(JSON.stringify(event));
  }

  on(eventType, eventHandler) {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = [];
    }
    this.eventHandlers[eventType].push(eventHandler);
  }
}
