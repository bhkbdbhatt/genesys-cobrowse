declare module 'purecloud-client-app-sdk' {
    export interface ClientAppConfig {
        myInteractionId?: string;
    }

    export class ClientApp {
        constructor(config?: { pcEnvironment?: string });
        myInteraction: {
            subscribe(callback: (interaction: any) => void): void;
            get(): Promise<any>;
        };
        alerting: {
            showToast(options: { title: string; message: string; type?: string }): void;
        };
    }
}