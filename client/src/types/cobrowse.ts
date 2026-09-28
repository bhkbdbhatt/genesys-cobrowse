export type ScopeType = 'FULL_SCREEN' | 'WINDOW_ONLY';

export type SessionState = 'IDLE' | 'CONNECTING' | 'CONNECTED' | 'PAUSED' | 'ENDED';

export interface CobrowseSession {
    sessionId: string;
    joinCode: string;
    scope: ScopeType;
    status: SessionState;
    customerJoined: boolean;
    interactionId?: string;
}

export interface MousePosition {
    x: number;
    y: number;
}

export interface AnnotationPoint {
    x: number;
    y: number;
    color: string;
    size: number;
}