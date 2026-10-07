import { useState } from 'react';

/** Opens the system share sheet where available, otherwise copies the link. */
export function ShareButton({ url, label, doneLabel }: { url: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  const onClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url, title: document.title });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard unavailable – nothing to do.
    }
  };
  return (
    <button className="btn btn-outline" type="button" onClick={onClick} aria-live="polite">
      {done ? doneLabel : label}
    </button>
  );
}
