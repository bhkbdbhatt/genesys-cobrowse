import React from 'react';

interface ToggleSwitchProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
    return (
        <label className="flex items-center cursor-pointer gap-3">
            {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
            <div
                onClick={() => onChange(!enabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 ${enabled ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
            >
                <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform transform ${enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </div>
        </label>
    );
};