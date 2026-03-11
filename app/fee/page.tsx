import { PricingCard } from "../components/PricingCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

type FeePlan = {
  plan: string;
  price: string;
  sessions: string;
  details: string;
  href: string;
  badge: string;
  featured?: boolean;
  features: string[];
};

const plans: FeePlan[] = [
  {
    plan: "Starter Plan",
    price: "$35 / month",
    sessions: "2 Classes / Week",
    details: "Perfect for beginners starting Noorani Qaida and basic Quran reading.",
    href: "/contact-us",
    badge: "Best for Beginners",
    features: ["One-to-one live classes", "Beginner-friendly pace", "Flexible weekly timing"],
  },
  {
    plan: "Standard Plan",
    price: "$50 / month",
    sessions: "3 Classes / Week",
    details: "Balanced plan for Tajweed improvement and regular Quran recitation practice.",
    href: "/contact-us",
    badge: "Popular",
    featured: true,
    features: ["Tajweed improvement focus", "Consistent weekly routine", "Progress-based guidance"],
  },
  {
    plan: "Advanced Plan",
    price: "$65 / month",
    sessions: "4 Classes / Week",
    details: "Best for students focusing on fluency, Tafsir basics, and consistent progress.",
    href: "/contact-us",
    badge: "Advanced Track",
    features: ["Stronger reading fluency", "Higher weekly frequency", "Structured lesson progression"],
  },
  {
    plan: "Hifz Plan",
    price: "$80 / month",
    sessions: "5 Classes / Week",
    details: "Structured memorization schedule with revision support and weekly tracking.",
    href: "/contact-us",
    badge: "Memorization Focus",
    features: ["Daily-style momentum", "Revision support", "Weekly memorization tracking"],
  },
  {
    plan: "Kids Plan",
    price: "$45 / month",
    sessions: "3 Classes / Week",
    details: "Child-friendly Quran learning approach with engaging and age-appropriate lessons.",
    href: "/contact-us",
    badge: "For Children",
    features: ["Child-friendly teaching", "Interactive learning style", "Comfortable lesson pace"],
  },
  {
    plan: "Custom One-to-One",
    price: "Flexible",
    sessions: "As per schedule",
    details: "Personalized class timings for USA, UK, Canada, Australia, and Gulf countries.",
    href: "/contact-us",
    badge: "Custom Schedule",
    features: ["Timings by availability", "Personal learning goals", "Country-specific planning"],
  },
];

export default function FeePage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="fee-page">
        <section className="fee-page__hero">
          <div className="fee-page__hero-overlay" />
          <div className="fee-page__hero-content">
            <p className="fee-page__eyebrow">Affordable Online Quran Packages</p>
            <h1>Fee Plans</h1>
            <p>
              Choose a plan that matches your learning goals. Flexible packages available for kids,
              adults, and one-to-one Quran classes.
            </p>
          </div>
        </section>

        <section className="fee-page__section">
          <div className="fee-page__intro">
            <h2>Affordable Quran Learning Packages</h2>
            <p>
              Transparent pricing with flexible schedules. Contact us for country-specific and
              custom class plans.
            </p>
            <div className="fee-page__highlights">
              <span>One-to-one live sessions</span>
              <span>Qualified Quran tutors</span>
              <span>Flexible timings worldwide</span>
            </div>
          </div>

          <div className="fee-grid">
            {plans.map((item) => (
              <PricingCard
                key={item.plan}
                plan={item.plan}
                price={item.price}
                sessions={item.sessions}
                details={item.details}
                href={item.href}
                badge={item.badge}
                featured={item.featured}
                features={item.features}
              />
            ))}
          </div>
        </section>

        <section className="fee-page__note">
          <p>
            Note: Pricing may vary based on country, class timing, and custom one-to-one learning
            requirements. Contact us for a personalized package.
          </p>
        </section>

        <section className="fee-page__cta">
          <h2>Start Your Quran Learning Journey Today</h2>
          <p>Choose your suitable plan and enroll with our qualified Quran tutors.</p>
          <a href="/contact-us">Enroll Now</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
