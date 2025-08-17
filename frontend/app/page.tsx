'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export default function Page() {
  const [dataset, setDataset] = useState<'titanic'|'wine_red'|'wine_white'>('titanic');
  const [template, setTemplate] = useState('default');
  const [prompt, setPrompt] = useState('');
  const [taskId, setTaskId] = useState<string|undefined>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset, template, prompt })
    });
    const data = await res.json();
    setTaskId(data.taskId);
  };

  return (
    <main>
      <h1>New Analysis</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
        <label>
          Dataset
          <select value={dataset} onChange={e => setDataset(e.target.value as any)}>
            <option value="titanic">titanic</option>
            <option value="wine_red">wine_red</option>
            <option value="wine_white">wine_white</option>
          </select>
        </label>
        <label>
          Template
          <select value={template} onChange={e => setTemplate(e.target.value)}>
            <option value="default">default</option>
            <option value="eda">eda</option>
            <option value="survival">survival</option>
            <option value="correlation">correlation</option>
          </select>
        </label>
        <label>
          Prompt (optional)
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} />
        </label>
        <button type="submit">Create Task</button>
      </form>

      {taskId && (
        <p style={{ marginTop: 12 }}>
          Task created: <a href={`/tasks/${taskId}`}>{taskId}</a>
        </p>
      )}
    </main>
  );
}
