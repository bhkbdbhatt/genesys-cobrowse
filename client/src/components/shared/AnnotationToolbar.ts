import React from 'react';
import { Pencil, MousePointer, Trash2 } from 'lucide-react';

interface AnnotationToolbarProps {
    activeTool: 'pointer' | 'draw';
    setActiveTool: (tool: 'pointer' | 'draw') => void;
    onClear: () => void;
}

export const AnnotationToolbar: React.FC<AnnotationToolbarProps> = ({
    activeTool,
    setActiveTool,
    onClear,
}) => {
    return React.createElement(
        'div',
        { className: 'flex items-center gap-2 bg-slate-800 border border-slate-700 p-1.5 rounded-lg shadow-lg' },
        React.createElement(
            'button',
            {
                onClick: () => setActiveTool('pointer'),
                className: `p-2 rounded-md ${activeTool === 'pointer' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`,
                title: 'Laser Pointer',
            },
            React.createElement(MousePointer, { className: 'w-4 h-4' }),
        ),
        React.createElement(
            'button',
            {
                onClick: () => setActiveTool('draw'),
                className: `p-2 rounded-md ${activeTool === 'draw' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`,
                title: 'Draw Annotation',
            },
            React.createElement(Pencil, { className: 'w-4 h-4' }),
        ),
        React.createElement('div', { className: 'w-px h-5 bg-slate-700 my-auto mx-1' }),
        React.createElement(
            'button',
            {
                onClick: onClear,
                className: 'p-2 text-slate-400 hover:text-red-400 rounded-md',
                title: 'Clear Annotations',
            },
            React.createElement(Trash2, { className: 'w-4 h-4' }),
        ),
    );
};