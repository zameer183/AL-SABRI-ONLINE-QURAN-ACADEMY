type BlogPreviewCardProps = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export function BlogPreviewCard({ title, excerpt, image, href }: BlogPreviewCardProps) {
  return (
    <article className="blog-preview-card">
      <a className="blog-preview-card__image-link" href={href} aria-label={title}>
        <img className="blog-preview-card__image" src={image} alt={title} loading="lazy" />
      </a>
      <div className="blog-preview-card__body">
        <h3>
          <a href={href}>{title}</a>
        </h3>
        <p>{excerpt}</p>
        <a className="blog-preview-card__button" href={href}>
          Read More
        </a>
      </div>
    </article>
  );
}
