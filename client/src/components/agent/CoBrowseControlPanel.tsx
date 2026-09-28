import React from 'react';
import { Play, Square, Monitor, Frame } from 'lucide-react';
import { ScopeType, SessionState } from '../../types/cobrowse';
import { Button } from '../ui/Button';

interface CoBrowseControlPanelProps {
    sessionStatus: SessionState;
    scope: ScopeType;
    setScope: (scope: ScopeType) => void;
    onStart: () => void;
    onEnd: () => void;
}

export const CoBrowseControlPanel: React.FC<CoBrowseControlPanelProps> = ({
    sessionStatus,
    scope,
    setScope,
    onStart,
    onEnd,
}) => {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200">Co-Browse Session Controls</h3>

            <div className="flex gap-3">
                <button
                    onClick={() => setScope('FULL_SCREEN')}
                    disabled={sessionStatus !== 'IDLE'}
                    className={`flex-1 p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${scope === 'FULL_SCREEN'
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                            : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                >
                    <Monitor className="w-5 h-5" />
                    <div>
                        <div className="text-xs font-semibold">Full Screen</div>
                        <div className="text-[10px] opacity-70">Entire Desktop</div>
                    </div>
                </button>

                <button
                    onClick={() => setScope('WINDOW_ONLY')}
                    disabled={sessionStatus !== 'IDLE'}
                    className={`flex-1 p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${scope === 'WINDOW_ONLY'
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                            : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                >
                    <Frame className="w-5 h-5" />
                    <div>
                        <div className="text-xs font-semibold">Window Level</div>
                        <div className="text-[10px] opacity-70">Single Application</div>
                    </div>
                </button>
            </div>

            <div>
                {sessionStatus === 'IDLE' ? (
                    <Button onClick={onStart} className="w-full">
                        <Play className="w-4 h-4 fill-current" />
                        Initiate Session
                    </Button>
                ) : (
                    <Button onClick={onEnd} variant="danger" className="w-full">
                        <Square className="w-4 h-4 fill-current" />
                        End Session
                    </Button>
                )}
            </div>
        </div>
    );
};