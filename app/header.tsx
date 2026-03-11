"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/our-courses", label: "Our Courses" },
  { href: "/country", label: "Countries" },
  { href: "/fee", label: "Fee" },
  { href: "/childrens-section", label: "Children's Section" },
  { href: "/contact-us", label: "Contact us" },
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

const socials = [
  {
    href: "https://www.facebook.com/share/1GzhwXAxWC/",
    label: "Facebook",
    icon: <i aria-hidden="true" className="fab fa-facebook-f" />,
  },
  {
    href: "https://www.instagram.com/alsabrionlinequranacadmey?igsh=MWUxZ2EwaTk3aGV2Mw==",
    label: "Instagram",
    icon: <i aria-hidden="true" className="fab fa-instagram" />,
  },
  {
    href: "https://www.tiktok.com/@asolearnquran?_r=1&_t=ZN-94XxIDhOsrO",
    label: "TikTok",
    icon: (
      <svg className="custom-social-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.11v13.09a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 2.89-2.89c.29 0 .57.04.84.13V9.17a6 6 0 0 0-.84-.06A6 6 0 1 0 15.82 15V8.33a7.9 7.9 0 0 0 4.63 1.49V6.69a4.84 4.84 0 0 1-.86 0Z" />
      </svg>
    ),
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="custom-site-header">
      <div className="custom-topbar">
        <div className="custom-topbar__inner">
          <div className="custom-topbar__contact">
            <a href="tel:+923413839634">
              <i aria-hidden="true" className="fas fa-phone" />
              <span>+923413839634</span>
            </a>
            <a href="mailto:alsabrionlinequranacademy@gmail.com">
              <i aria-hidden="true" className="fas fa-envelope" />
              <span>alsabrionlinequranacademy@gmail.com</span>
            </a>
          </div>
          <div className="custom-topbar__socials">
            {socials.map((social) => (
              <a
                key={social.label}
                className="custom-topbar__social-link"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-navbar">
        <div className="custom-navbar__inner">
          <Link href="/" className="custom-navbar__logo" aria-label="Al Sabri Online Quran Academy">
            <Image
              src="/assets/al-sabri-logo.jpeg"
              alt="Al Sabri Online Quran Academy"
              width={348}
              height={321}
              priority
            />
          </Link>

          <nav className="custom-navbar__menu" aria-label="Primary menu">
            {menuItems.map((item) => (
              <Link key={item.label} className="custom-navbar__menu-link" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="custom-navbar__actions">
            <Link className="custom-navbar__cta" href="/contact-us">
              Enroll Now
            </Link>
            <button
              type="button"
              className="custom-navbar__toggle"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="custom-mobile-menu">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="custom-mobile-menu__cta" href="/contact-us" onClick={() => setIsOpen(false)}>
              Enroll Now
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
