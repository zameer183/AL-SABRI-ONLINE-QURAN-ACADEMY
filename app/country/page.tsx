import { CountryCard } from "../components/CountryCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const countries = [
  {
    country: "United States",
    description:
      "One-to-one online Quran classes with flexible evening and weekend schedules for US families.",
    image: "/assets/flag-united-states.svg",
    href: "/contact-us",
  },
  {
    country: "United Kingdom",
    description:
      "Qualified male and female tutors for Tajweed, Hifz, and Quran reading in UK-friendly timings.",
    image: "/assets/flag-united-kingdom.svg",
    href: "/contact-us",
  },
  {
    country: "Canada",
    description:
      "Interactive Quran learning sessions for kids and adults with structured weekly progress plans.",
    image: "/assets/flag-canada.svg",
    href: "/contact-us",
  },
  {
    country: "Australia",
    description:
      "Dedicated Quran courses with personalized tutors and convenient lesson slots across Australia.",
    image: "/assets/flag-australia.svg",
    href: "/contact-us",
  },
  {
    country: "New Zealand",
    description:
      "Live online classes focused on Quran recitation, memorization, and Islamic basics for all ages.",
    image: "/assets/flag-new-zealand.svg",
    href: "/contact-us",
  },
  {
    country: "UAE",
    description:
      "Flexible daily Quran classes for students in UAE with certified teachers and clear lesson plans.",
    image: "/assets/flag-uae.svg",
    href: "/contact-us",
  },
  {
    country: "Saudi Arabia",
    description:
      "Focused Quran programs with Tajweed and Hifz support for students across Saudi Arabia.",
    image: "/assets/flag-saudi-arabia.svg",
    href: "/contact-us",
  },
  {
    country: "Qatar",
    description:
      "Structured learning track for beginners and advanced learners with regular teacher feedback.",
    image: "/assets/flag-qatar.svg",
    href: "/contact-us",
  },
  {
    country: "Europe",
    description:
      "Cross-timezone classes available for students in European countries with reliable schedules.",
    image: "/assets/flag-europe.svg",
    href: "/contact-us",
  },
] as const;

export default function CountryPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="country-page">
        <section className="country-page__hero">
          <div className="country-page__hero-overlay" />
          <div className="country-page__hero-content">
            <h1>Countries We Serve</h1>
            <p>
              Al Sabri Online Quran Academy offers online Quran classes across multiple countries
              with flexible schedules and experienced tutors.
            </p>
          </div>
        </section>

        <section className="country-page__section">
          <div className="country-page__intro">
            <h2>Available Regions</h2>
            <p>
              Choose your region and start one-to-one Quran learning classes for kids and adults.
            </p>
          </div>

          <div className="country-grid">
            {countries.map((item) => (
              <CountryCard
                key={item.country}
                country={item.country}
                description={item.description}
                image={item.image}
                href={item.href}
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
