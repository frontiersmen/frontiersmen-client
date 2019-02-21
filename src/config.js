const environment = 'production';

const config = require('./config.json')[environment];

export const AUTH_TICKET_ENDPOINT = `${config.protocol}://${config.host}/api/auth-ticket`;
export const WEBSOCKET_ENDPOINT = `${config.webSocketProtocol}://${config.host}`;
export const WEBSOCKET_RETRY_DELAY = 3 * 1000;
export const WEBSOCKET_HEARTBEAT_INTERVAL = 5 * 1000;
