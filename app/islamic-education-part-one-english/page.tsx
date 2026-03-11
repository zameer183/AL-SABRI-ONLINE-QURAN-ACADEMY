import { GuidedInnerPage } from "../components/GuidedInnerPage";

export default function IslamicEducationPartOneEnglishPage() {
  return (
    <GuidedInnerPage
      title="Islamic Education Part One (English)"
      subtitle="A beginner-friendly introduction to faith, worship, and manners for children."
      introTitle="Build a Strong Islamic Foundation"
      intro={[
        "Islamic Education Part One introduces children to the essential teachings they need at an early age, including the basics of worship, good habits, and simple Islamic understanding.",
        "The goal is to help young learners grow with confidence, discipline, and respect while keeping the learning process engaging and practical for everyday life.",
      ]}
      pointsTitle="What Children Learn in Part One"
      points={[
        {
          title: "Basic Islamic Beliefs",
          text: "Children learn simple concepts of faith so they understand their relationship with Allah from an early age.",
        },
        {
          title: "Daily Worship Habits",
          text: "Prayer, duas, and remembrance are introduced in a consistent and easy-to-understand way.",
        },
        {
          title: "Cleanliness and Discipline",
          text: "Children are guided toward personal responsibility, order, and good daily routines.",
        },
        {
          title: "Respectful Behaviour",
          text: "Islamic manners with parents, teachers, and others are taught through practical examples.",
        },
      ]}
      ctaTitle="Start Your Child’s Islamic Foundation Today"
      ctaText="Begin guided online learning with structured Islamic education for children."
      image="/source/images/Noorani-Qaida-Online-For-Beginners.webp"
    />
  );
}
