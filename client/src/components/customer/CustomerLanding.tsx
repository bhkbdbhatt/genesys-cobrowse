import React, { useState } from 'react';
import { PinEntryForm } from './PinEntryForm';
import { CustomerCoBrowseView } from './CustomerCoBrowseView';

export const CustomerLanding: React.FC = () => {
    const [joined, setJoined] = useState(false);

    return (
        <div className="max-w-md mx-auto my-12 p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl">
            {!joined ? (
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-bold text-slate-100">Live Support Co-Browse</h1>
                        <p className="text-xs text-slate-400">
                            Enter the 6-digit PIN provided by your support agent to begin screen sharing.
                        </p>
                    </div>
                    <PinEntryForm onSubmitPin={() => setJoined(true)} />
                </div>
            ) : (
                <CustomerCoBrowseView onStopSharing={() => setJoined(false)} />
            )}
        </div>
    );
};