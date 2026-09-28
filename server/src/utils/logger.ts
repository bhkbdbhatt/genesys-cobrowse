export const logger = {
    info: (message: string, meta?: any) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ? meta : '');
    },
    error: (message: string, err?: any) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, err ? err : '');
    },
    warn: (message: string, meta?: any) => {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ? meta : '');
    },
};