import { Layout } from './components/Layout';
import { UI } from './content/site.js';
import { AppPage } from './pages/AppPage';
import { Home } from './pages/Home';
import { AppPrivacy, Imprint, SitePrivacy } from './pages/Legal';
import { href, langs, type Route } from './routes';

function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow center">
        {langs.map((l) => (
          <div key={l} lang={l}>
            <h1>{UI[l].notFound}</h1>
            <p>
              <a href={href({ kind: 'home', lang: l })}>{UI[l].notFoundText}</a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function App({ route }: { route: Route }) {
  let page;
  switch (route.kind) {
    case 'home':
      page = <Home lang={route.lang} />;
      break;
    case 'app':
      page = <AppPage app={route.app} lang={route.lang} />;
      break;
    case 'appPrivacy':
      page = <AppPrivacy app={route.app} lang={route.lang} />;
      break;
    case 'privacy':
      page = <SitePrivacy lang={route.lang} />;
      break;
    case 'imprint':
      page = <Imprint lang={route.lang} />;
      break;
    default:
      page = <NotFound />;
  }
  return <Layout route={route}>{page}</Layout>;
}
