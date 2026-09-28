import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    genesys: {
        clientId: process.env.GENESYS_CLIENT_ID || '',
        clientSecret: process.env.GENESYS_CLIENT_SECRET || '',
        environment: process.env.GENESYS_ENVIRONMENT || 'mypurecloud.com',
    },
};