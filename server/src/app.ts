import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: Date.now() });
});

// Error handling middleware
app.use(errorHandler);

export default app;