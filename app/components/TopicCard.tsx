type TopicCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export function TopicCard({ title, description, image, href }: TopicCardProps) {
  return (
    <article className="topic-card">
      <a className="topic-card__image-link" href={href} aria-label={title}>
        <img src={image} alt={title} className="topic-card__image" loading="lazy" />
      </a>
      <div className="topic-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <a className="topic-card__button" href={href}>
          Learn More
        </a>
      </div>
    </article>
  );
}
