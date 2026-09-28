import React from 'react';
import { ShieldCheck, EyeOff } from 'lucide-react';

interface PrivacyOverlayProps {
    maskedFieldCount?: number;
}

export const PrivacyOverlay: React.FC<PrivacyOverlayProps> = ({ maskedFieldCount = 2 }) => {
    return (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-center justify-between text-amber-300 text-xs">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Privacy Protection Active: Sensitive input fields are hidden from agent.</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">
                <EyeOff className="w-3 h-3" />
                {maskedFieldCount} Masked
            </div>
        </div>
    );
};