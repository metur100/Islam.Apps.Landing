import type { ReactNode } from 'react';

import { SITE, UI } from '../content/site.js';
import { BASE, href, LANG_NAMES, langs, withLang, type Route } from '../routes';

const SKIP = { en: 'Skip to content', de: 'Zum Inhalt springen', bs: 'Preskoči na sadržaj' };

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  const { lang } = route;
  const t = UI[lang];
  return (
    <>
      <a className="skip" href="#main">
        {SKIP[lang]}
      </a>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href={href({ kind: 'home', lang })}>
            <img src={`${BASE}assets/logo.svg`} alt="" width={28} height={28} />
            <span>{t.siteName}</span>
          </a>
          {route.kind !== 'notFound' ? (
            <nav className="lang" aria-label={t.language}>
              {langs.map((l) =>
                l === lang ? (
                  <span key={l} aria-current="true">
                    {LANG_NAMES[l]}
                  </span>
                ) : (
                  <a key={l} href={href(withLang(route, l))} hrefLang={l} lang={l}>
                    {LANG_NAMES[l]}
                  </a>
                ),
              )}
            </nav>
          ) : null}
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <p>{t.footerNote}</p>
          <nav aria-label="Footer">
            <a href={href({ kind: 'home', lang })}>{t.backHome}</a>
            <a href={href({ kind: 'privacy', lang })}>{t.privacy}</a>
            <a href={href({ kind: 'imprint', lang })}>{t.imprint}</a>
            <a href={`mailto:${SITE.email}`}>{t.nav.contact}</a>
          </nav>
          <p className="small">
            © {SITE.updated.slice(0, 4)} {SITE.owner} · {SITE.brand}
          </p>
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
