import { useEffect } from 'react';
import { signalingService } from '../services/signalingService';
import { WebSocketMessage } from '../types/websocket';

export function useWebSocket(
    sessionId: string | null,
    role: 'AGENT' | 'CUSTOMER',
    onMessage: (msg: WebSocketMessage) => void
) {
    useEffect(() => {
        if (!sessionId) return;

        signalingService.connect(sessionId, role);
        signalingService.onMessage(onMessage);

        return () => {
            signalingService.disconnect();
        };
    }, [sessionId, role]);

    const sendMessage = (msg: Omit<WebSocketMessage, 'sessionId' | 'sender'>) => {
        if (!sessionId) return;
        signalingService.send({
            ...msg,
            sessionId,
            sender: role,
        });
    };

    return { sendMessage };
}