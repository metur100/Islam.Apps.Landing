import { Controller } from '../components/Layout';
import { APP_PRIVACY, APPS, IMPRINT, SITE, SITE_PRIVACY } from '../content/site.js';
import { appName, href, type AppInfo, type Lang } from '../routes';

/** Static, authored legal text that contains links. */
const Html = ({ html }: { html: string }) => <p dangerouslySetInnerHTML={{ __html: html }} />;

export function AppPrivacy({ app, lang }: { app: AppInfo; lang: Lang }) {
  const t = APP_PRIVACY[lang];
  const name = appName(app, lang);
  const reminders = 'reminders' in app && app.reminders;
  return (
    <section className="section">
      <div className="wrap narrow prose legal">
        <p className="crumbs">
          <a href={href({ kind: 'app', lang, app })}>{name}</a>
        </p>
        <h1>
          {name} – {t.title}
        </h1>
        <p className="muted">
          {t.updated}: {SITE.updated}
        </p>
        <p>{t.intro(name)}</p>
        <h2>{t.h1}</h2>
        <p>{t.summary}</p>
        <h2>{t.h2}</h2>
        <p>{t.stored(app.stored[lang])}</p>
        <h2>{t.h3}</h2>
        <p>{('network' in app && app.network?.[lang]) || t.offline}</p>
        {'links' in app && app.links ? <p>{t.links}</p> : null}
        {reminders ? (
          <>
            <h2>{t.h4}</h2>
            <p>{t.reminders}</p>
          </>
        ) : null}
        <h2>{t.h7}</h2>
        <p>{t.permissions(reminders)}</p>
        {'children' in app && app.children ? (
          <>
            <h2>{t.h5}</h2>
            <p>{t.children}</p>
          </>
        ) : null}
        <h2>{t.h6}</h2>
        <p>{t.play}</p>
        <h2>{t.h8}</h2>
        <p>{t.changes}</p>
        <h2>{t.h9}</h2>
        <p>{t.contact}</p>
        <Controller lang={lang} />
      </div>
    </section>
  );
}

export function SitePrivacy({ lang }: { lang: Lang }) {
  const d = SITE_PRIVACY[lang];
  return (
    <section className="section">
      <div className="wrap narrow prose legal">
        <h1>{d.title}</h1>
        <p className="muted">
          {APP_PRIVACY[lang].updated}: {SITE.updated}
        </p>
        {(d.sections as [string, string[]][]).map(([heading, paragraphs]) => (
          <div key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((p) =>
              p === '__CONTROLLER__' ? (
                <Controller key={p} lang={lang} />
              ) : p === '__APP_LINKS__' ? (
                <ul key={p}>
                  {APPS.map((a) => (
                    <li key={a.id}>
                      <a href={href({ kind: 'appPrivacy', lang, app: a })}>{appName(a, lang)}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Html key={p} html={p} />
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Imprint({ lang }: { lang: Lang }) {
  const d = IMPRINT[lang];
  return (
    <section className="section">
      <div className="wrap narrow prose legal">
        <h1>{d.title}</h1>
        <h2>{d.provider}</h2>
        <Controller lang={lang} />
        <h2>{d.contact}</h2>
        <p>
          {lang === 'de' ? 'E-Mail' : 'Email'}: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <h2>{d.responsible}</h2>
        <p>
          {SITE.owner}, {SITE.address ?? SITE.city}
        </p>
        <h2>{d.disclaimerTitle}</h2>
        <p>{d.disclaimer}</p>
        <h2>{d.disputeTitle}</h2>
        <p>{d.dispute}</p>
      </div>
    </section>
  );
}
