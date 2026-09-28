import { useState, useCallback } from 'react';

export function useScreenShare() {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isSharing, setIsSharing] = useState(false);

    const startScreenShare = useCallback(async (displaySurface: 'monitor' | 'window' = 'monitor') => {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface,
                } as any,
                audio: false,
            });

            setStream(mediaStream);
            setIsSharing(true);

            mediaStream.getVideoTracks()[0].onended = () => {
                setIsSharing(false);
                setStream(null);
            };
        } catch (err) {
            console.error('Error starting screen share', err);
        }
    }, []);

    const stopScreenShare = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setIsSharing(false);
        }
    }, [stream]);

    return { stream, isSharing, startScreenShare, stopScreenShare };
}