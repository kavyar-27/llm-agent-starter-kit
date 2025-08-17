import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

const datasets = [
  { key: 'titanic', table: 'titanic_passengers' },
  { key: 'wine_red', table: 'wine_quality_red' },
  { key: 'wine_white', table: 'wine_quality_white' }
];

router.get('/', async (_req, res) => {
  const results = [];
  for (const d of datasets) {
    const { rows } = await query<{ count: string }>(`SELECT COUNT(*) as count FROM ${d.table}`);
    results.push({ key: d.key, rows: Number(rows[0].count) });
  }
  res.json(results);
});

export default router;
