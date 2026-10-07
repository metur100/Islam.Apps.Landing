/**
 * Prerenders every route into static HTML in dist/ (after `vite build` and the SSR build), so each
 * page is indexable by search engines and works without JavaScript. Also writes the language
 * chooser at the root, 404.html, sitemap.xml and robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { LANG_NAMES, LANGS, SITE, UI } from '../src/content/site.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr');

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const { render, allRoutes, routePath } = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href);

function write(rel, content) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function pageHtml(route) {
  const { html, head, lang } = render(route);
  return template.replace('<!--app-lang-->', lang).replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

const routes = allRoutes();
for (const route of routes) {
  const rel = routePath(route);
  write(path.join(rel, 'index.html'), pageHtml(route));
}
write('404.html', pageHtml({ kind: 'notFound', lang: 'en' }));

// Language chooser at the root: redirects to the browser language (Croatian/Serbian → Bosnian).
const base = new URL(SITE.baseUrl).pathname;
write(
  'index.html',
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${UI.en.siteName}</title>
<meta name="description" content="${UI.en.metaDescription}">
<link rel="canonical" href="${SITE.baseUrl}en/">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE.baseUrl}${l}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE.baseUrl}">
<link rel="icon" href="${base}assets/favicon.png">
<script>
  (function () {
    var langs = ${JSON.stringify(LANGS)}, prefs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).slice(0, 2).toLowerCase();
      if (p === 'hr' || p === 'sr') p = 'bs';
      if (langs.indexOf(p) !== -1) { location.replace('${base}' + p + '/' + location.hash); return; }
    }
    location.replace('${base}en/' + location.hash);
  })();
</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#14173A;color:#fff;font-family:system-ui,sans-serif;text-align:center}a{color:#FFD67A;margin:0 10px;font-weight:700}</style>
</head>
<body>
<main>
<h1>${UI.en.siteName}</h1>
<p>${LANGS.map((l) => `<a href="${base}${l}/" hreflang="${l}" lang="${l}">${LANG_NAMES[l]}</a>`).join('')}</p>
</main>
</body>
</html>
`,
);

// Sitemap with language alternates.
const urls = routes.map((route) => {
  const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE.baseUrl}${routePath({ ...route, lang: l })}"/>`).join('\n');
  return `  <url>\n    <loc>${SITE.baseUrl}${routePath(route)}</loc>\n    <lastmod>${SITE.updated}</lastmod>\n${alternates}\n  </url>`;
});
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.baseUrl}sitemap.xml\n`);
write('.nojekyll', '');

fs.rmSync(SSR, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + root, 404, sitemap.xml and robots.txt into dist/`);
