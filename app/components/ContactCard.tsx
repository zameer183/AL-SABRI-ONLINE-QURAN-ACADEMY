type ContactCardProps = {
  title: string;
  value: string;
  href: string;
  icon: string;
  detail: string;
};

export function ContactCard({ title, value, href, icon, detail }: ContactCardProps) {
  return (
    <article className="contact-card">
      <div className="contact-card__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="contact-card__title">{title}</h3>
      <a className="contact-card__link" href={href}>
        {value}
      </a>
      <p className="contact-card__detail">{detail}</p>
    </article>
  );
}
