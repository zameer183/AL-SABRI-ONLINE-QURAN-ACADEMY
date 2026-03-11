type CountryCardProps = {
  country: string;
  description: string;
  image: string;
  href: string;
  buttonLabel?: string;
};

export function CountryCard({
  country,
  description,
  image,
  href,
  buttonLabel = "Start Learning",
}: CountryCardProps) {
  return (
    <article className="country-card">
      <a href={href} className="country-card__image-link" aria-label={country}>
        <img src={image} alt={country} className="country-card__image" loading="lazy" />
      </a>
      <div className="country-card__body">
        <h3 className="country-card__title">
          <a href={href}>{country}</a>
        </h3>
        <p className="country-card__description">{description}</p>
        <a className="country-card__button" href={href}>
          {buttonLabel}
        </a>
      </div>
    </article>
  );
}

