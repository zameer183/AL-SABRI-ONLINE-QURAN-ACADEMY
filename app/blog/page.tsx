import { BlogPreviewCard } from "../components/BlogPreviewCard";
import { getArticles } from "../../cms";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getArticles();

  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="blog-page">
        <section className="blog-page__hero">
          <div className="blog-page__hero-overlay" />
          <div className="blog-page__hero-content">
            <h1>Blog</h1>
            <p>
              Read useful Islamic articles, Quran learning insights, and practical guidance for
              students, children, and families.
            </p>
          </div>
        </section>

        <section className="blog-page__section">
          <div className="blog-page__intro">
            <h2>Latest Articles</h2>
            <p>
              Helpful reads from Al Sabri Online Quran Academy presented in the same clean design
              system as the rest of the website.
            </p>
          </div>

          <div className="blog-page__grid">
            {posts.map((post) => (
              <BlogPreviewCard
                key={post.title}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                href={`/${post.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="blog-page__cta">
          <h2>Learn Quran with Guidance That Fits Daily Life</h2>
          <p>
            Explore our articles and enroll in structured online Quran classes for children and
            adults.
          </p>
          <a href="/contact-us">Enroll Now</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
