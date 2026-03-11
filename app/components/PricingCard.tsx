import Link from "next/link";

type PricingCardProps = {
  plan: string;
  price: string;
  details: string;
  sessions: string;
  href: string;
  badge?: string;
  featured?: boolean;
  features?: string[];
};

export function PricingCard({
  plan,
  price,
  details,
  sessions,
  href,
  badge,
  featured = false,
  features = [],
}: PricingCardProps) {
  return (
    <article className={`fee-card${featured ? " fee-card--featured" : ""}`}>
      <div className="fee-card__body">
        {badge ? <p className="fee-card__badge">{badge}</p> : null}
        <h3 className="fee-card__plan">{plan}</h3>
        <p className="fee-card__price">{price}</p>
        <p className="fee-card__sessions">{sessions}</p>
        <p className="fee-card__details">{details}</p>
        {features.length > 0 ? (
          <ul className="fee-card__features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : null}
        <Link className="fee-card__button" href={href}>
          Enroll Now
        </Link>
      </div>
    </article>
  );
}
