import { GuidedInnerPage } from "../components/GuidedInnerPage";

export default function IslamicMannersEnglishPage() {
  return (
    <GuidedInnerPage
      title="Islamic Manners (English)"
      subtitle="Teach children the beauty of adab, kindness, honesty, and respectful behaviour."
      introTitle="Good Character is a Core Part of Islam"
      intro={[
        "Islamic manners shape the way children speak, behave, and treat others. This page helps young learners understand how adab and good conduct are part of faith.",
        "By learning Islamic manners early, children become more respectful, responsible, and conscious of how they represent their values in daily life.",
      ]}
      pointsTitle="Key Manners Children Should Practice"
      points={[
        {
          title: "Respect for Parents and Elders",
          text: "Children learn to show gratitude, politeness, and obedience in a balanced Islamic way.",
        },
        {
          title: "Kind Speech",
          text: "Islam teaches children to avoid hurtful words and speak gently and truthfully.",
        },
        {
          title: "Honesty and Trust",
          text: "Being truthful, trustworthy, and fair is introduced as a daily Islamic responsibility.",
        },
        {
          title: "Care for Others",
          text: "Children are encouraged to practice generosity, patience, and compassion with people around them.",
        },
      ]}
      ctaTitle="Build Good Character Through Islamic Learning"
      ctaText="Give your child guided lessons that develop manners, morals, and confidence."
      image="/source/images/Sunnah-Foods-for-Sehri-and-Iftar-in-Ramadan-300x200.webp"
    />
  );
}
