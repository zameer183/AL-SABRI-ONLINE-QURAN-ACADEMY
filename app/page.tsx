import Script from "next/script";
import { pageData } from "../generated/page-data";
import { Header } from "./header";
import { Hero } from "./hero";
import { NavbarBehavior } from "./navbar-behavior";
import { SiteFooter } from "./site-footer";
import { siteHtml } from "./site-html";

const allowedScripts = pageData.scripts.filter(
  (src) =>
    !src.includes("wp-emoji-release.min.js") &&
    !src.includes("cmp.min.js") &&
    !src.includes("sa.min.js") &&
    !src.includes("cht-front-script.min.js") &&
    !src.includes("googlesitekit-events-provider") &&
    !src.includes("webpack-pro.runtime.min.js") &&
    !src.includes("www-widgetapi.js") &&
    !src.includes("frontend.min.js"),
);

export default function HomePage() {
  return (
    <>
      <NavbarBehavior />
      <Header />
      <Hero />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: siteHtml }} />
      <SiteFooter />
      {allowedScripts.map((src, index) => (
        <Script key={`${src}-${index}`} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
