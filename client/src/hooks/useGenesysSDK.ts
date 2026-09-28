import { useEffect, useState } from 'react';
import { ClientApp } from 'purecloud-client-app-sdk';

export interface GenesysInteraction {
    id: string;
    tags?: string[];
    state: string;
}

export function useGenesysSDK() {
    const [sdk, setSdk] = useState<ClientApp | null>(null);
    const [currentInteraction, setCurrentInteraction] = useState<GenesysInteraction | null>(null);

    useEffect(() => {
        try {
            const clientApp = new ClientApp();
            setSdk(clientApp);

            clientApp.myInteraction.subscribe((interaction: any) => {
                if (interaction) {
                    setCurrentInteraction({
                        id: interaction.id,
                        tags: interaction.tags || [],
                        state: interaction.state || 'CONNECTED',
                    });
                }
            });
        } catch (e) {
            console.warn('Genesys Client App SDK not running inside PureCloud iframe context.');
        }
    }, []);

    return { sdk, currentInteraction };
}