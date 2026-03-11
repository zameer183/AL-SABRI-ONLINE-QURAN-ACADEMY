import { pageData } from "../generated/page-data";
import { transformSiteHtml } from "./html-utils";

export const siteHtml = transformSiteHtml(pageData.body.html, {
  stripHeader: true,
  stripHero: true,
  stripFooter: true,
});
