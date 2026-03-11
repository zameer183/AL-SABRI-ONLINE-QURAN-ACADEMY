import { CourseCard } from "../components/CourseCard";
import { getCourses } from "../../cms";
import { Header } from "../header";
import { NavbarBehavior } from "../navbar-behavior";
import { SiteFooter } from "../site-footer";

export const dynamic = "force-dynamic";

export default async function OurCoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className="courses-page">
        <section className="courses-page__hero">
          <div className="courses-page__hero-overlay" />
          <div className="courses-page__hero-content">
            <h1>Our Courses</h1>
            <p>
              Explore our complete range of online Quran courses including Noorani Qaida, Tajweed,
              Tafsir, Qirat, and Hifz programs with expert tutors.
            </p>
          </div>
        </section>

        <section className="courses-page__section">
          <div className="courses-page__intro">
            <h2>Choose Your Course</h2>
            <p>
              Structured one-to-one classes designed for kids, adults, and beginners with flexible
              schedules.
            </p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                title={course.title}
                description={course.excerpt}
                image={course.image}
                href={`/${course.slug}`}
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
