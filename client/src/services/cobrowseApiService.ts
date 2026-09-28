import { CobrowseSession, ScopeType } from '../types/cobrowse';

const API_BASE = '/api/v2/cobrowse';

export const cobrowseApiService = {
    async createSession(interactionId: string, scope: ScopeType): Promise<CobrowseSession> {
        const res = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interactionId, scope }),
        });
        if (!res.ok) throw new Error('Failed to create co-browse session');
        return res.json();
    },

    async joinSessionByPin(pin: string): Promise<CobrowseSession> {
        const res = await fetch(`${API_BASE}/sessions/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin }),
        });
        if (!res.ok) throw new Error('Invalid PIN or session expired');
        return res.json();
    },

    async endSession(sessionId: string): Promise<void> {
        await fetch(`${API_BASE}/sessions/${sessionId}/end`, {
            method: 'POST',
        });
    },
};