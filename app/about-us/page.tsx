import { AboutFeatureCard } from "../components/AboutFeatureCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const features = [
  {
    title: "Qualified Tutors",
    text: "Male and female Quran teachers with strong Tajweed and teaching experience.",
  },
  {
    title: "Flexible Timings",
    text: "Class schedules designed for students in USA, UK, Canada, Australia and Gulf countries.",
  },
  {
    title: "One-to-One Classes",
    text: "Personalized lessons focused on your level, pace, and learning goals.",
  },
  {
    title: "Kids Friendly Method",
    text: "Age-appropriate learning approach that keeps children engaged and consistent.",
  },
  {
    title: "Structured Progress",
    text: "Regular assessment and lesson planning for reading, Tajweed, and memorization.",
  },
  {
    title: "Affordable Learning",
    text: "Quality Quran education with transparent fees and custom learning plans.",
  },
] as const;

export default function AboutUsPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="about-page">
        <section className="about-page__hero">
          <div className="about-page__hero-overlay" />
          <div className="about-page__hero-content">
            <h1>About Us</h1>
            <p>
              Al Sabri Online Quran Academy is dedicated to providing quality online Quran
              education for kids and adults worldwide.
            </p>
          </div>
        </section>

        <section className="about-page__section">
          <div className="about-page__intro">
            <h2>Who We Are</h2>
            <p>
              We help students learn Noorani Qaida, Quran Reading, Tajweed, Tafsir, and Hifz
              through one-to-one online sessions. Our mission is to make Quran learning accessible,
              structured, and effective for every age group.
            </p>
          </div>

          <div className="about-page__columns">
            <article className="about-page__panel">
              <h3>Our Mission</h3>
              <p>
                To deliver authentic Quran education with consistency, clarity, and character
                building through qualified teachers and flexible online classes.
              </p>
            </article>
            <article className="about-page__panel">
              <h3>Our Vision</h3>
              <p>
                To become a trusted global Quran academy where families can confidently start and
                continue their Quran learning journey from home.
              </p>
            </article>
          </div>
        </section>

        <section className="about-page__section">
          <div className="about-page__intro">
            <h2>Why Choose Us</h2>
            <p>Professional tutors, practical lesson plans, and supportive one-to-one learning.</p>
          </div>
          <div className="about-features-grid">
            {features.map((item) => (
              <AboutFeatureCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </section>

        <section className="about-page__cta">
          <h2>Start Learning with Al Sabri Online Quran Academy</h2>
          <p>Book your trial class today and begin your Quran learning with expert tutors.</p>
          <a href="/contact-us">Enroll Now</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
