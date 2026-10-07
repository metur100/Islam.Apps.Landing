# Islamic Learning Apps – website

Landing page for four free Islamic learning apps by Certi Development:
[Islam Quest](https://github.com/metur100/Islam.Quest), [Story of the Prophets](https://github.com/metur100/Story.Of.The.Prophets),
[Knowledge RPG](https://github.com/metur100/Knowledge.RPG) and [Sira](https://github.com/metur100/Sira).

**Live:** https://metur100.github.io/Islam.Apps.Landing/

- React + Vite + TypeScript; every page is prerendered to static HTML (indexable, works without JavaScript)
- English, German and Bosnian (`/en/`, `/de/`, `/bs/`), with `hreflang`, sitemap and structured data
- One page per app, the privacy policy of each app, the website privacy policy (Datenschutzerklärung) and the imprint (Impressum)
- No cookies, no analytics, no external fonts or scripts

## Pages

| Path | Content |
| --- | --- |
| `/<lang>/` | Overview of all apps, principles, FAQ, contact |
| `/<lang>/<app>/` | App page with screenshots, description and facts |
| `/<lang>/<app>/privacy/` | App privacy policy – **this is the URL for Google Play** |
| `/<lang>/privacy/` | Website privacy policy |
| `/<lang>/imprint/` | Imprint |

`<app>` is one of `islam-quest`, `story-of-the-prophets`, `knowledge-rpg`, `sira`.

## Editing content

All texts live in `src/content/`:

- `site.js` – contact details, page texts, app facts, privacy policies and imprint
- `listings.js` – the Google Play store texts (title, short and full description) – also used on the app pages

Store badges: in `SITE.stores` (`site.js`) set `play: true` once an app is live on Google Play and `appStoreId` (the number from `apps.apple.com/app/id<number>`) once it is live on the App Store. Until then the official badges are shown with a “Coming soon” note.
Add the postal address for the imprint in `SITE.address`.

Screenshots for the app pages go to `src/assets/screenshots/<app>/<lang>/NN.jpg`.

## Development

```bash
npm install
npm run dev        # dev server
npm run typecheck
npm run build      # client build + SSR build + prerender into dist/
npm run preview    # serve dist/ at http://localhost:4173/Islam.Apps.Landing/
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: typecheck, build and deploy `dist/` to GitHub Pages
(Settings → Pages → Source: GitHub Actions).
