import type { Lang } from './routes';

// Phone screenshots shown on the app pages: src/assets/screenshots/<app>/<lang>/<nn>.jpg
const FILES = import.meta.glob('./assets/screenshots/*/*/*.{jpg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export function screenshots(appId: string, lang: Lang): string[] {
  for (const l of [lang, 'en']) {
    const prefix = `./assets/screenshots/${appId}/${l}/`;
    const urls = Object.keys(FILES)
      .filter((k) => k.startsWith(prefix))
      .sort()
      .map((k) => FILES[k]);
    if (urls.length) return urls;
  }
  return [];
}
