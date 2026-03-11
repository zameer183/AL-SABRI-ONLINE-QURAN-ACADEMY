import { notFound } from "next/navigation";
import Script from "next/script";
import { pageData } from "../generated/page-data";
import { Header } from "./header";
import { NavbarBehavior } from "./navbar-behavior";
import { SiteFooter } from "./site-footer";
import { extractBodyHtml, transformSiteHtml } from "./html-utils";

type OriginPageProps = {
  slug: string;
};

export async function OriginPage({ slug }: OriginPageProps) {
  const response = await fetch(`https://alsaifquranacademy.com/${slug}/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const html = await response.text();
  const bodyHtml = extractBodyHtml(html);
  const siteBodyHtml = transformSiteHtml(bodyHtml, {
    stripHeader: true,
    stripFooter: true,
  });

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

  return (
    <>
      <NavbarBehavior />
      <Header />
      <main className={`custom-page-shell custom-page-shell--${slug}`}>
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: siteBodyHtml }} />
      </main>
      <SiteFooter />
      {allowedScripts.map((src, index) => (
        <Script key={`${src}-${index}`} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
