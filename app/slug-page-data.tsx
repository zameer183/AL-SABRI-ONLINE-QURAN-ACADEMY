import { GuidedInnerPage } from "./components/GuidedInnerPage";

type GuidedPoint = {
  title: string;
  text: string;
};

type GuidedPageConfig = {
  title: string;
  subtitle: string;
  introTitle: string;
  intro: string[];
  pointsTitle: string;
  points: GuidedPoint[];
  ctaTitle: string;
  ctaText: string;
  image: string;
};

const guidedPages: Record<string, GuidedPageConfig> = {
  "noorani-qaida-online-for-beginners": {
    title: "Noorani Qaida Online for Beginners",
    subtitle:
      "A structured starting point for children and adults who want to build confident Quran reading skills from the basics.",
    introTitle: "Start Quran Reading with the Right Foundation",
    intro: [
      "Noorani Qaida is the first step for beginners who want to learn Quran recitation correctly. It focuses on Arabic letters, pronunciation, and joining rules in a simple progression.",
      "With one-to-one online guidance, students build fluency gradually and avoid mistakes early, making later Quran reading much easier and more accurate.",
    ],
    pointsTitle: "What This Course Covers",
    points: [
      {
        title: "Arabic Letters and Sounds",
        text: "Students learn each letter carefully with clear makharij and correct pronunciation from the start.",
      },
      {
        title: "Joining and Reading Practice",
        text: "Lessons move from individual letters to joined forms so learners can begin reading words confidently.",
      },
      {
        title: "Basic Tajweed Awareness",
        text: "Early recitation habits are improved with simple rules that prepare students for Quran reading.",
      },
      {
        title: "Beginner-Friendly Pace",
        text: "Classes are kept easy to follow for children, adults, and re-starters who need patient guidance.",
      },
    ],
    ctaTitle: "Begin Noorani Qaida with Personal Guidance",
    ctaText: "Enroll in one-to-one online lessons and build a strong Quran reading foundation.",
    image: "/assets/course-noorani-qaida.svg",
  },
  "online-quran-tafseer-course": {
    title: "Online Quran Tafseer Course",
    subtitle:
      "Understand the meanings, lessons, and guidance of the Quran through structured tafseer sessions with qualified tutors.",
    introTitle: "Learn the Quran Beyond Recitation",
    intro: [
      "Tafseer helps students understand the message of the Quran more deeply, including context, themes, and practical guidance for daily life.",
      "This course is designed for learners who want both spiritual understanding and a clearer relationship with Quranic teachings.",
    ],
    pointsTitle: "What You Study in Tafseer",
    points: [
      {
        title: "Meaning of Verses",
        text: "Students learn the message of selected surahs and ayat in a clear and accessible way.",
      },
      {
        title: "Context and Background",
        text: "Lessons explain when and why verses were revealed so their guidance is easier to understand.",
      },
      {
        title: "Practical Lessons",
        text: "Tafseer sessions connect Quranic guidance to daily life, character, and decision-making.",
      },
      {
        title: "Structured Teacher Support",
        text: "Qualified tutors simplify complex concepts and keep the learning process organized.",
      },
    ],
    ctaTitle: "Understand the Quran with Clarity",
    ctaText: "Start guided tafseer sessions and deepen your connection with Quranic meaning.",
    image: "/assets/course-tafsir.svg",
  },
  "qirat-course": {
    title: "Quran Qirat Course",
    subtitle:
      "Improve your recitation style, tone, and delivery with guided qirat practice in a structured one-to-one format.",
    introTitle: "Develop Beautiful and Controlled Recitation",
    intro: [
      "The Quran Qirat course helps students improve rhythm, tone, and confidence while maintaining proper recitation standards.",
      "It is suitable for learners who already read the Quran and now want to strengthen their voice, flow, and presentation.",
    ],
    pointsTitle: "What You Improve in Qirat",
    points: [
      {
        title: "Voice Control",
        text: "Students work on balanced recitation style with better control over tone and expression.",
      },
      {
        title: "Fluency and Rhythm",
        text: "Reading becomes smoother with guided correction on pauses, pace, and connected delivery.",
      },
      {
        title: "Listening and Repetition",
        text: "Regular listening practice helps learners improve recitation through imitation and correction.",
      },
      {
        title: "Personalized Feedback",
        text: "Teachers adjust lessons to each student's current level and recitation goals.",
      },
    ],
    ctaTitle: "Strengthen Your Quran Recitation",
    ctaText: "Enroll in guided Qirat classes and improve recitation with expert support.",
    image: "/assets/course-qirat.svg",
  },
  "learn-quran-with-tajweed-online": {
    title: "Learn Quran with Tajweed Online",
    subtitle:
      "Master the rules of proper Quran recitation with one-to-one online Tajweed classes for children and adults.",
    introTitle: "Recite the Quran with Accuracy and Confidence",
    intro: [
      "Tajweed is essential for correct recitation. This course focuses on pronunciation, articulation points, and recitation rules that improve fluency and accuracy.",
      "The course is suitable for students who want to correct common mistakes and build a stronger recitation standard with teacher supervision.",
    ],
    pointsTitle: "What the Tajweed Course Includes",
    points: [
      {
        title: "Makharij and Sifaat",
        text: "Students learn how each letter should sound and where it should be pronounced from.",
      },
      {
        title: "Rule-Based Recitation",
        text: "Key Tajweed rules are introduced step by step in an easy and practical lesson format.",
      },
      {
        title: "Error Correction",
        text: "Teachers identify mistakes in recitation and help students correct them consistently.",
      },
      {
        title: "Confidence Through Practice",
        text: "Regular reading and guided revision help students apply Tajweed naturally over time.",
      },
    ],
    ctaTitle: "Learn Tajweed with Expert Guidance",
    ctaText: "Start online Tajweed classes and build stronger, more accurate Quran recitation.",
    image: "/assets/course-tajweed.svg",
  },
  "learn-quran-reading-online": {
    title: "Learn Quran Reading Online",
    subtitle:
      "Online Quran reading lessons for beginners and intermediate students who want fluency, accuracy, and confidence.",
    introTitle: "Build Strong Quran Reading Habits",
    intro: [
      "Quran reading classes are designed for students who want to move from basic reading to smoother recitation with regular practice.",
      "The lessons combine guided reading, pronunciation support, and gradual progress so students improve without feeling overwhelmed.",
    ],
    pointsTitle: "What Students Gain from Quran Reading Classes",
    points: [
      {
        title: "Reading Fluency",
        text: "Students improve pace, accuracy, and confidence through consistent teacher-led recitation practice.",
      },
      {
        title: "Pronunciation Support",
        text: "Teachers correct weak points in articulation so learners read more clearly and correctly.",
      },
      {
        title: "Structured Progress",
        text: "Lessons follow a steady pattern that helps both children and adults stay on track.",
      },
      {
        title: "One-to-One Attention",
        text: "Students receive focused support based on their level, pace, and recitation goals.",
      },
    ],
    ctaTitle: "Start Reading the Quran with Confidence",
    ctaText: "Enroll in online Quran reading classes and improve step by step with qualified tutors.",
    image: "/assets/course-reading.svg",
  },
  "female-quran-teacher": {
    title: "Female Quran Teacher",
    subtitle:
      "Comfortable and supportive Quran learning with experienced female tutors for sisters and children.",
    introTitle: "Learn with Dedicated Female Quran Teachers",
    intro: [
      "This option is ideal for sisters and families who prefer female Quran tutors for recitation, Tajweed, Noorani Qaida, and children's learning support.",
      "Classes are delivered in a structured, respectful, and comfortable environment that supports regular progress and clear communication.",
    ],
    pointsTitle: "Why Students Choose Female Quran Teachers",
    points: [
      {
        title: "Comfortable Learning Environment",
        text: "Female students and children can learn with confidence in a setting that feels more suitable for them.",
      },
      {
        title: "Flexible Course Options",
        text: "Tutors can teach Noorani Qaida, Quran reading, Tajweed, memorization, and Islamic basics.",
      },
      {
        title: "Patient and Supportive Guidance",
        text: "Lessons are paced according to the student's confidence, age, and learning needs.",
      },
      {
        title: "Consistent Progress for Families",
        text: "Parents can arrange reliable one-to-one schedules for daughters and younger learners.",
      },
    ],
    ctaTitle: "Book Classes with a Female Quran Tutor",
    ctaText: "Contact us to arrange one-to-one online lessons with experienced female teachers.",
    image: "/assets/course-female-teacher.svg",
  },
  "online-quran-memorization-program": {
    title: "Online Quran Memorization Program",
    subtitle:
      "A structured Hifz pathway with revision, tracking, and teacher guidance for steady memorization progress.",
    introTitle: "Memorize the Quran with a Practical Hifz Plan",
    intro: [
      "The online Quran memorization program is designed for students who want a disciplined and realistic Hifz routine with regular revision.",
      "Lessons focus on memorization targets, retention, and teacher follow-up so students build progress in a stable and manageable way.",
    ],
    pointsTitle: "What the Hifz Program Focuses On",
    points: [
      {
        title: "Daily Memorization Targets",
        text: "Students receive manageable portions that fit their age, level, and memorization strength.",
      },
      {
        title: "Revision and Retention",
        text: "Strong review habits are built so previously memorized portions remain secure over time.",
      },
      {
        title: "Teacher Monitoring",
        text: "Progress is checked regularly to keep students consistent and accountable.",
      },
      {
        title: "Long-Term Structure",
        text: "The program supports memorization with realistic planning instead of rushed targets.",
      },
    ],
    ctaTitle: "Begin Your Hifz Journey Online",
    ctaText: "Enroll in structured Quran memorization classes with revision-focused guidance.",
    image: "/assets/course-hifz.svg",
  },
  "benefits-of-surah-kahf": {
    title: "Benefits of Surah Kahf",
    subtitle:
      "A practical overview of why Surah Kahf holds a special place in weekly Islamic routine and reflection.",
    introTitle: "Why Surah Kahf Matters Each Week",
    intro: [
      "Surah Kahf is widely recited on Fridays and is valued for the spiritual reminders, lessons, and protection associated with it in Islamic tradition.",
      "Its stories help Muslims reflect on faith, patience, trials, leadership, and the temporary nature of worldly success.",
    ],
    pointsTitle: "Key Lessons and Benefits",
    points: [
      {
        title: "Weekly Reminder of Faith",
        text: "Reciting Surah Kahf each week helps renew spiritual focus and connect the heart to Quranic guidance.",
      },
      {
        title: "Protection from Trials",
        text: "The surah is often associated with reflection and preparation against major spiritual tests.",
      },
      {
        title: "Powerful Quranic Stories",
        text: "Its stories teach patience, humility, trust in Allah, and wisdom in difficult situations.",
      },
      {
        title: "Consistent Quran Habit",
        text: "A regular Friday recitation habit strengthens discipline and attachment to the Quran.",
      },
    ],
    ctaTitle: "Learn the Quran with Meaningful Guidance",
    ctaText: "Explore more Islamic learning with structured Quran classes for children and adults.",
    image: "/source/images/Benefits-of-Surah-Kahf-Quran-Hadith-References-300x200.webp",
  },
  "sunnah-foods-for-sehri-and-iftar": {
    title: "Sunnah Foods for Sehri and Iftar",
    subtitle:
      "Learn about prophetic food choices that support a healthier and more spiritually mindful Ramadan routine.",
    introTitle: "Healthy and Meaningful Ramadan Eating Habits",
    intro: [
      "Sunnah foods offer both practical and spiritual value during fasting, especially at Sehri and Iftar when energy, balance, and simplicity matter most.",
      "This topic helps students and families understand how prophetic food habits can shape a healthier and more intentional Ramadan routine.",
    ],
    pointsTitle: "Practical Benefits of Sunnah Foods",
    points: [
      {
        title: "Balanced Energy for Fasting",
        text: "Simple and nourishing foods can help the body stay steadier during long fasting hours.",
      },
      {
        title: "Connection to Sunnah",
        text: "Following prophetic food habits adds spiritual intention to daily eating routines.",
      },
      {
        title: "Healthier Meal Choices",
        text: "Students and parents are encouraged to choose moderation, quality, and simplicity over excess.",
      },
      {
        title: "Family Education Value",
        text: "This topic helps children understand the wisdom of Islamic habits in everyday life.",
      },
    ],
    ctaTitle: "Build Islamic Habits Through Learning",
    ctaText: "Join guided online Quran and Islamic education classes for practical, faith-based growth.",
    image: "/source/images/Sunnah-Foods-for-Sehri-and-Iftar-in-Ramadan-300x200.webp",
  },
  "difference-between-zakat-sadaqah-and-fitrana": {
    title: "Difference Between Zakat, Sadaqah and Fitrana",
    subtitle:
      "A clear explanation of the main Islamic charity categories and when each one applies.",
    introTitle: "Understand Core Islamic Charity Concepts",
    intro: [
      "Many students and parents hear the terms Zakat, Sadaqah, and Fitrana together, but each one has a different purpose and ruling.",
      "This topic explains the differences simply so families can better understand Islamic giving and teach it correctly to children.",
    ],
    pointsTitle: "How These Forms of Charity Differ",
    points: [
      {
        title: "Zakat",
        text: "Zakat is an obligatory annual charity due on qualifying wealth once the required threshold is met.",
      },
      {
        title: "Sadaqah",
        text: "Sadaqah is voluntary charity and can be given at any time for reward and support of others.",
      },
      {
        title: "Fitrana",
        text: "Fitrana is specifically linked to Ramadan and Eid, and it is given so the needy can benefit before Eid prayer.",
      },
      {
        title: "Practical Family Understanding",
        text: "Learning these distinctions helps children and adults apply Islamic charity more correctly and meaningfully.",
      },
    ],
    ctaTitle: "Learn Islamic Essentials with Clarity",
    ctaText: "Study Quran and Islamic education online with structured lessons for families and learners.",
    image: "/source/images/Difference-Between-Zakat-Sadaqah-and-Fitrana-E2-80-93-Complete-Islamic-Guide-300x200.webp",
  },
};

export function renderCustomSlugPage(slug: string) {
  const config = guidedPages[slug];

  if (!config) {
    return null;
  }

  return <GuidedInnerPage {...config} />;
}

export const customSlugKeys = Object.keys(guidedPages);
