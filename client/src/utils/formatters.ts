export function formatPin(pin: string): string {
    if (pin.length === 6) {
        return `${pin.slice(0, 3)} ${pin.slice(3)}`;
    }
    return pin;
}

export function formatTimeRemaining(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}