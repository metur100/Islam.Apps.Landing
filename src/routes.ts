import { APPS, LANG_NAMES, LANGS, OG_LOCALE, SITE, UI, APP_PRIVACY, SITE_PRIVACY, IMPRINT } from './content/site.js';
import { LISTINGS } from './content/listings.js';

export type Lang = 'en' | 'de' | 'bs';
export type AppInfo = (typeof APPS)[number];
export type Route =
  | { kind: 'home'; lang: Lang }
  | { kind: 'app'; lang: Lang; app: AppInfo }
  | { kind: 'appPrivacy'; lang: Lang; app: AppInfo }
  | { kind: 'privacy'; lang: Lang }
  | { kind: 'imprint'; lang: Lang }
  | { kind: 'notFound'; lang: Lang };

export const BASE = import.meta.env.BASE_URL; // '/Islam.Apps.Landing/'
export const langs = LANGS as Lang[];

/** Path of a route relative to the site root, always ending in '/'. */
export function routePath(route: Route): string {
  switch (route.kind) {
    case 'home':
      return `${route.lang}/`;
    case 'app':
      return `${route.lang}/${route.app.id}/`;
    case 'appPrivacy':
      return `${route.lang}/${route.app.id}/privacy/`;
    case 'privacy':
      return `${route.lang}/privacy/`;
    case 'imprint':
      return `${route.lang}/imprint/`;
    case 'notFound':
      return '404.html';
  }
}

export const href = (route: Route) => BASE + routePath(route);
export const withLang = (route: Route, lang: Lang): Route => ({ ...route, lang }) as Route;

/** Matches a path relative to the site root (e.g. "de/sira/privacy/"). */
export function matchRoute(path: string): Route {
  const parts = path.split('/').filter(Boolean);
  const lang = parts[0] as Lang;
  if (!langs.includes(lang)) return { kind: 'notFound', lang: 'en' };
  if (parts.length === 1) return { kind: 'home', lang };
  if (parts.length === 2 && parts[1] === 'privacy') return { kind: 'privacy', lang };
  if (parts.length === 2 && parts[1] === 'imprint') return { kind: 'imprint', lang };
  const app = APPS.find((a) => a.id === parts[1]);
  if (app && parts.length === 2) return { kind: 'app', lang, app };
  if (app && parts.length === 3 && parts[2] === 'privacy') return { kind: 'appPrivacy', lang, app };
  return { kind: 'notFound', lang };
}

export function allRoutes(): Route[] {
  const routes: Route[] = [];
  for (const lang of langs) {
    routes.push({ kind: 'home', lang }, { kind: 'privacy', lang }, { kind: 'imprint', lang });
    for (const app of APPS) routes.push({ kind: 'app', lang, app }, { kind: 'appPrivacy', lang, app });
  }
  return routes;
}

export const appName = (app: AppInfo, lang: Lang) => LISTINGS[app.id as keyof typeof LISTINGS][lang].title.split(':')[0];
export const listing = (app: AppInfo, lang: Lang) => LISTINGS[app.id as keyof typeof LISTINGS][lang];

export interface Head {
  title: string;
  description: string;
  ogImage: string;
  jsonLd?: object;
}

export function headFor(route: Route): Head {
  const t = UI[route.lang];
  const og = 'assets/og-image.png';
  switch (route.kind) {
    case 'home':
      return {
        title: `${t.siteName} – ${t.heroKicker}`,
        description: t.metaDescription,
        ogImage: og,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: t.siteName,
          url: SITE.baseUrl + routePath(route),
          inLanguage: route.lang,
          publisher: { '@type': 'Person', name: SITE.owner, email: SITE.email },
        },
      };
    case 'app': {
      const l = listing(route.app, route.lang);
      return {
        title: `${l.title} – ${t.siteName}`,
        description: l.short,
        ogImage: `assets/feature/${route.app.id}-${route.lang}.png`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          name: appName(route.app, route.lang),
          description: l.short,
          operatingSystem: 'Android',
          applicationCategory: route.app.category,
          inLanguage: langs,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
          image: `${SITE.baseUrl}assets/${route.app.id}.png`,
          url: SITE.baseUrl + routePath(route),
          author: { '@type': 'Person', name: SITE.owner },
        },
      };
    }
    case 'appPrivacy': {
      const name = appName(route.app, route.lang);
      return { title: `${name} – ${APP_PRIVACY[route.lang].title}`, description: `${APP_PRIVACY[route.lang].title}: ${name}`, ogImage: og };
    }
    case 'privacy':
      return { title: `${SITE_PRIVACY[route.lang].title} – ${t.siteName}`, description: SITE_PRIVACY[route.lang].title, ogImage: og };
    case 'imprint':
      return { title: `${IMPRINT[route.lang].title} – ${t.siteName}`, description: IMPRINT[route.lang].title, ogImage: og };
    case 'notFound':
      return { title: `404 – ${t.notFound}`, description: t.notFoundText, ogImage: og };
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The <head> tags of a page as an HTML string (used when prerendering). */
export function headHtml(route: Route): string {
  const h = headFor(route);
  const tags = [`<title>${esc(h.title)}</title>`, `<meta name="description" content="${esc(h.description)}">`];
  if (route.kind === 'notFound') {
    tags.push('<meta name="robots" content="noindex">');
  } else {
    const url = SITE.baseUrl + routePath(route);
    tags.push(`<link rel="canonical" href="${url}">`);
    for (const l of langs) tags.push(`<link rel="alternate" hreflang="${l}" href="${SITE.baseUrl}${routePath(withLang(route, l))}">`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE.baseUrl}${routePath(withLang(route, 'en'))}">`);
    tags.push(
      '<meta property="og:type" content="website">',
      `<meta property="og:title" content="${esc(h.title)}">`,
      `<meta property="og:description" content="${esc(h.description)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${SITE.baseUrl}${h.ogImage}">`,
      `<meta property="og:locale" content="${OG_LOCALE[route.lang]}">`,
      '<meta name="twitter:card" content="summary_large_image">',
    );
  }
  if (h.jsonLd) tags.push(`<script type="application/ld+json">${JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')}</script>`);
  return tags.join('\n    ');
}

export { LANG_NAMES };
