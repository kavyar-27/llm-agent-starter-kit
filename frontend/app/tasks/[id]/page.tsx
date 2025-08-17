'use client';

import useSWR from 'swr';
import { useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function TaskDetail({ params }: { params: { id: string } }) {
  const { data, isLoading } = useSWR(`${API_BASE}/api/tasks/${params.id}`, fetcher);

  useEffect(() => {
    // keep an index of task IDs for the barebones list page
    const key = 'taskIds';
    const ids: string[] = JSON.parse(localStorage.getItem(key) || '[]');
    if (!ids.includes(params.id)) {
      ids.unshift(params.id);
      localStorage.setItem(key, JSON.stringify(ids.slice(0, 20)));
    }
  }, [params.id]);

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <main>
      <h1>Task {data.id}</h1>
      <p>Status: <strong>{data.status}</strong></p>

      <h2>Steps</h2>
      <ol>
        {data.steps?.map((s: any, i: number) => (
          <li key={i}>{s.name} — {s.status}</li>
        ))}
      </ol>

      <h2>Tables</h2>
      {data.tables?.map((t: any) => (
        <div key={t.id} style={{ marginBottom: 12 }}>
          <h3>{t.id}: {t.title}</h3>
          <table border={1} cellPadding={4}>
            <thead>
              <tr>{t.columns.map((c: string) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {t.rows.map((r: any, idx: number) => (
                <tr key={idx}>
                  {t.columns.map((c: string) => <td key={c}>{String(r[c])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>Figures</h2>
      {data.figures?.map((f: any) => (
        <pre key={f.id} style={{ background: '#f6f6f6', padding: 8 }}>{JSON.stringify(f, null, 2)}</pre>
      ))}

      <h2>Report</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 8 }}>{data.report?.markdown}</pre>
    </main>
  );
}
