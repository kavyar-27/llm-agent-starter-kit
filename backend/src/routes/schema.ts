import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/:dataset', async (req, res) => {
  const map: Record<string,string> = {
    titanic: 'titanic_passengers',
    wine_red: 'wine_quality_red',
    wine_white: 'wine_quality_white'
  };
  const table = map[req.params.dataset];
  if (!table) return res.status(400).json({ error: 'Unknown dataset' });

  const { rows } = await query<{ column_name: string, data_type: string }>(`
    SELECT column_name, data_type FROM information_schema.columns
    WHERE table_name = $1
    ORDER BY ordinal_position
  `, [table]);

  res.json({ dataset: req.params.dataset, columns: rows });
});

export default router;
