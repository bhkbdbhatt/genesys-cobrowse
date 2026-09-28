import { config } from '../config';
import { getGenesysAuthUrl } from '../config/genesys.config';
import { logger } from './logger';

interface CachedToken {
    accessToken: string;
    expiresAt: number;
}

let cachedToken: CachedToken | null = null;

export const tokenVault = {
    async getClientCredentialsToken(): Promise<string> {
        if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
            return cachedToken.accessToken;
        }

        const authUrl = getGenesysAuthUrl(config.genesys.environment);
        const credentials = Buffer.from(
            `${config.genesys.clientId}:${config.genesys.clientSecret}`
        ).toString('base64');

        try {
            const response = await fetch(authUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials',
            });

            if (!response.ok) {
                throw new Error(`Failed to authenticate with Genesys Cloud: ${response.statusText}`);
            }

            const data: any = await response.json();
            cachedToken = {
                accessToken: data.access_token,
                expiresAt: Date.now() + data.expires_in * 1000,
            };

            logger.info('Successfully acquired Genesys client credentials token');
            return cachedToken!.accessToken;
        } catch (error) {
            logger.error('Error fetching Genesys token', error);
            throw error;
        }
    },
};