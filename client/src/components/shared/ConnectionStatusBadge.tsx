import React from 'react';
import { SessionState } from '../../types/cobrowse';

interface ConnectionStatusBadgeProps {
    status: SessionState;
}

export const ConnectionStatusBadge: React.FC<ConnectionStatusBadgeProps> = ({ status }) => {
    const styles: Record<SessionState, string> = {
        IDLE: 'bg-slate-700 text-slate-300',
        CONNECTING: 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse',
        CONNECTED: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        PAUSED: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        ENDED: 'bg-red-500/20 text-red-400 border border-red-500/30',
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
            {status}
        </span>
    );
};