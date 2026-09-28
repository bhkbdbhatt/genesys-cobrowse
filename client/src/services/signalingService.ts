import { WebSocketMessage } from '../types/websocket';

export class SignalingService {
    private socket: WebSocket | null = null;
    private messageListeners: ((msg: WebSocketMessage) => void)[] = [];

    connect(sessionId: string, sender: 'AGENT' | 'CUSTOMER') {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.socket = new WebSocket(`${protocol}//${window.location.host}/ws/cobrowse`);

        this.socket.onopen = () => {
            this.send({
                type: 'JOIN_SESSION',
                sessionId,
                sender,
            });
        };

        this.socket.onmessage = (event) => {
            try {
                const msg: WebSocketMessage = JSON.parse(event.data);
                this.messageListeners.forEach((listener) => listener(msg));
            } catch (err) {
                console.error('Error parsing signaling message', err);
            }
        };
    }

    send(msg: WebSocketMessage) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(msg));
        }
    }

    onMessage(callback: (msg: WebSocketMessage) => void) {
        this.messageListeners.push(callback);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.messageListeners = [];
    }
}

export const signalingService = new SignalingService();