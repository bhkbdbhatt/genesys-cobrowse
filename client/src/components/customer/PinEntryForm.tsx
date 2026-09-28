import React, { useState } from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PinEntryFormProps {
    onSubmitPin: (pin: string) => void;
}

export const PinEntryForm: React.FC<PinEntryFormProps> = ({ onSubmitPin }) => {
    const [pin, setPin] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length === 6) {
            onSubmitPin(pin);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-center font-mono text-lg tracking-widest text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
            </div>
            <Button type="submit" disabled={pin.length !== 6} className="w-full">
                Join Session
                <ArrowRight className="w-4 h-4" />
            </Button>
        </form>
    );
};