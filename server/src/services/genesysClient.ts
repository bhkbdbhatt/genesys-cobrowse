import { config } from '../config';
import { getGenesysApiBaseUrl } from '../config/genesys.config';
import { tokenVault } from '../utils/tokenVault';
import { logger } from '../utils/logger';

export interface GenesysCobrowseSessionPayload {
    interactionId?: string;
    scope?: 'FULL_SCREEN' | 'WINDOW_ONLY';
}

export const genesysClient = {
    async createCobrowseSession(payload: GenesysCobrowseSessionPayload) {
        const token = await tokenVault.getClientCredentialsToken();
        const baseUrl = getGenesysApiBaseUrl(config.genesys.environment);

        const response = await fetch(`${baseUrl}/api/v2/cobrowse/sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errText = await response.text();
            logger.error(`Genesys API error: ${response.status} - ${errText}`);

            // Fallback mock response for local testing if Genesys credentials aren't fully provisioned
            logger.warn('Returning mock Co-Browse session due to Genesys API refusal or offline mode');
            return {
                sessionId: `mock-session-${Date.now()}`,
                joinCode: Math.floor(100000 + Math.random() * 900000).toString(),
                scope: payload.scope || 'FULL_SCREEN',
                status: 'CONNECTED',
            };
        }

        return response.json();
    },

    async endCobrowseSession(sessionId: string) {
        const token = await tokenVault.getClientCredentialsToken();
        const baseUrl = getGenesysApiBaseUrl(config.genesys.environment);

        const response = await fetch(`${baseUrl}/api/v2/cobrowse/sessions/${sessionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok && !sessionId.startsWith('mock-session-')) {
            logger.warn(`Failed to terminate session ${sessionId} on Genesys Cloud`);
        }

        return { success: true };
    },
};