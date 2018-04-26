import { WEBSOCKET_ENDPOINT } from '../config.js';
import { WEBSOCKET_RETRY_DELAY } from '../config.js';
import { WEBSOCKET_HEARTBEAT_INTERVAL } from '../config.js';

export default class WebSocketConnection {
  constructor(playerId, authTicket, targetName, path, params, onError) {
    var url = `${WEBSOCKET_ENDPOINT}/ws/${path}?playerId=${playerId}`;
    if (params) {
      for (var param in params) {
        url += `&${param}=${params[param]}`;
      }
    }

    var createWebSocket = () => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log(`Opened WebSocket connection to ${targetName}`);
        this.send({
          eventType: "PlayerAuthenticationEvent",
          ticket: authTicket
        });
        this.startHeartbeat();
      };

      this.ws.onclose = (closeEvent) => {
        console.log(`WebSocket connection to ${targetName} was closed. (Reason: (${closeEvent.code}) ${closeEvent.reason})`);
        this.stopHeartbeat();
        if (closeEvent.code !== 1000) {
          if (closeEvent.code === 1008) {
            onError();
          } else {
            setTimeout(createWebSocket, WEBSOCKET_RETRY_DELAY);
          }
        }
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

  startHeartbeat() {
    this.heartbeat = setInterval(() => {
      this.send({
        eventType: "PingEvent"
      });
    }, WEBSOCKET_HEARTBEAT_INTERVAL);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeat);
  }
}
