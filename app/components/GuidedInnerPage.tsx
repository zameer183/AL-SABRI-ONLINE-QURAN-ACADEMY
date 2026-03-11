import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

type GuidedPoint = {
  title: string;
  text: string;
};

type GuidedInnerPageProps = {
  title: string;
  subtitle: string;
  introTitle: string;
  intro: string[];
  pointsTitle: string;
  points: GuidedPoint[];
  ctaTitle: string;
  ctaText: string;
  image: string;
};

export function GuidedInnerPage({
  title,
  subtitle,
  introTitle,
  intro,
  pointsTitle,
  points,
  ctaTitle,
  ctaText,
  image,
}: GuidedInnerPageProps) {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="guided-page">
        <section className="guided-page__hero" style={{ backgroundImage: `url("${image}")` }}>
          <div className="guided-page__hero-overlay" />
          <div className="guided-page__hero-content">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </section>

        <section className="guided-page__section">
          <div className="guided-page__intro">
            <div className="guided-page__copy">
              <h2>{introTitle}</h2>
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="guided-page__visual">
              <img src={image} alt={title} />
            </div>
          </div>
        </section>

        <section className="guided-page__section">
          <div className="guided-page__content-head">
            <h2>{pointsTitle}</h2>
          </div>
          <div className="guided-page__points">
            {points.map((point, index) => (
              <article key={point.title} className="guided-page__point-card">
                <div className="guided-page__badge">{index + 1}</div>
                <div className="guided-page__point-copy">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guided-page__cta">
          <h2>{ctaTitle}</h2>
          <p>{ctaText}</p>
          <a href="/contact-us">Enroll Now</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
