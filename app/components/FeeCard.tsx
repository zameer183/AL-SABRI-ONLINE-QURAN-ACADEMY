type FeeCardProps = {
  plan: string;
  price: string;
  details: string;
  sessions: string;
  href: string;
};

export function FeeCard({ plan, price, details, sessions, href }: FeeCardProps) {
  return (
    <article className="fee-card">
      <div className="fee-card__body">
        <h3 className="fee-card__plan">{plan}</h3>
        <p className="fee-card__price">{price}</p>
        <p className="fee-card__sessions">{sessions}</p>
        <p className="fee-card__details">{details}</p>
        <a className="fee-card__button" href={href}>
          Enroll Now
        </a>
      </div>
    </article>
  );
}

