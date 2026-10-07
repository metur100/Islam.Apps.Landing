import type { CSSProperties } from 'react';

import { Icon, type IconName } from '../components/Icons';
import { Phone } from '../components/Phone';
import { ShareButton } from '../components/ShareButton';
import { StoreBadges } from '../components/StoreBadges';
import { APPS, SITE, UI } from '../content/site.js';
import { appName, BASE, href, type Lang } from '../routes';
import { screenshots } from '../screenshots';

const PRINCIPLE_ICONS: IconName[] = ['gift', 'shield', 'offline', 'book', 'eye', 'globe'];

export function Home({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const heroShots = ['story-of-the-prophets', 'islam-quest', 'sira'].map((id) => screenshots(id, lang)[0]);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroText}</p>
            <div className="actions">
              <a className="btn btn-gold" href="#apps">
                {t.heroCta}
                <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost" href="#principles">
                {t.heroCta2}
              </a>
            </div>
            <ul className="trust">
              {t.trust.map((x) => (
                <li key={x}>
                  <Icon name="check" size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <Phone src={heroShots[0]} alt="" className="phone-left" eager />
            <Phone src={heroShots[1]} alt="" className="phone-center" eager />
            <Phone src={heroShots[2]} alt="" className="phone-right" eager />
          </div>
        </div>
      </section>

      <section id="apps" className="section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow eyebrow-dark">{t.appsKicker}</p>
            <h2>{t.appsTitle}</h2>
            <p>{t.appsText}</p>
          </header>
          <div className="showcase">
            {APPS.map((app, i) => {
              const name = appName(app, lang);
              const link = href({ kind: 'app', lang, app });
              const shots = screenshots(app.id, lang);
              return (
                <article key={app.id} className={`show-row${i % 2 ? ' show-row-flip' : ''}`} style={{ '--accent': app.accent } as CSSProperties}>
                  <div className="show-copy">
                    <div className="show-title">
                      <img src={`${BASE}assets/${app.id}.png`} alt="" width={72} height={72} />
                      <div>
                        <span className="chip">{app.audience[lang]}</span>
                        <h3>
                          <a href={link}>{name}</a>
                        </h3>
                      </div>
                    </div>
                    <p className="show-tagline">{app.tagline[lang]}</p>
                    <ul className="ticks">
                      {app.highlights[lang].map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <StoreBadges app={app} lang={lang} compact />
                    <a className="link-arrow" href={link}>
                      {t.moreAbout}
                      <Icon name="arrow" size={18} />
                    </a>
                  </div>
                  <a className="show-visual" href={link} tabIndex={-1} aria-hidden="true">
                    <Phone src={shots[1]} alt="" className="phone-back" eager />
                    <Phone src={shots[0]} alt="" className="phone-front" eager />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="principles" className="section section-tint">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow eyebrow-dark">{t.principlesKicker}</p>
            <h2>{t.principlesTitle}</h2>
          </header>
          <ul className="card-grid">
            {t.principles.map(([title, text], i) => (
              <li key={title} className="card">
                <span className="card-icon">
                  <Icon name={PRINCIPLE_ICONS[i]} size={24} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow eyebrow-dark">{t.parentsKicker}</p>
            <h2>{t.parentsTitle}</h2>
            <p className="body-lg">{t.parentsText}</p>
          </div>
          <aside className="share-card">
            <span className="card-icon">
              <Icon name="share" size={24} />
            </span>
            <h3>{t.shareTitle}</h3>
            <p>{t.shareText}</p>
            <ShareButton url={`${SITE.baseUrl}${lang}/`} label={t.copyLink} doneLabel={t.copied} />
          </aside>
        </div>
      </section>

      <section id="faq" className="section section-tint">
        <div className="wrap faq-grid">
          <header className="section-head section-head-left">
            <p className="eyebrow eyebrow-dark">FAQ</p>
            <h2>{t.faqTitle}</h2>
          </header>
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
        <div className="wrap">
          <div className="cta-band">
            <div>
              <p className="eyebrow">{t.contactKicker}</p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
            </div>
            <a className="btn btn-gold" href={`mailto:${SITE.email}`}>
              <Icon name="mail" size={18} />
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
