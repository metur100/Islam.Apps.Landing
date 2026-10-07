import appStore from '../assets/badges/app-store.svg';
import playBs from '../assets/badges/google-play-bs.png';
import playDe from '../assets/badges/google-play-de.png';
import playEn from '../assets/badges/google-play-en.png';
import { SITE, UI } from '../content/site.js';
import type { AppInfo, Lang } from '../routes';

const PLAY_BADGE = { en: playEn, de: playDe, bs: playBs };
// Google Play has no Bosnian store language; Croatian is the closest one.
const PLAY_HL = { en: 'en', de: 'de', bs: 'hr' };

/**
 * Official Google Play and App Store badges. A badge links to the store only once the app is live
 * (SITE.stores); until then it is shown unchanged, not clickable, with a "Coming soon" note.
 */
export function StoreBadges({ app, lang, compact }: { app: AppInfo; lang: Lang; compact?: boolean }) {
  const t = UI[lang];
  const store = SITE.stores[app.id as keyof typeof SITE.stores];
  const badges = [
    {
      key: 'play',
      img: PLAY_BADGE[lang],
      alt: 'Google Play',
      href: store.play ? `https://play.google.com/store/apps/details?id=${app.package}&hl=${PLAY_HL[lang]}` : null,
    },
    {
      key: 'ios',
      img: appStore,
      alt: 'App Store',
      href: store.appStoreId ? `https://apps.apple.com/app/id${store.appStoreId}` : null,
    },
  ];
  return (
    <ul className={`badges${compact ? ' badges-compact' : ''}`}>
      {badges.map((b) => (
        <li key={b.key}>
          {b.href ? (
            <a href={b.href} rel="noopener" className="badge-link">
              <img src={b.img} alt={b.alt} height={48} />
            </a>
          ) : (
            <span className="badge-soon" aria-label={`${b.alt} – ${t.soon}`}>
              <img src={b.img} alt="" height={48} />
              <small>{t.soon}</small>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
