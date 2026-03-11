import { GuidedInnerPage } from "../components/GuidedInnerPage";

export default function IslamicEducationPartTwoEnglishPage() {
  return (
    <GuidedInnerPage
      title="Islamic Education Part Two (English)"
      subtitle="A deeper stage of Islamic learning focused on understanding, application, and character."
      introTitle="Advance Islamic Learning with Clarity"
      intro={[
        "Islamic Education Part Two helps children move beyond the basics and develop a stronger understanding of Islamic responsibilities, personal character, and spiritual growth.",
        "It supports students who are ready for more structured guidance in applying Islamic teachings in school, home life, and social behavior.",
      ]}
      pointsTitle="What Children Learn in Part Two"
      points={[
        {
          title: "Stronger Understanding of Worship",
          text: "Children deepen their understanding of salah, duas, and regular acts of worship.",
        },
        {
          title: "Islamic Identity",
          text: "Students learn to take pride in Islamic values and apply them confidently in daily life.",
        },
        {
          title: "Responsibility and Accountability",
          text: "The lessons encourage children to act with honesty, sincerity, and self-discipline.",
        },
        {
          title: "Practical Moral Development",
          text: "Children are taught how to make better choices through Islamic guidance and reflection.",
        },
      ]}
      ctaTitle="Help Your Child Grow in Islamic Understanding"
      ctaText="Enroll in the next stage of Islamic learning with structured guidance and practical lessons."
      image="/source/images/Tajweel-Ul-Quran_800x-1-r621eqxk1jgjf4nab8qol3vhe3z4o3kggpl2z92dew.webp"
    />
  );
}
