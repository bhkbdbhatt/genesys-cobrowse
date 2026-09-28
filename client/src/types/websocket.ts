import { AnnotationPoint, MousePosition } from './cobrowse';

export type WebSocketMessageType =
    | 'JOIN_SESSION'
    | 'CURSOR_MOVE'
    | 'DRAW'
    | 'CLEAR_CANVAS'
    | 'DISCONNECT'
    | 'CONTROL_REQUEST'
    | 'CONTROL_RESPONSE';

export interface WebSocketMessage {
    type: WebSocketMessageType;
    sessionId: string;
    sender: 'AGENT' | 'CUSTOMER';
    payload?: {
        position?: MousePosition;
        annotation?: AnnotationPoint;
        granted?: boolean;
        reason?: string;
    };
}