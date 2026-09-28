import React, { useState } from 'react';
import { PrivacyOverlay } from './PrivacyOverlay';
import { ShieldAlert, StopCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface CustomerCoBrowseViewProps {
    onStopSharing: () => void;
}

export const CustomerCoBrowseView: React.FC<CustomerCoBrowseViewProps> = ({ onStopSharing }) => {
    return (
        <div className="relative border-2 border-indigo-500/50 rounded-xl overflow-hidden bg-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                    Co-Browse Active (Agent Screen Visible)
                </div>
                <Button variant="danger" onClick={onStopSharing} className="text-xs py-1.5 px-3">
                    <StopCircle className="w-4 h-4" />
                    Stop Sharing
                </Button>
            </div>

            <PrivacyOverlay maskedFieldCount={3} />

            <div className="bg-slate-900 rounded-lg p-6 space-y-4">
                <p className="text-sm text-slate-300">Customer Support Verification Portal</p>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-slate-400">Account Owner Name</label>
                        <input type="text" readOnly value="Jane Doe" className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 mt-1" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400">SSN / Tax ID (Masked)</label>
                        <input type="password" readOnly value="123456789" className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 mt-1 cobrowse-mask" />
                    </div>
                </div>
            </div>
        </div>
    );
};