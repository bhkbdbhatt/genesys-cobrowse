import React, { useState } from 'react';
import { AgentDashboard } from './components/agent/AgentDashboard';
import { CustomerLanding } from './components/customer/CustomerLanding';
import { Monitor, User } from 'lucide-react';

export default function App() {
    const [role, setRole] = useState<'AGENT' | 'CUSTOMER'>('AGENT');

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
            <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
                <h1 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                    <span>Genesys Cloud Co-Browse</span>
                </h1>

                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                    <button
                        onClick={() => setRole('AGENT')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${role === 'AGENT' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <Monitor className="w-3.5 h-3.5" />
                        Agent View
                    </button>
                    <button
                        onClick={() => setRole('CUSTOMER')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${role === 'CUSTOMER' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <User className="w-3.5 h-3.5" />
                        Customer View
                    </button>
                </div>
            </header>

            <main className="flex-1 p-6">
                {role === 'AGENT' ? <AgentDashboard /> : <CustomerLanding />}
            </main>
        </div>
    );
}