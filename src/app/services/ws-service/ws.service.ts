import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private webSocket!: WebSocketSubject<unknown>;

  connectSocket(params: unknown) {
    return this.webSocket = webSocket({
      url: `wss://ws.bitmex.com/realtime?${params}`,
      openObserver: {
        next: () => console.log('connection ok')
      },
      closeObserver: {
        next: () => {
          const customError = { code: 6666, reason: 'Custom evil reason' }
          console.log(`code: ${ customError.code }, reason: ${ customError.reason }`);
        }
      }
    })
  }

  disconnectSocket() {
    this.webSocket.complete();
  }

}
