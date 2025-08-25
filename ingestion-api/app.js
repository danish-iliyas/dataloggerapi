import express from 'express';
import loggerRoutes from './src/routes/loggerRoutes.js';

const app = express();
app.use(express.text({ type: '*/*' }));
app.use('/api', loggerRoutes);
app.get('/health', (req, res) => res.status(200).send('Ingestion API is OK'));

export default app;