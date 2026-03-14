import { ContactCard } from "../components/ContactCard";
import { ContactForm } from "../components/ContactForm";
import { CTASection } from "../components/CTASection";
import { SocialCard } from "../components/SocialCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1GzhwXAxWC/",
    icon: "f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alsabrionlinequranacadmey?igsh=MWUxZ2EwaTk3aGV2Mw==",
    icon: "ig",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@asolearnquran?_r=1&_t=ZN-94XxIDhOsrO",
    icon: "tt",
  },
] as const;

const courses = [
  "Noorani Qaida",
  "Quran Reading",
  "Tajweed Course",
  "Quran Memorization",
  "Tafsir e Quran",
  "Children's Quran Classes",
  "Male Female Quran Teacher",
  "Custom One-to-One Classes",
] as const;

export default function ContactUsPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="contact-page">
        <section className="contact-page__hero">
          <div className="contact-page__hero-overlay" />
          <div className="contact-page__hero-content">
            <p className="contact-page__eyebrow">Get in Touch With Our Academy</p>
            <h1>Contact Us</h1>
            <p>
              Get in touch with Al Sabri Online Quran Academy for enrollment, fee details, and
              class scheduling.
            </p>
          </div>
        </section>

        <section className="contact-page__section">
          <div className="contact-page__intro">
            <h2>Let's Start Your Quran Learning</h2>
            <p>
              Contact our academy for course enrollment, fee guidance, free trial details, or help
              choosing the right Quran learning plan.
            </p>
            <div className="contact-page__highlights">
              <span>Quick WhatsApp response</span>
              <span>Flexible class timings</span>
              <span>Courses for kids and adults</span>
            </div>
          </div>

          <div className="contact-page__info-grid">
            <ContactCard
              title="Email"
              value="alsabrionlinequranacademy@gmail.com"
              href="mailto:alsabrionlinequranacademy@gmail.com"
              icon="@"
              detail="Reach us directly for enrollment questions and course guidance."
            />
            <ContactCard
              title="WhatsApp"
              value="+923413839634"
              href="https://wa.me/923413839634"
              icon="W"
              detail="Message us anytime for quick support and class scheduling."
            />
            <ContactCard
              title="Quick Call"
              value="+923413839634"
              href="tel:+923413839634"
              icon="P"
              detail="Speak with our team for a faster discussion about fee plans."
            />
          </div>

          <div className="contact-page__content-grid">
            <ContactForm courses={courses} />
            <SocialCard socialLinks={socialLinks} />
          </div>
        </section>

        <CTASection
          title="Start Learning the Quran Today"
          description="Enroll now and let our qualified tutors help you or your child begin a structured Quran learning journey."
          href="/contact-us"
          label="Enroll Now"
        />
      </main>
      <SiteFooter />
    </>
  );
}
