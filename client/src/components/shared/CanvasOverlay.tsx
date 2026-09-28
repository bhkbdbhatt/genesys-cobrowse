import React, { useRef, useEffect } from 'react';
import { AnnotationPoint } from '../../types/cobrowse';
import { drawLineOnCanvas } from '../../utils/canvasHelpers';

interface CanvasOverlayProps {
    annotations: AnnotationPoint[];
    width: number;
    height: number;
}

export const CanvasOverlay: React.FC<CanvasOverlayProps> = ({ annotations, width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 1; i < annotations.length; i++) {
            drawLineOnCanvas(ctx, annotations[i - 1], annotations[i]);
        }
    }, [annotations, width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute top-0 left-0 pointer-events-none z-20"
        />
    );
};