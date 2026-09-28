export interface SessionRecord {
    sessionId: string;
    joinCode: string;
    interactionId?: string;
    scope: string;
    status: 'IDLE' | 'CONNECTED' | 'PAUSED' | 'ENDED';
    createdAt: number;
}

class SessionManager {
    private sessions: Map<string, SessionRecord> = new Map();
    private pinToSessionId: Map<string, string> = new Map();

    createSession(data: Omit<SessionRecord, 'createdAt' | 'status'>): SessionRecord {
        const session: SessionRecord = {
            ...data,
            status: 'CONNECTED',
            createdAt: Date.now(),
        };
        this.sessions.set(session.sessionId, session);
        this.pinToSessionId.set(session.joinCode, session.sessionId);
        return session;
    }

    getSession(sessionId: string): SessionRecord | undefined {
        return this.sessions.get(sessionId);
    }

    getSessionByPin(pin: string): SessionRecord | undefined {
        const sessionId = this.pinToSessionId.get(pin);
        if (!sessionId) return undefined;
        return this.sessions.get(sessionId);
    }

    endSession(sessionId: string): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.status = 'ENDED';
            this.pinToSessionId.delete(session.joinCode);
            this.sessions.delete(sessionId);
        }
    }
}

export const sessionManager = new SessionManager();