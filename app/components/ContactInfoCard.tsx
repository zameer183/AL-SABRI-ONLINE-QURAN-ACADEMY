type ContactInfoCardProps = {
  title: string;
  value: string;
  href: string;
  icon: string;
};

export function ContactInfoCard({ title, value, href, icon }: ContactInfoCardProps) {
  return (
    <article className="contact-info-card">
      <p className="contact-info-card__icon" aria-hidden="true">
        {icon}
      </p>
      <h3 className="contact-info-card__title">{title}</h3>
      <a className="contact-info-card__link" href={href}>
        {value}
      </a>
    </article>
  );
}

