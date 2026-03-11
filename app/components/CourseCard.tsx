import Link from "next/link";

type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel?: string;
};

export function CourseCard({
  title,
  description,
  image,
  href,
  ctaLabel = "Enroll Now",
}: CourseCardProps) {
  return (
    <article className="course-card">
      <Link href={href} className="course-card__image-link" aria-label={title}>
        <img src={image} alt={title} className="course-card__image" loading="lazy" />
      </Link>
      <div className="course-card__body">
        <h3 className="course-card__title">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="course-card__description">{description}</p>
        <Link className="course-card__button" href={href}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
