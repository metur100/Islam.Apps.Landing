import { ShareButton } from '../components/ShareButton';
import { APPS, SITE, UI } from '../content/site.js';
import { appName, BASE, href, type Lang } from '../routes';

export function Home({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <p className="kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p className="lead">{t.heroText}</p>
          <a className="btn btn-gold" href="#apps">
            {t.heroCta}
          </a>
          <div className="hero-icons" aria-hidden="true">
            {APPS.map((a) => (
              <img key={a.id} src={`${BASE}assets/${a.id}.png`} alt="" width={72} height={72} />
            ))}
          </div>
        </div>
      </section>

      <section id="apps" className="section">
        <div className="wrap">
          <h2>{t.appsTitle}</h2>
          <p className="section-lead">{t.appsText}</p>
          <div className="app-grid">
            {APPS.map((app) => {
              const name = appName(app, lang);
              const link = href({ kind: 'app', lang, app });
              return (
                <article key={app.id} className="app-card">
                  <img className="app-icon" src={`${BASE}assets/${app.id}.png`} alt="" width={88} height={88} />
                  <div>
                    <p className="chip">{app.audience[lang]}</p>
                    <h3>
                      <a href={link}>{name}</a>
                    </h3>
                    <p>{app.tagline[lang]}</p>
                    <a className="link-more" href={link} aria-label={`${t.more}: ${name}`}>
                      {t.more} →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="principles" className="section section-alt">
        <div className="wrap">
          <h2>{t.principlesTitle}</h2>
          <ul className="principles">
            {t.principles.map(([title, text], i) => (
              <li key={title}>
                <span className="num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2>{t.parentsTitle}</h2>
            <p>{t.parentsText}</p>
          </div>
          <div className="share-box">
            <h2>{t.shareTitle}</h2>
            <p>{t.shareText}</p>
            <ShareButton url={`${SITE.baseUrl}${lang}/`} label={t.copyLink} doneLabel={t.copied} />
          </div>
        </div>
      </section>

      <section id="faq" className="section section-alt">
        <div className="wrap narrow">
          <h2>{t.faqTitle}</h2>
          <div className="faq">
            {t.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="wrap narrow center">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <a className="btn btn-gold" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
