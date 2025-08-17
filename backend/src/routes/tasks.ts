import { Router } from 'express';
import { z } from 'zod';
import { createStubTask, getStubTask } from '../services/analysis.js';

const router = Router();

const CreateTaskBody = z.object({
  dataset: z.enum(['titanic','wine_red','wine_white']),
  template: z.string().optional(),
  prompt: z.string().optional()
});

router.post('/', async (req, res) => {
  const parsed = CreateTaskBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const task = await createStubTask(parsed.data);
  res.json({ taskId: task.id });
});

router.get('/:id', async (req, res) => {
  const task = await getStubTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

export default router;
