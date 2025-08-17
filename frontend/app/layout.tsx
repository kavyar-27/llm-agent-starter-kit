export const metadata = { title: 'LLM Agent Starter' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, ui-sans-serif, system-ui', margin: 0 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
          <nav style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
            <a href="/">New Task</a>
            <a href="/tasks">Tasks</a>
            <a href="/datasets">Datasets</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
