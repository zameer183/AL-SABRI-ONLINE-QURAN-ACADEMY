import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourceDir = path.join(root, "alsaifquranacademy.com-1773068910131");
const htmlPath = path.join(sourceDir, "index.html");
const outputPath = path.join(root, "generated", "page-data.ts");

const html = fs.readFileSync(htmlPath, "utf8");

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);

if (!headMatch || !bodyMatch) {
  throw new Error("Could not parse source HTML");
}

const head = headMatch[1];
let bodyHtml = bodyMatch[2];
const bodyAttrs = bodyMatch[1];

const bodyClassName =
  bodyAttrs.match(/class="([^"]*)"/i)?.[1].replace(/\s+/g, " ").trim() ?? "";

const stylesheetHrefs = [...head.matchAll(/<link[^>]+href="([^"]+)"[^>]*>/gi)]
  .map((match) => match[1])
  .filter((href) => href.startsWith("./styles/"))
  .map((href) => `/source/${path.basename(href)}`);

const inlineStyles = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  .map((match) => match[1].trim())
  .filter(Boolean);

const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"[^>]*><\/script>/gi)]
  .map((match) => match[1])
  .filter((src) => src.startsWith("./scripts/"))
  .filter((src) => {
    const cleaned = src.replace(/^\.\//, "");
    return fs.existsSync(path.join(sourceDir, cleaned));
  })
  .filter(
    (src) =>
      !src.includes("clarity") &&
      !src.includes("gtm") &&
      !src.includes("show_ads") &&
      !src.includes("adsbygoogle") &&
      !src.includes("identity") &&
      !src.includes("id5-api") &&
      !src.includes("requests") &&
      !src.includes("extend-native-history-api")
  )
  .map((src) => `/source/scripts/${path.basename(src)}`);

bodyHtml = bodyHtml
  .replace(/<noscript>[\s\S]*?<\/noscript>/gi, "")
  .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
  .replace(/<ins[^>]*adsbygoogle[\s\S]*?<\/ins>/gi, "")
  .replace(/<link[^>]+rel="stylesheet"[\s\S]*?>/gi, "")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/\s(?:bis_[a-z0-9_-]+|bis_use|bis_register|bis_skin_checked|__processed_[^=]+|data-google-query-id|data-gtm-[^=]+|data-ad-[^=]+)="[^"]*"/gi, "")
  .replace(/\sstyle="position:\s*fixed; width:\s*[^"]*"/gi, "")
  .replace(/="\.\//g, '="/source/')
  .replace(/\/source\/styles\/([^"/]+)"/gi, '/source/$1"')
  .replace(
    /https:\/\/alsaifquranacademy\.com\/wp-content\/uploads\/(?:\d{4}\/\d{2}\/)?([^"/]+)"/gi,
    '/source/images/$1"'
  )
  .replace(/="\/*images\/([^"/]+)"/gi, '="/source/images/$1"')
  .replace(/\s{2,}/g, " ")
  .trim();

const pageDataSource = `export const pageData = ${JSON.stringify(
  {
    head: {
      links: stylesheetHrefs,
      inlineStyles,
    },
    body: {
      className: bodyClassName,
      html: bodyHtml,
    },
    scripts: scriptSources,
  },
  null,
  2
)} as const;\n`;

fs.writeFileSync(outputPath, pageDataSource);
