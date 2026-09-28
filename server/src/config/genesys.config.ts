import { config } from './index';

export const getGenesysApiBaseUrl = (environment: string = config.genesys.environment): string => {
    return `https://api.${environment}`;
};

export const getGenesysAuthUrl = (environment: string = config.genesys.environment): string => {
    return `https://login.${environment}/oauth/token`;
};