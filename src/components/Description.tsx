import type { ReactNode } from 'react';

/** Renders a Play listing description (headings in capitals, "•" bullets, numbered lists, "→" flows). */
export function Description({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let list: { type: 'ul' | 'ol'; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((item, i) => <li key={i}>{item}</li>);
    out.push(list.type === 'ul' ? <ul key={out.length} className="ticks">{items}</ul> : <ol key={out.length}>{items}</ol>);
    list = null;
  };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const letters = line.replace(/[^\p{L}]/gu, '');
    const isCaps = letters.length > 3 && letters === letters.toUpperCase() && !line.startsWith('•');
    if (line.includes('→')) {
      flush();
      out.push(<p key={out.length} className="flow">{line}</p>);
    } else if (isCaps) {
      flush();
      out.push(<h3 key={out.length} className="caps">{line}</h3>);
    } else if (line.startsWith('• ')) {
      if (list?.type !== 'ul') {
        flush();
        list = { type: 'ul', items: [] };
      }
      list.items.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (list?.type !== 'ol') {
        flush();
        list = { type: 'ol', items: [] };
      }
      list.items.push(line.replace(/^\d+\.\s+/, ''));
    } else {
      flush();
      out.push(<p key={out.length}>{line}</p>);
    }
  }
  flush();
  return <>{out}</>;
}
