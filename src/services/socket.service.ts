import * as WebSocket from 'ws';

class SocketService {
  static readonly instance: SocketService = new SocketService();
  private readonly clients: Set<WebSocket>;

  constructor() {
    this.clients = new Set();
  }

  init(ws: WebSocket) {
    this.clients.add(ws);

    ws.on('close', () => {
      this.clients.delete(ws);
    });
  }

  sendMessage(type: string, data?: any) {
    this.clients.forEach((ws) => ws.send(JSON.stringify({ type, data })));
  }
}

export default SocketService.instance;
