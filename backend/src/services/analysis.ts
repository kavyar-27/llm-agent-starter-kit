import crypto from 'crypto';

type CreateArgs = {
  dataset: 'titanic' | 'wine_red' | 'wine_white';
  template?: string;
  prompt?: string;
};

// In-memory stub store:
const store = new Map<string, any>();

export async function createStubTask(args: CreateArgs) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const task = {
    id,
    dataset: args.dataset,
    template: args.template ?? 'default',
    prompt: args.prompt ?? '',
    status: 'Done',
    createdAt: now,
    updatedAt: now,
    steps: [
      { name: 'Queued', status: 'Done' },
      { name: 'Running', status: 'Done' },
      { name: 'Synthesizing', status: 'Done' }
    ],
    tables: [
      { id: 'T1', title: 'Sample Table', columns: ['label','value'], rows: [{ label:'example', value: 1 }] }
    ],
    figures: [
      { id: 'F1', title: 'Sample Figure', type: 'bar', data: [{ x: 'A', y: 1 }, { x:'B', y:2 }] }
    ],
    report: {
      markdown: `# Sample Report
An example report for **${args.dataset}** (template: ${args.template ?? 'default'}).
Key finding: placeholder value **1** (see [T1]).

## References
- [T1] Sample Table
- [F1] Sample Figure
`
    }
  };
  store.set(id, task);
  return task;
}

export async function getStubTask(id: string) {
  return store.get(id);
}
