import type { ReactNode } from 'react';

import { APPS, IMPRINT, SITE, UI } from '../content/site.js';
import { appName, BASE, href, LANG_NAMES, langs, withLang, type Route } from '../routes';

const SKIP = { en: 'Skip to content', de: 'Zum Inhalt springen', bs: 'Preskoči na sadržaj' };

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  const { lang } = route;
  const t = UI[lang];
  const home = href({ kind: 'home', lang });
  return (
    <>
      <a className="skip" href="#main">
        {SKIP[lang]}
      </a>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href={home}>
            <img src={`${BASE}assets/logo.svg`} alt="" width={32} height={32} />
            <span>{t.siteName}</span>
          </a>
          <nav className="mainnav" aria-label={t.siteName}>
            <a href={`${home}#apps`}>{t.nav.apps}</a>
            <a href={`${home}#principles`}>{t.nav.principles}</a>
            <a href={`${home}#faq`}>{t.nav.faq}</a>
            <a href={`${home}#contact`}>{t.nav.contact}</a>
          </nav>
          {route.kind !== 'notFound' ? (
            <nav className="lang" aria-label={t.language}>
              {langs.map((l) =>
                l === lang ? (
                  <span key={l} aria-current="true" title={LANG_NAMES[l]}>
                    {l.toUpperCase()}
                  </span>
                ) : (
                  <a key={l} href={href(withLang(route, l))} hrefLang={l} lang={l} title={LANG_NAMES[l]} aria-label={LANG_NAMES[l]}>
                    {l.toUpperCase()}
                  </a>
                ),
              )}
            </nav>
          ) : null}
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <a className="brand" href={home}>
              <img src={`${BASE}assets/logo.svg`} alt="" width={32} height={32} />
              <span>{t.siteName}</span>
            </a>
            <p>{t.footerNote}</p>
            <p className="small">{t.storeNote}</p>
          </div>
          <nav aria-label={t.footerApps}>
            <h2>{t.footerApps}</h2>
            <ul>
              {APPS.map((a) => (
                <li key={a.id}>
                  <a href={href({ kind: 'app', lang, app: a })}>{appName(a, lang)}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.footerLegal}>
            <h2>{t.footerLegal}</h2>
            <ul>
              <li>
                <a href={href({ kind: 'privacy', lang })}>{t.privacy}</a>
              </li>
              <li>
                <a href={href({ kind: 'imprint', lang })}>{IMPRINT[lang].title}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{t.nav.contact}</a>
              </li>
            </ul>
          </nav>
          <nav aria-label={t.language}>
            <h2>{t.language}</h2>
            <ul>
              {langs.map((l) => (
                <li key={l}>
                  <a href={href(withLang(route.kind === 'notFound' ? { kind: 'home', lang } : route, l))} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>
                    {LANG_NAMES[l]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <p>
            © {SITE.updated.slice(0, 4)} {SITE.owner} · {SITE.brand}
          </p>
          <p className="small">Google Play and the Google Play logo are trademarks of Google LLC. App Store is a service mark of Apple Inc.</p>
        </div>
      </footer>
    </>
  );
}

/** Postal and email contact of the person responsible (privacy policies and imprint). */
export function Controller({ lang }: { lang: Route['lang'] }) {
  const country = { en: 'Germany', de: 'Deutschland', bs: 'Njemačka' }[lang];
  return (
    <address>
      {SITE.owner}
      <br />
      {SITE.brand}
      <br />
      {SITE.address ?? SITE.city}
      <br />
      {country}
      <br />
      {lang === 'de' ? 'E-Mail' : 'Email'}: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    </address>
  );
}
