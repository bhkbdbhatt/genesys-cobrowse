import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};