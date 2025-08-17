'use client';

import useSWR from 'swr';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function DatasetsPage() {
  const { data, isLoading } = useSWR(`${API_BASE}/api/datasets`, fetcher);

  return (
    <main>
      <h1>Datasets</h1>
      {isLoading && <p>Loading...</p>}
      <ul>
        {data?.map((d: any) => (
          <li key={d.key}>{d.key}: {d.rows} rows</li>
        ))}
      </ul>
    </main>
  );
}
