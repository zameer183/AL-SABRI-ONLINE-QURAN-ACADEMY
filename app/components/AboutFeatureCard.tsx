type AboutFeatureCardProps = {
  title: string;
  text: string;
};

export function AboutFeatureCard({ title, text }: AboutFeatureCardProps) {
  return (
    <article className="about-feature-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

