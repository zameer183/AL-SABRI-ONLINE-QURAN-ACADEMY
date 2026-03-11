import { CTASection } from "../components/CTASection";
import { TopicCard } from "../components/TopicCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const topics = [
  {
    title: "Islamic Education Part One",
    description: "Basics of Quran reading, pronunciation, and Islamic manners for young learners.",
    image: "/source/images/Noorani-Qaida-Online-For-Beginners.webp",
    href: "/islamic-education-part-one-english",
  },
  {
    title: "Islamic Education Part Two",
    description: "A stronger foundation in Islamic learning with guided lessons and practical understanding.",
    image: "/source/images/Tajweel-Ul-Quran_800x-1-r621eqxk1jgjf4nab8qol3vhe3z4o3kggpl2z92dew.webp",
    href: "/islamic-education-part-two-english",
  },
  {
    title: "Living an Islamic Way of Life",
    description: "Practical advice for building Islamic habits in daily routines and family life.",
    image: "/source/images/pexels-thirdman-8489077-scaled-r31966rn6083s6l44e2sykj3h8xe05mxvxczpea0yw.webp",
    href: "/living-an-islamic-way-of-life-english",
  },
  {
    title: "Islamic Manners",
    description: "Build character and morals through examples from the Quran and Hadith.",
    image: "/source/images/Sunnah-Foods-for-Sehri-and-Iftar-in-Ramadan-300x200.webp",
    href: "/islamic-manners-english",
  },
] as const;

const learnList = [
  "Learn Quran Online for Kids",
  "Noorani Qaida for Beginners",
  "6 Kalimas",
  "Daily Islamic Duas",
  "Islamic Manners and Morals",
  "Stories from the Quran",
] as const;

const benefits = [
  "Interactive Learning",
  "Spiritual Growth",
  "Practical Islamic Knowledge",
  "Flexible Learning",
  "Online Guidance",
] as const;

const topicList = [
  "Noorani Qaida Online",
  "Learn the 6 Kalimas",
  "Daily Islamic Duas",
  "Quran Stories for Kids",
  "Online Quran Classes for Children",
] as const;

export default function ChildrensSectionPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="children-page">
        <section className="children-page__hero">
          <div className="children-page__hero-overlay" />
          <div className="children-page__hero-content">
            <p className="children-page__eyebrow">Guided Quran Learning for Kids</p>
            <h1>Children&apos;s Islamic Section</h1>
            <p>
              Support your child&apos;s Quran learning with guided Islamic topics, structured
              lessons, and spiritual growth resources.
            </p>
          </div>
        </section>

        <section className="children-page__section">
          <div className="children-page__intro">
            <h2>Children&apos;s Section - Guide to Living an Islamic Life</h2>
            <p>
              Purpose-built resources help children understand Islamic teachings in a simple,
              engaging, and age-appropriate way.
            </p>
            <p>
              Parents and students benefit from structured lessons, duas, stories, and practical
              guidance that supports daily Islamic living.
            </p>
            <div className="children-page__highlights">
              <span>Kid-friendly lessons</span>
              <span>Guided Islamic topics</span>
              <span>Flexible online learning</span>
            </div>
          </div>

          <div className="children-topics-grid">
            {topics.map((topic) => (
              <TopicCard
                key={topic.title}
                title={topic.title}
                description={topic.description}
                image={topic.image}
                href={topic.href}
              />
            ))}
          </div>
        </section>

        <section className="children-page__tilawat">
          <div className="children-page__tilawat-inner">
            <div className="children-page__tilawat-head">
              <h2>Tilawat of Hafiz Muhammad Zafeer</h2>
              <p>
                A calm recitation section that helps children listen, reflect, and build a deeper
                connection with Quran recitation.
              </p>
            </div>
            <div className="children-page__player">
              <video
                className="children-page__video"
                controls
                preload="metadata"
                playsInline
              >
                <source src="/assets/tilawat-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="children-page__section">
          <div className="children-page__learn">
            <div className="children-page__section-head">
              <h2>What Children Will Learn</h2>
              <p>
                Clear topic coverage designed to build Quran reading habits, Islamic manners, and
                daily practice.
              </p>
            </div>
            <ul className="children-page__learn-grid">
              {learnList.map((item) => (
                <li key={item}>
                  <span className="children-page__learn-icon" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="children-page__section">
          <div className="children-page__features">
            <div className="children-page__section-head">
              <h2>Benefits of Using the Children&apos;s Section</h2>
              <p>
                A supportive learning format that balances Islamic education, spiritual growth, and
                flexibility for modern families.
              </p>
            </div>
            <div className="children-benefits-grid">
              {benefits.map((benefit) => (
                <article key={benefit} className="children-benefit-card">
                  <div className="children-benefit-card__icon" aria-hidden="true">
                    {benefit.slice(0, 1)}
                  </div>
                  <h3>{benefit}</h3>
                  <p>
                    Structured online guidance helps children learn in a calm, consistent, and
                    engaging way.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="children-page__section">
          <div className="children-topics-list">
            <div className="children-page__section-head">
              <h2>Explore Our Children&apos;s Topics</h2>
              <p>
                Browse the core subjects that help children build strong Islamic understanding from
                the basics upward.
              </p>
            </div>
            <ul>
              {topicList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <CTASection
          title="Start Your Child's Islamic Learning Journey"
          description="Enroll today and let qualified tutors guide your child through structured Quranic and Islamic education."
          href="/contact-us"
          label="Enroll Now"
        />
      </main>
      <SiteFooter />
    </>
  );
}
