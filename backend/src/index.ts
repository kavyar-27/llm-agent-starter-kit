import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import tasksRouter from './routes/tasks.js';
import datasetsRouter from './routes/datasets.js';
import schemaRouter from './routes/schema.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/tasks', tasksRouter);
app.use('/api/datasets', datasetsRouter);
app.use('/api/schema', schemaRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
