import { WebSocket } from 'ws';
import { logger } from '../utils/logger';

interface ClientConnection {
    ws: WebSocket;
    sessionId: string;
    sender: 'AGENT' | 'CUSTOMER';
}

const sessionClients: Map<string, ClientConnection[]> = new Map();

export const setupCobrowseWebSocket = (ws: WebSocket) => {
    let currentSessionId: string | null = null;
    let senderRole: 'AGENT' | 'CUSTOMER' | null = null;

    ws.on('message', (messageData: string) => {
        try {
            const message = JSON.parse(messageData);
            const { type, sessionId, sender, payload } = message;

            if (type === 'JOIN_SESSION') {
                currentSessionId = sessionId;
                senderRole = sender;

                if (!sessionClients.has(sessionId)) {
                    sessionClients.set(sessionId, []);
                }
                sessionClients.get(sessionId)!.push({ ws, sessionId, sender });
                logger.info(`Client [${sender}] joined WebSocket room for session ${sessionId}`);
                return;
            }

            // Broadcast signaling payload to other participants in the same session
            if (currentSessionId && sessionClients.has(currentSessionId)) {
                const clients = sessionClients.get(currentSessionId)!;
                for (const client of clients) {
                    if (client.ws !== ws && client.ws.readyState === WebSocket.OPEN) {
                        client.ws.send(JSON.stringify({ type, sender, payload }));
                    }
                }
            }
        } catch (err) {
            logger.error('Error handling WebSocket message', err);
        }
    });

    ws.on('close', () => {
        if (currentSessionId && sessionClients.has(currentSessionId)) {
            const clients = sessionClients.get(currentSessionId)!;
            const index = clients.findIndex((c) => c.ws === ws);
            if (index !== -1) {
                clients.splice(index, 1);
            }
            if (clients.length === 0) {
                sessionClients.delete(currentSessionId);
            }
            logger.info(`Client [${senderRole}] disconnected from session ${currentSessionId}`);
        }
    });
};