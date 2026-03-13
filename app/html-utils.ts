type TransformOptions = {
  stripHeader?: boolean;
  stripHero?: boolean;
  stripFooter?: boolean;
};

const HOME_COURSE_IMAGE_MAP = [
  {
    id: "d380034",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(7).jpeg",
  },
  {
    id: "2521c9c",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(4).jpeg",
  },
  {
    id: "2c2dd01",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(9).jpeg",
  },
  {
    id: "a04403c",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(8).jpeg",
  },
  {
    id: "2d4d143",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(5).jpeg",
  },
  {
    id: "8721b18",
    image: "/new%20images/WhatsApp%20Image%202026-03-13%20at%205.27.18%20AM%20(10).jpeg",
  },
] as const;

const NAVBAR_SOCIALS = `<ul class="elementor-icon-list-items elementor-inline-items"> <li class="elementor-icon-list-item elementor-inline-item"> <a href="https://www.facebook.com/share/1GzhwXAxWC/" target="_blank" rel="noopener noreferrer"> <span class="elementor-icon-list-icon"> <i aria-hidden="true" class="fab fa-facebook-f"></i> </span> <span class="elementor-icon-list-text"></span> </a> </li> <li class="elementor-icon-list-item elementor-inline-item"> <a href="https://www.instagram.com/alsabrionlinequranacadmey?igsh=MWUxZ2EwaTk3aGV2Mw==" target="_blank" rel="noopener noreferrer"> <span class="elementor-icon-list-icon"> <i aria-hidden="true" class="fab fa-instagram"></i> </span> <span class="elementor-icon-list-text"></span> </a> </li> <li class="elementor-icon-list-item elementor-inline-item"> <a href="https://www.tiktok.com/@asolearnquran?_r=1&_t=ZN-94XxIDhOsrO" target="_blank" rel="noopener noreferrer"> <span class="elementor-icon-list-icon"> <svg class="custom-social-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.11v13.09a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 2.89-2.89c.29 0 .57.04.84.13V9.17a6 6 0 0 0-.84-.06A6 6 0 1 0 15.82 15V8.33a7.9 7.9 0 0 0 4.63 1.49V6.69a4.84 4.84 0 0 1-.86 0Z"></path></svg> </span> <span class="elementor-icon-list-text"></span> </a> </li> </ul>`;

const FOOTER_CONTACTS = `<ul class="elementor-icon-list-items"> <li class="elementor-icon-list-item"> <a href="mailto:alsabrionlinequranacademy@gmail.com"> <span class="elementor-icon-list-icon"> <i aria-hidden="true" class="icon icon-email"></i> </span> <span class="elementor-icon-list-text">alsabrionlinequranacademy@gmail.com</span> </a> </li> <li class="elementor-icon-list-item"> <a href="https://wa.me/923413839634" target="_blank" rel="noopener noreferrer"> <span class="elementor-icon-list-icon"> <i aria-hidden="true" class="icon icon-phone-call2"></i> </span> <span class="elementor-icon-list-text">+923413839634</span> </a> </li> </ul>`;

const FOOTER_SOCIALS = `<div class="elementor-social-icons-wrapper elementor-grid" role="list"> <span class="elementor-grid-item" role="listitem"> <a class="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-animation-pop elementor-repeater-item-61d757d" href="https://www.facebook.com/share/1GzhwXAxWC/" target="_blank" rel="noopener noreferrer"> <span class="elementor-screen-only">Facebook</span> <i aria-hidden="true" class="fab fa-facebook-f"></i> </a> </span> <span class="elementor-grid-item" role="listitem"> <a class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-animation-pop elementor-repeater-item-88c0aa8" href="https://www.instagram.com/alsabrionlinequranacadmey?igsh=MWUxZ2EwaTk3aGV2Mw==" target="_blank" rel="noopener noreferrer"> <span class="elementor-screen-only">Instagram</span> <i aria-hidden="true" class="fab fa-instagram"></i> </a> </span> <span class="elementor-grid-item" role="listitem"> <a class="elementor-icon elementor-social-icon elementor-social-icon-tiktok elementor-animation-pop elementor-repeater-item-c807e0e" href="https://www.tiktok.com/@asolearnquran?_r=1&_t=ZN-94XxIDhOsrO" target="_blank" rel="noopener noreferrer"> <span class="elementor-screen-only">TikTok</span> <svg class="custom-social-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.11v13.09a2.89 2.89 0 0 1-5.78 0 2.89 2.89 0 0 1 2.89-2.89c.29 0 .57.04.84.13V9.17a6 6 0 0 0-.84-.06A6 6 0 1 0 15.82 15V8.33a7.9 7.9 0 0 0 4.63 1.49V6.69a4.84 4.84 0 0 1-.86 0Z"></path></svg> </a> </span> </div>`;
const INLINE_VIDEO = `<div class="home-inline-video"><video class="home-inline-video__player" controls preload="metadata" playsinline><source src="/assets/tilawat-video.mp4" type="video/mp4">Your browser does not support the video tag.</video></div>`;
const HOME_TESTIMONIALS = `
<section class="home-testimonials" id="xs_testi_10">
  <div class="home-testimonials__inner">
    <h2 class="home-testimonials__title">Students Testimonials</h2>
    <p class="home-testimonials__text">Hear from our students across the USA who have experienced effective, personalized, and enjoyable Online Quran Learning with Al Sabri Online Quran Academy.</p>
    <div class="home-testimonials__grid">
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>We have several Quran teachers for our kids in the last couple of years, but never felt satisfied until we joined Al Sabri. Qari Zafeer is always on time and teaches with honesty and passion.</p>
        <strong>Nauman Khan</strong>
        <span>Texas</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>My children enjoy every class and their recitation has improved a lot. The tutor is patient, professional, and the learning environment is very supportive for families.</p>
        <strong>Bibi Khwajezada</strong>
        <span>California</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>Excellent online Quran classes with flexible timings. The sessions are clear, well organized, and very effective for both beginners and students improving Tajweed.</p>
        <strong>Shawty Raw</strong>
        <span>New York</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>We have several Quran teachers for our kids in the last couple of years, but never felt satisfied until we joined Al Sabri. Qari Zafeer is always on time and teaches with honesty and passion.</p>
        <strong>Nauman Khan</strong>
        <span>Texas</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>My children enjoy every class and their recitation has improved a lot. The tutor is patient, professional, and the learning environment is very supportive for families.</p>
        <strong>Bibi Khwajezada</strong>
        <span>California</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>Excellent online Quran classes with flexible timings. The sessions are clear, well organized, and very effective for both beginners and students improving Tajweed.</p>
        <strong>Shawty Raw</strong>
        <span>New York</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>We have several Quran teachers for our kids in the last couple of years, but never felt satisfied until we joined Al Sabri. Qari Zafeer is always on time and teaches with honesty and passion.</p>
        <strong>Nauman Khan</strong>
        <span>Texas</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>My children enjoy every class and their recitation has improved a lot. The tutor is patient, professional, and the learning environment is very supportive for families.</p>
        <strong>Bibi Khwajezada</strong>
        <span>California</span>
      </article>
      <article class="home-testimonials__card">
        <div class="home-testimonials__stars">★★★★★</div>
        <p>Excellent online Quran classes with flexible timings. The sessions are clear, well organized, and very effective for both beginners and students improving Tajweed.</p>
        <strong>Shawty Raw</strong>
        <span>New York</span>
      </article>
    </div>
  </div>
</section>`;

function replaceSection(html: string, pattern: RegExp, replacement: string) {
  return html.replace(pattern, replacement);
}

function normalizeInternalLinks(html: string) {
  return html
    .replace(/href="\/source\/pages\/alsaifquranacademy\.com\.html"/gi, 'href="/"')
    .replace(/href="\/source\/pages\/([a-z0-9-]+)\.html"/gi, 'href="/$1"')
    .replace(/href="\.\/pages\/alsaifquranacademy\.com\.html"/gi, 'href="/"')
    .replace(/href="\.\/pages\/([a-z0-9-]+)\.html"/gi, 'href="/$1"')
    .replace(/href="https:\/\/alsaifquranacademy\.com\/"/gi, 'href="/"')
    .replace(/href="https:\/\/alsaifquranacademy\.com\/([a-z0-9-]+)\/"/gi, 'href="/$1"');
}

export function transformSiteHtml(html: string, options: TransformOptions = {}) {
  let nextHtml = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s(?:bis_[a-z0-9_-]+|bis_use|bis_register|bis_skin_checked|__processed_[^=]+|data-google-query-id|data-gtm-[^=]+|data-ad-[^=]+)="[^"]*"/gi, "")
    .replace(/\s{2,}/g, " ");

  if (options.stripHeader) {
    nextHtml = replaceSection(
      nextHtml,
      /<div data-elementor-type="header"[\s\S]*?<div data-elementor-type="wp-page"/,
      `<div data-elementor-type="wp-page"`,
    );
  }

  if (options.stripHero) {
    nextHtml = replaceSection(
      nextHtml,
      /<div class="elementor-element elementor-element-4bca67e[\s\S]*?<div class="elementor-element elementor-element-bab68e2/,
      `<div class="elementor-element elementor-element-bab68e2`,
    );
  }

  if (options.stripFooter) {
    nextHtml = replaceSection(
      nextHtml,
      /<div data-elementor-type="footer"[\s\S]*$/,
      "",
    );
  }

  nextHtml = replaceSection(
    nextHtml,
    /(<div class="elementor-element elementor-element-8ea0a3c[\s\S]*?<div class="elementor-widget-container"> )<ul class="elementor-icon-list-items elementor-inline-items">[\s\S]*?<\/ul>/,
    `$1${NAVBAR_SOCIALS}`,
  );

  nextHtml = replaceSection(
    nextHtml,
    /(<div class="elementor-element elementor-element-be352e3[\s\S]*?<div class="elementor-widget-container"> )<ul class="elementor-icon-list-items">[\s\S]*?<\/ul>/,
    `$1${FOOTER_CONTACTS}`,
  );

  nextHtml = replaceSection(
    nextHtml,
    /(<div class="elementor-element elementor-element-ea46df6[\s\S]*?<div class="elementor-widget-container"> )<div class="elementor-social-icons-wrapper elementor-grid" role="list">[\s\S]*?<\/div>/,
    `$1${FOOTER_SOCIALS}`,
  );

  nextHtml = replaceSection(
    nextHtml,
    /<div class="elementor-element elementor-element-6f64d4f6[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="elementor-element elementor-element-0d29f6e/,
    `${HOME_TESTIMONIALS}<div class="elementor-element elementor-element-0d29f6e`,
  );

  for (const item of HOME_COURSE_IMAGE_MAP) {
    nextHtml = nextHtml.replace(
      new RegExp(
        `<div class="elementor-element elementor-element-${item.id} e-con-full e-flex e-con e-child" data-id="${item.id}" data-element_type="container" data-e-type="container" data-settings="\\{&quot;background_background&quot;:&quot;classic&quot;\\}">\\s*<\\/div>`,
        "g",
      ),
      `<div class="elementor-element elementor-element-${item.id} e-con-full e-flex e-con e-child" data-id="${item.id}" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="background-image:url('${item.image}');background-size:cover;background-position:center;background-repeat:no-repeat;"></div>`,
    );
  }

  return normalizeInternalLinks(nextHtml)
    .replace(
      /https:\/\/alsaifquranacademy\.com\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?([^"/?#]+)"/gi,
      '/source/images/$1"',
    )
    .replace(/<div class="elementor-wrapper elementor-open-inline"[^>]*>\s*<\/div>/gi, INLINE_VIDEO)
    .replace(/Al[\s-]?Saif Online Quran Academy/gi, "Al Sabri Online Quran Academy")
    .replace(/Al[\s-]?Saif Quran Academy/gi, "Al Sabri Online Quran Academy")
    .replace(/info@alsaifquranacademy\.com/gi, "alsabrionlinequranacademy@gmail.com")
    .replace(
      /<p[^>]*>Al Saif Online Quran Academy is an easy way for you and your kids to learn Quran and Mathematics online,[\s\S]*?Internet connection\.<\/p>/,
      '<p>Al Sabri Online Quran Academy is an easy way for you and your kids to learn Quran online. All you need is a PC or any device and an internet connection.</p>',
    )
    .replaceAll("/source/images/Al-Saif-Quran-Academy-Header-Logo.png", "/assets/al-sabri-logo.jpeg")
    .replaceAll("./images/Al-Saif-Quran-Academy-Header-Logo.png", "/assets/al-sabri-logo.jpeg")
    .replace(/<img[^>]*src="\/assets\/al-sabri-logo\.jpeg"[^>]*>/gi, '<img src="/assets/al-sabri-logo.jpeg" class="site-brand-logo" alt="Al Sabri Online Quran Academy Logo">')
    .replaceAll(`srcset="https://alsaifquranacademy.com/wp-content/uploads/2024/03/Al-Saif-Quran-Academy-Header-Logo.png 288w, /source/images/Al-Saif-Quran-Academy-Header-Logo-200x50.png 200w"`, "")
    .replaceAll(`srcset="https://alsaifquranacademy.com/wp-content/uploads/2024/03/Al-Saif-Quran-Academy-Header-Logo.png 288w, https://alsaifquranacademy.com/wp-content/uploads/2024/03/Al-Saif-Quran-Academy-Header-Logo-200x50.png 200w"`, "")
    .replaceAll(`sizes="(max-width: 288px) 100vw, 288px"`, "")
    .replaceAll(`alt="Al Saif Quran Academy Header Logo"`, `alt="Al Sabri Online Quran Academy Logo"`)
    .replaceAll("./images/Online-Quran-Academy.webp", "/source/images/quran-reading-r621het3en3sbcs0re6mnfohzeukh852tw4lxh47s8.webp")
    .replaceAll("./images/Quran-academy-in-New-York.webp", "/source/images/Tajweel-Ul-Quran_800x-1-r621eqxk1jgjf4nab8qol3vhe3z4o3kggpl2z92dew.webp")
    .replaceAll("./images/Al-Saif-Quran-Academy.webp", "/source/images/pexels-thirdman-8489077-scaled-r31966rn6083s6l44e2sykj3h8xe05mxvxczpea0yw.webp")
    .replace(/Female Quran Teacher/gi, "Male Female Quran Teacher")
    .replaceAll("https://web.whatsapp.com/send?phone=923336650021", "https://wa.me/923413839634")
    .replaceAll("phone=923336650021", "phone=923413839634")
    .replaceAll("923336650021", "923413839634");
}

export function extractBodyHtml(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1]?.trim() ?? html;
}
