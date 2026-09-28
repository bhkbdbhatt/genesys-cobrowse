import { useState, useCallback } from 'react';
import { CobrowseSession, ScopeType } from '../types/cobrowse';
import { cobrowseApiService } from '../services/cobrowseApiService';

export function useCobrowseSession() {
    const [session, setSession] = useState<CobrowseSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startSession = useCallback(async (interactionId: string, scope: ScopeType) => {
        setLoading(true);
        setError(null);
        try {
            const newSession = await cobrowseApiService.createSession(interactionId, scope);
            setSession(newSession);
        } catch (err: any) {
            setError(err.message || 'Failed to start session');
        } finally {
            setLoading(false);
        }
    }, []);

    const endSession = useCallback(async () => {
        if (!session) return;
        setLoading(true);
        try {
            await cobrowseApiService.endSession(session.sessionId);
            setSession(null);
        } catch (err: any) {
            setError(err.message || 'Failed to end session');
        } finally {
            setLoading(false);
        }
    }, [session]);

    return { session, loading, error, startSession, endSession };
}