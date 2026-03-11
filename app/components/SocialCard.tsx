type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

type SocialCardProps = {
  socialLinks: readonly SocialLink[];
};

export function SocialCard({ socialLinks }: SocialCardProps) {
  return (
    <aside className="social-card">
      <p className="social-card__eyebrow">Follow Us</p>
      <h3>Connect With Us</h3>
      <p>
        Reach out on email, WhatsApp, or social media for updates, class information, and quick
        support.
      </p>

      <div className="social-card__meta">
        <a href="mailto:alsabrionlinequranacademy@gmail.com">
          <span>Email</span>
          <strong>alsabrionlinequranacademy@gmail.com</strong>
        </a>
        <a href="https://wa.me/923413839634" target="_blank" rel="noopener noreferrer">
          <span>Phone / WhatsApp</span>
          <strong>+923413839634</strong>
        </a>
      </div>

      <div className="social-card__links">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            className={`social-card__link social-card__link--${item.label.toLowerCase()}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-card__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
