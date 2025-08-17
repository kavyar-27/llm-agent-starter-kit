'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TasksPage() {
  // Minimal local store: this starter doesn't persist tasks list server-side
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem('taskIds') || '[]');
    setIds(seen);
    const handler = (e: StorageEvent) => {
      if (e.key === 'taskIds') setIds(JSON.parse(e.newValue || '[]'));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <main>
      <h1>Tasks</h1>
      <ul>
        {ids.map(id => (
          <li key={id}><a href={`/tasks/${id}`}>{id}</a></li>
        ))}
        {ids.length === 0 && <li>No tasks yet.</li>}
      </ul>
      <p style={{ marginTop: 16, opacity: 0.7 }}>This starter stores task IDs in localStorage only.</p>
    </main>
  );
}
