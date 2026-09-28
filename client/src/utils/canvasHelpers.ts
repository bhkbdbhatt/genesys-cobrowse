import { AnnotationPoint } from '../types/cobrowse';

export function drawLineOnCanvas(
    ctx: CanvasRenderingContext2D,
    from: AnnotationPoint,
    to: AnnotationPoint
) {
    ctx.beginPath();
    ctx.strokeStyle = to.color;
    ctx.lineWidth = to.size;
    ctx.lineCap = 'round';
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}