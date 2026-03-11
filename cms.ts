import { promises as fs } from "fs";
import path from "path";

export type ManagedPoint = {
  title: string;
  text: string;
};

export type ManagedEntry = {
  type: "course" | "article";
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  introTitle: string;
  intro: string[];
  pointsTitle: string;
  points: ManagedPoint[];
  ctaTitle: string;
  ctaText: string;
};

type CmsStore = {
  courses: ManagedEntry[];
  articles: ManagedEntry[];
};

const CMS_PATH = path.join(process.cwd(), "cms-data.json");

async function readStore(): Promise<CmsStore> {
  const raw = await fs.readFile(CMS_PATH, "utf8");
  return JSON.parse(raw) as CmsStore;
}

async function writeStore(store: CmsStore) {
  await fs.writeFile(CMS_PATH, JSON.stringify(store, null, 2));
}

export async function getCourses() {
  const store = await readStore();
  return store.courses;
}

export async function getArticles() {
  const store = await readStore();
  return store.articles;
}

export async function getAllManagedEntries() {
  const store = await readStore();
  return [...store.courses, ...store.articles];
}

export async function getManagedEntryBySlug(slug: string) {
  const entries = await getAllManagedEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseLines(input: string) {
  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parsePoints(input: string): ManagedPoint[] {
  return parseLines(input).map((line) => {
    const [title, ...rest] = line.split("|");
    return {
      title: title.trim(),
      text: rest.join("|").trim() || "Detail will be updated soon.",
    };
  });
}

export function normalizeEntry(input: Partial<ManagedEntry> & { type: "course" | "article"; title: string }) {
  return {
    type: input.type,
    slug: slugify(input.slug || input.title),
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || input.excerpt?.trim() || "",
    excerpt: input.excerpt?.trim() || "",
    image: input.image?.trim() || "/assets/al-sabri-logo-transparent.png",
    introTitle: input.introTitle?.trim() || input.title.trim(),
    intro: (input.intro ?? []).map((item) => item.trim()).filter(Boolean),
    pointsTitle: input.pointsTitle?.trim() || "Key Highlights",
    points: (input.points ?? []).filter((point) => point.title.trim() && point.text.trim()),
    ctaTitle: input.ctaTitle?.trim() || "Start Learning Today",
    ctaText: input.ctaText?.trim() || "Contact us to enroll in guided online classes.",
  } satisfies ManagedEntry;
}

export async function addManagedEntry(entry: ManagedEntry) {
  const store = await readStore();
  const key = entry.type === "course" ? "courses" : "articles";

  if (store[key].some((item) => item.slug === entry.slug)) {
    throw new Error("An entry with this slug already exists.");
  }

  store[key] = [entry, ...store[key]];
  await writeStore(store);
  return entry;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}
