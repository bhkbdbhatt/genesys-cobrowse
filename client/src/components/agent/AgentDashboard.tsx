import React, { useState } from 'react';
import { InteractionHeader } from './InteractionHeader';
import { CoBrowseControlPanel } from './CoBrowseControlPanel';
import { WorkflowTagListener } from './WorkflowTagListener';
import { ConnectionStatusBadge } from '../shared/ConnectionStatusBadge';
import { ScopeType, SessionState } from '../../types/cobrowse';
import { KeyRound, ShieldAlert } from 'lucide-react';

export const AgentDashboard: React.FC = () => {
    const [sessionStatus, setSessionStatus] = useState<SessionState>('IDLE');
    const [scope, setScope] = useState<ScopeType>('FULL_SCREEN');
    const [pin, setPin] = useState<string | null>(null);

    const handleStartSession = () => {
        setSessionStatus('CONNECTING');
        setTimeout(() => {
            setPin('849201');
            setSessionStatus('CONNECTED');
        }, 1000);
    };

    const handleEndSession = () => {
        setSessionStatus('ENDED');
        setTimeout(() => {
            setPin(null);
            setSessionStatus('IDLE');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <InteractionHeader interactionId="3a91f82e-9901-41fa-b302-8a90192" tags={['cobrowse_requested', 'tier2_support']} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <CoBrowseControlPanel
                        sessionStatus={sessionStatus}
                        scope={scope}
                        setScope={setScope}
                        onStart={handleStartSession}
                        onEnd={handleEndSession}
                    />

                    {pin && (
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-400">Share Pin with Customer</p>
                                <p className="text-3xl font-mono font-bold tracking-widest text-indigo-400 mt-1">{pin}</p>
                            </div>
                            <KeyRound className="w-8 h-8 text-indigo-400 opacity-80" />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">State:</span>
                            <ConnectionStatusBadge status={sessionStatus} />
                        </div>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                        <WorkflowTagListener
                            tags={['cobrowse_requested']}
                            autoTriggerTag="cobrowse_requested"
                            onTagMatched={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};