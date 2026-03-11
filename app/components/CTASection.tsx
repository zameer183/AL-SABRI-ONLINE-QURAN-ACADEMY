import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function CTASection({ title, description, href, label }: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-section__inner">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={href}>{label}</Link>
      </div>
    </section>
  );
}
