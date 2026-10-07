import { Description } from '../components/Description';
import { APPS, SITE, UI } from '../content/site.js';
import { appName, BASE, href, listing, type AppInfo, type Lang } from '../routes';
import { screenshots } from '../screenshots';

function PlayButton({ app, lang }: { app: AppInfo; lang: Lang }) {
  const t = UI[lang];
  const icon = <img src={`${BASE}assets/google-play.svg`} alt="" width={22} height={22} />;
  const live = SITE.live[app.id as keyof typeof SITE.live];
  if (!live) {
    return (
      <span className="btn btn-play is-soon" aria-disabled="true">
        {icon}
        <span>{t.comingSoon}</span>
      </span>
    );
  }
  // Google Play has no Bosnian store language; Croatian is the closest one.
  const hl = lang === 'bs' ? 'hr' : lang;
  return (
    <a className="btn btn-play" href={`https://play.google.com/store/apps/details?id=${app.package}&hl=${hl}`} rel="noopener">
      {icon}
      <span>{t.getOnPlay}</span>
    </a>
  );
}

export function AppPage({ app, lang }: { app: AppInfo; lang: Lang }) {
  const t = UI[lang];
  const l = listing(app, lang);
  const name = appName(app, lang);
  const shots = screenshots(app.id, lang);
  const facts: [string, string][] = [
    [t.forWhom, app.audience[lang]],
    [t.languages, t.languagesValue],
    [t.price, t.priceValue],
    [t.internet, 'network' in app ? t.internetOptional : t.internetOffline],
    [t.platform, t.platformValue],
  ];
  return (
    <>
      <section className="hero hero-app">
        <div className="wrap app-hero">
          <img className="app-icon-lg" src={`${BASE}assets/${app.id}.png`} alt="" width={128} height={128} />
          <div>
            <p className="kicker">
              {app.audience[lang]} · {t.heroKicker}
            </p>
            <h1>{name}</h1>
            <p className="lead">{l.short}</p>
            <PlayButton app={app} lang={lang} />
          </div>
        </div>
      </section>

      {shots.length ? (
        <section className="section section-alt">
          <div className="wrap">
            <h2>{t.screenshots}</h2>
            <div className="gallery" tabIndex={0} role="region" aria-label={t.screenshots}>
              {shots.map((src, i) => (
                <img key={src} src={src} alt={`${name} – ${t.screenshots} ${i + 1}`} loading="lazy" width={270} height={480} />
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
            <dl className="facts">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="privacy-box">
              <h2>{t.privacyBoxTitle}</h2>
              <p>{t.privacyBoxText}</p>
              <a href={href({ kind: 'appPrivacy', lang, app })}>{t.appPrivacy} →</a>
            </div>
            <p className="small">
              <a href={`https://github.com/metur100/${app.repo}`} rel="noopener">
                {t.sourceCode} (GitHub)
              </a>
            </p>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2>{t.otherApps}</h2>
          <div className="mini-grid">
            {APPS.filter((a) => a.id !== app.id).map((a) => (
              <a key={a.id} className="mini-card" href={href({ kind: 'app', lang, app: a })}>
                <img src={`${BASE}assets/${a.id}.png`} alt="" width={48} height={48} />
                <span>
                  <strong>{appName(a, lang)}</strong>
                  <small>{a.audience[lang]}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
