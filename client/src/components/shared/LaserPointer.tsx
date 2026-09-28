import React from 'react';
import { MousePosition } from '../../types/cobrowse';

interface LaserPointerProps {
    position: MousePosition | null;
}

export const LaserPointer: React.FC<LaserPointerProps> = ({ position }) => {
    if (!position) return null;

    return (
        <div
            className="absolute w-4 h-4 bg-red-500 rounded-full blur-[1px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-75 shadow-[0_0_10px_#ef4444]"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
    );
};