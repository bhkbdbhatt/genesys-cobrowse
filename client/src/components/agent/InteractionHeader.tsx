import React from 'react';
import { Phone, Tag } from 'lucide-react';

interface InteractionHeaderProps {
    interactionId: string;
    tags: string[];
}

export const InteractionHeader: React.FC<InteractionHeaderProps> = ({ interactionId, tags }) => {
    return (
        <div className="bg-slate-800/80 border-b border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                    <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-slate-100">Active Voice Call</h2>
                    <p className="text-xs text-slate-400 font-mono">ID: {interactionId}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <div className="flex gap-1">
                    {tags.map((tag) => (
                        <span key={tag} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};