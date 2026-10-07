import { createRoot, hydrateRoot } from 'react-dom/client';

import { App } from './App';
import { BASE, matchRoute } from './routes';
import './styles.css';

const container = document.getElementById('root')!;
const path = location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : location.pathname;
const route = matchRoute(path);

// Pages are prerendered at build time; in the dev server there is nothing to hydrate.
if (container.firstElementChild) hydrateRoot(container, <App route={route} />);
else createRoot(container).render(<App route={route} />);
