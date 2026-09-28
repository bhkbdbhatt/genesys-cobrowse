import http from 'http';
import { WebSocketServer } from 'ws';
import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { setupCobrowseWebSocket } from './sockets/cobrowseSocket';

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    setupCobrowseWebSocket(ws);
});

server.on('upgrade', (request, socket, head) => {
    const pathname = request.url;

    if (pathname === '/ws/cobrowse') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(config.port, () => {
    logger.info(`Genesys Co-Browse backend server running on port ${config.port} in ${config.nodeEnv} mode`);
});