import type { CSSProperties } from 'react';

import { Description } from '../components/Description';
import { Icon } from '../components/Icons';
import { Phone } from '../components/Phone';
import { StoreBadges } from '../components/StoreBadges';
import { APPS, UI } from '../content/site.js';
import { appName, BASE, href, listing, type AppInfo, type Lang } from '../routes';
import { screenshots } from '../screenshots';

export function AppPage({ app, lang }: { app: AppInfo; lang: Lang }) {
  const t = UI[lang];
  const l = listing(app, lang);
  const name = appName(app, lang);
  const shots = screenshots(app.id, lang);
  const facts: [string, string][] = [
    [t.forWhom, app.audience[lang]],
    [t.price, t.priceValue],
    [t.internet, 'network' in app ? t.internetOptional : t.internetOffline],
    [t.languages, t.languagesValue],
    [t.platform, t.platformValue],
  ];
  return (
    <div style={{ '--accent': app.accent } as CSSProperties}>
      <section className="hero hero-app">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="app-id">
              <img src={`${BASE}assets/${app.id}.png`} alt="" width={96} height={96} />
              <span className="chip chip-light">{app.audience[lang]}</span>
            </div>
            <h1>{name}</h1>
            <p className="lead">{l.short}</p>
            <ul className="trust">
              {t.trust.map((x) => (
                <li key={x}>
                  <Icon name="check" size={16} />
                  {x}
                </li>
              ))}
            </ul>
            <StoreBadges app={app} lang={lang} />
          </div>
          <div className="hero-visual hero-visual-two" aria-hidden="true">
            <Phone src={shots[1]} alt="" className="phone-left" eager />
            <Phone src={shots[0]} alt="" className="phone-center" eager />
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <ul className="highlight-grid">
            {app.highlights[lang].map((h, i) => (
              <li key={h} className="card">
                <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{h}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {shots.length ? (
        <section className="section section-tint">
          <div className="wrap">
            <header className="section-head section-head-left">
              <h2>{t.screenshots}</h2>
            </header>
            <div className="gallery" tabIndex={0} role="region" aria-label={t.screenshots}>
              {shots.map((src, i) => (
                <Phone key={src} src={src} alt={`${name} – ${t.screenshots} ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="wrap app-layout">
          <article className="prose">
            <Description text={l.full} />
          </article>
          <aside className="side">
            <div className="facts-card">
              <h2>{t.atAGlance}</h2>
              <dl>
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="download-card">
              <h2>{t.download}</h2>
              <StoreBadges app={app} lang={lang} compact />
            </div>
            <div className="privacy-card">
              <span className="card-icon">
                <Icon name="shield" size={22} />
              </span>
              <h2>{t.privacyBoxTitle}</h2>
              <p>{t.privacyBoxText}</p>
              <a className="link-arrow" href={href({ kind: 'appPrivacy', lang, app })}>
                {t.appPrivacy}
                <Icon name="arrow" size={16} />
              </a>
            </div>
            <a className="source-link" href={`https://github.com/metur100/${app.repo}`} rel="noopener">
              <Icon name="github" size={18} />
              {t.sourceCode}
            </a>
          </aside>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <header className="section-head section-head-left">
            <h2>{t.otherApps}</h2>
          </header>
          <div className="mini-grid">
            {APPS.filter((a) => a.id !== app.id).map((a) => (
              <a key={a.id} className="mini-card" href={href({ kind: 'app', lang, app: a })} style={{ '--accent': a.accent } as CSSProperties}>
                <img src={`${BASE}assets/${a.id}.png`} alt="" width={56} height={56} />
                <span>
                  <strong>{appName(a, lang)}</strong>
                  <small>{a.audience[lang]}</small>
                </span>
                <Icon name="arrow" size={18} className="mini-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
