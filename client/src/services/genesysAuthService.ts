export interface GenesysAuthToken {
    accessToken: string;
    expiresIn: number;
}

export const genesysAuthService = {
    getStoredToken(): string | null {
        return localStorage.getItem('gc_access_token');
    },

    setStoredToken(token: string): void {
        localStorage.setItem('gc_access_token', token);
    },

    clearToken(): void {
        localStorage.removeItem('gc_access_token');
    },

    async authenticateImplicitly(clientId: string, redirectUri: string, environment = 'mypurecloud.com'): Promise<void> {
        const authUrl = `https://login.${environment}/oauth/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location.href = authUrl;
    },
};