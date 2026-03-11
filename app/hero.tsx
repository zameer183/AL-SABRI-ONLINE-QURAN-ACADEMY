import Link from "next/link";

export function Hero() {
  return (
    <section className="custom-hero">
      <div className="custom-hero__overlay" />
      <div className="custom-hero__content">
        <p className="custom-hero__eyebrow">AL SABRI ONLINE QURAN ACADEMY</p>
        <h1 className="custom-hero__title">Best Online Quran Classes for Kids &amp; Adults</h1>
        <p className="custom-hero__text">
          Join our trusted Online Quran Academy and learn Tajweed, Hifz, and Tafseer from certified
          male &amp; female tutors. Flexible timings available across America, Australia, Europe,
          UK and Gulf Countries.
        </p>
        <div className="custom-hero__actions">
          <Link className="custom-hero__button custom-hero__button--primary" href="/contact-us">
            Enroll Now
          </Link>
          <Link className="custom-hero__button custom-hero__button--secondary" href="/our-courses">
            View Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
