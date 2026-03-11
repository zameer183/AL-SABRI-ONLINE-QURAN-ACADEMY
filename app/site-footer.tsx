import Image from "next/image";
import Link from "next/link";
import { getCourses } from "../cms";

const resources = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-courses", label: "Courses" },
  { href: "/fee", label: "Pricing" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const socialLinks = [
  {
    href: "https://www.facebook.com/share/1GzhwXAxWC/",
    label: "Facebook",
    className: "site-footer__social-link--facebook",
    icon: <i aria-hidden="true" className="fab fa-facebook-f" />,
  },
  {
    href: "https://www.instagram.com/alsabrionlinequranacadmey?igsh=MWUxZ2EwaTk3aGV2Mw==",
    label: "Instagram",
    className: "site-footer__social-link--instagram",
    icon: <i aria-hidden="true" className="fab fa-instagram" />,
  },
  {
    href: "https://www.tiktok.com/@asolearnquran?_r=1&_t=ZN-94XxIDhOsrO",
    label: "TikTok",
    className: "site-footer__social-link--tiktok",
    icon: (
      <svg className="custom-social-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.11v13.09a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 2.89-2.89c.29 0 .57.04.84.13V9.17a6 6 0 0 0-.84-.06A6 6 0 1 0 15.82 15V8.33a7.9 7.9 0 0 0 4.63 1.49V6.69a4.84 4.84 0 0 1-.86 0Z" />
      </svg>
    ),
  },
] as const;

export async function SiteFooter() {
  const courses = (await getCourses()).slice(0, 5);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo" aria-label="Al Sabri Online Quran Academy">
            <Image
              src="/assets/al-sabri-logo.jpeg"
              alt="Al Sabri Online Quran Academy"
              width={348}
              height={321}
            />
          </Link>
          <p className="site-footer__eyebrow">Online Quran Academy</p>
          <p>
            Al Sabri Online Quran Academy helps children and adults learn Quran online with
            structured one-to-one classes, qualified tutors, and flexible timings worldwide.
          </p>
        </div>

        <div className="site-footer__column">
          <h3>Our Courses</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.slug}>
                <Link href={`/${course.slug}`}>{course.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Resources</h3>
          <ul>
            {resources.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Contact Us</h3>
          <ul className="site-footer__contact">
            <li>
              <a href="mailto:alsabrionlinequranacademy@gmail.com">
                alsabrionlinequranacademy@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/923413839634" target="_blank" rel="noopener noreferrer">
                +923413839634
              </a>
            </li>
          </ul>
          <div className="site-footer__socials">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className={`site-footer__social-link ${item.className}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>Copyright © 2026 Al Sabri Online Quran Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
