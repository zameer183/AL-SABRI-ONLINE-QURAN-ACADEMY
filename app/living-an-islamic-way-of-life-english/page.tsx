import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const guidancePoints = [
  {
    title: "Make Salah and Quran part of daily life",
    text: "Children should grow up seeing prayer, Quran recitation, and remembrance of Allah as natural parts of the day.",
  },
  {
    title: "Develop good character and manners",
    text: "Respect, honesty, kindness, and cleanliness are practical signs of Islamic living and should be taught early.",
  },
  {
    title: "Follow halal habits in speech and actions",
    text: "A Muslim child should learn how to avoid harmful behavior and choose what is pure, respectful, and beneficial.",
  },
  {
    title: "Strengthen love for Allah and the Prophet",
    text: "Stories, duas, and Islamic examples help children connect emotionally with their faith and identity.",
  },
  {
    title: "Build discipline through consistent learning",
    text: "Regular lessons, routines, and accountability help children practice Islam with confidence and clarity.",
  },
  {
    title: "Apply Islamic teachings at home and outside",
    text: "Children benefit most when they learn how Islamic values guide school life, family behavior, and friendships.",
  },
];

export default function LivingAnIslamicWayOfLifeEnglishPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="islamic-life-page">
        <section className="islamic-life-page__hero">
          <div className="islamic-life-page__hero-overlay" />
          <div className="islamic-life-page__hero-content">
            <h1>Living an Islamic Way of Life (English)</h1>
            <p>
              A clean guide for children and parents to understand how Islamic teachings shape
              daily habits, manners, worship, and character.
            </p>
          </div>
        </section>

        <section className="islamic-life-page__section">
          <div className="islamic-life-page__intro">
            <div className="islamic-life-page__copy">
              <h2>Live an Islamic Way of Life</h2>
              <p>
                This page helps children understand that Islam is not limited to reading only. It
                is a complete way of life that teaches worship, discipline, kindness, honesty,
                respect, and responsibility.
              </p>
              <p>
                Parents and students benefit from practical guidance that shows how Quran and Sunnah
                can be followed in daily routines at home, school, and in society.
              </p>
            </div>
            <div className="islamic-life-page__visual">
              <img
                src="/source/images/pexels-thirdman-8489077-scaled-r31966rn6083s6l44e2sykj3h8xe05mxvxczpea0yw.webp"
                alt="Children learning Islamic values"
              />
            </div>
          </div>
        </section>

        <section className="islamic-life-page__section">
          <div className="islamic-life-page__content-head">
            <h2>Guidance for Daily Islamic Living</h2>
            <p>
              These points are arranged clearly so children can understand and apply them with
              confidence.
            </p>
          </div>

          <div className="islamic-life-page__guidance-list">
            {guidancePoints.map((item, index) => (
              <article key={item.title} className="islamic-life-page__guidance-card">
                <div className="islamic-life-page__badge">{index + 1}</div>
                <div className="islamic-life-page__guidance-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="islamic-life-page__cta">
          <h2>Help Your Child Build a Strong Islamic Lifestyle</h2>
          <p>
            Start guided online learning that combines Quran, Islamic values, manners, and daily
            practice in a child-friendly way.
          </p>
          <a href="/contact-us">Enroll Now</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
