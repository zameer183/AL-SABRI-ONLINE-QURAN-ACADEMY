import { CourseCard } from "../components/CourseCard";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

const books = [
  {
    title: "Islamic Education Part One",
    description: "Beginner-friendly Islamic learning material for children starting their journey.",
    image: "/source/images/Noorani-Qaida-Online-For-Beginners.webp",
    href: "/islamic-education-part-one-english",
  },
  {
    title: "Islamic Education Part Two",
    description: "A more advanced learning stage focused on responsibility, worship, and values.",
    image: "/source/images/Tajweel-Ul-Quran_800x-1-r621eqxk1jgjf4nab8qol3vhe3z4o3kggpl2z92dew.webp",
    href: "/islamic-education-part-two-english",
  },
  {
    title: "Living an Islamic Way of Life",
    description: "Practical guidance for children to apply Islamic teachings in everyday life.",
    image: "/source/images/pexels-thirdman-8489077-scaled-r31966rn6083s6l44e2sykj3h8xe05mxvxczpea0yw.webp",
    href: "/living-an-islamic-way-of-life-english",
  },
  {
    title: "Islamic Manners",
    description: "A clear learning resource focused on manners, respect, kindness, and discipline.",
    image: "/source/images/Sunnah-Foods-for-Sehri-and-Iftar-in-Ramadan-300x200.webp",
    href: "/islamic-manners-english",
  },
] as const;

export default function EBooksPage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="books-page">
        <section className="books-page__hero">
          <div className="books-page__hero-overlay" />
          <div className="books-page__hero-content">
            <h1>E-Books</h1>
            <p>Explore structured Islamic learning resources for children in a clear and guided format.</p>
          </div>
        </section>

        <section className="books-page__section">
          <div className="books-page__intro">
            <h2>Islamic Learning Resources for Children</h2>
            <p>Helpful educational content covering belief, manners, daily life, and practical Islamic guidance.</p>
          </div>
          <div className="books-grid">
            {books.map((book) => (
              <CourseCard
                key={book.title}
                title={book.title}
                description={book.description}
                image={book.image}
                href={book.href}
                ctaLabel="Read More"
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
