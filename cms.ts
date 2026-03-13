import { promises as fs } from "fs";
import path from "path";
import { getFirebaseAdminCredentials, getFirebaseConfig } from "./app/lib/firebase-config";

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

type FirestoreField =
  | { stringValue: string }
  | { arrayValue: { values?: FirestoreField[] } }
  | { mapValue: { fields: Record<string, FirestoreField> } };

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreField>;
};

const CMS_PATH = path.join(process.cwd(), "cms-data.json");

const FIREBASE_REQUEST_TIMEOUT_MS = 4000;

let cachedIdToken: { token: string; expiresAt: number } | null = null;

async function readLocalStore(): Promise<CmsStore> {
  const raw = await fs.readFile(CMS_PATH, "utf8");
  return JSON.parse(raw) as CmsStore;
}

async function writeLocalStore(store: CmsStore) {
  await fs.writeFile(CMS_PATH, JSON.stringify(store, null, 2));
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getEntryKey(entry: { type: "course" | "article"; slug: string }) {
  return `${entry.type}:${entry.slug}`;
}

function mergeEntries(localEntries: ManagedEntry[], remoteEntries: ManagedEntry[]) {
  const localKeys = new Set(localEntries.map(getEntryKey));
  return [...localEntries, ...remoteEntries.filter((entry) => !localKeys.has(getEntryKey(entry)))];
}

function getFirestoreBase() {
  return `https://firestore.googleapis.com/v1/projects/${getFirebaseConfig().projectId}/databases/(default)/documents`;
}

function withApiKey(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}key=${getFirebaseConfig().apiKey}`;
}

async function parseResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { raw: text };
  }
}

function toStringValue(value: FirestoreField | undefined) {
  if (!value || !("stringValue" in value)) {
    return "";
  }

  return value.stringValue;
}

function toArrayValue(value: FirestoreField | undefined) {
  if (!value || !("arrayValue" in value)) {
    return [];
  }

  return value.arrayValue.values ?? [];
}

function pointToField(point: ManagedPoint): FirestoreField {
  return {
    mapValue: {
      fields: {
        title: { stringValue: point.title },
        text: { stringValue: point.text },
      },
    },
  };
}

function parsePointField(field: FirestoreField): ManagedPoint {
  if (!("mapValue" in field)) {
    return { title: "", text: "" };
  }

  return {
    title: toStringValue(field.mapValue.fields.title),
    text: toStringValue(field.mapValue.fields.text),
  };
}

function entryToFirestoreDocument(entry: ManagedEntry): FirestoreDocument {
  return {
    fields: {
      type: { stringValue: entry.type },
      slug: { stringValue: entry.slug },
      title: { stringValue: entry.title },
      subtitle: { stringValue: entry.subtitle },
      excerpt: { stringValue: entry.excerpt },
      image: { stringValue: entry.image },
      introTitle: { stringValue: entry.introTitle },
      intro: {
        arrayValue: {
          values: entry.intro.map((item) => ({ stringValue: item })),
        },
      },
      pointsTitle: { stringValue: entry.pointsTitle },
      points: {
        arrayValue: {
          values: entry.points.map(pointToField),
        },
      },
      ctaTitle: { stringValue: entry.ctaTitle },
      ctaText: { stringValue: entry.ctaText },
    },
  };
}

function parseFirestoreDocument(document: FirestoreDocument | undefined): ManagedEntry | null {
  if (!document?.fields) {
    return null;
  }

  const fields = document.fields;

  return {
    type: toStringValue(fields.type) === "article" ? "article" : "course",
    slug: toStringValue(fields.slug),
    title: toStringValue(fields.title),
    subtitle: toStringValue(fields.subtitle),
    excerpt: toStringValue(fields.excerpt),
    image: toStringValue(fields.image),
    introTitle: toStringValue(fields.introTitle),
    intro: toArrayValue(fields.intro)
      .map((item) => toStringValue(item))
      .filter(Boolean),
    pointsTitle: toStringValue(fields.pointsTitle),
    points: toArrayValue(fields.points).map(parsePointField).filter((point) => point.title || point.text),
    ctaTitle: toStringValue(fields.ctaTitle),
    ctaText: toStringValue(fields.ctaText),
  };
}

async function signInFirebaseUser(email: string, password: string) {
  const response = await fetch(
    withApiKey("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(FIREBASE_REQUEST_TIMEOUT_MS),
    },
  );

  const data = (await parseResponse(response)) as
    | { idToken?: string; expiresIn?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !data?.idToken) {
    throw new Error(data?.error?.message || "Unable to sign in to Firebase.");
  }

  return data;
}

async function createFirebaseUser(email: string, password: string) {
  const response = await fetch(withApiKey("https://identitytoolkit.googleapis.com/v1/accounts:signUp"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(FIREBASE_REQUEST_TIMEOUT_MS),
  });

  const data = (await parseResponse(response)) as
    | { idToken?: string; expiresIn?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !data?.idToken) {
    throw new Error(data?.error?.message || "Unable to create Firebase admin user.");
  }

  return data;
}

async function getFirebaseIdToken() {
  if (cachedIdToken && cachedIdToken.expiresAt > Date.now() + 30_000) {
    return cachedIdToken.token;
  }

  const credentials = getFirebaseAdminCredentials();

  try {
    const data = await signInFirebaseUser(credentials.email, credentials.password);
    cachedIdToken = {
      token: data.idToken!,
      expiresAt: Date.now() + Number(data.expiresIn || 3600) * 1000,
    };
    return cachedIdToken.token;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign in to Firebase.";
    const shouldCreate =
      message.includes("EMAIL_NOT_FOUND") ||
      message.includes("INVALID_LOGIN_CREDENTIALS") ||
      message.includes("INVALID_PASSWORD");

    if (!shouldCreate) {
      throw error;
    }

    const created = await createFirebaseUser(credentials.email, credentials.password);
    cachedIdToken = {
      token: created.idToken!,
      expiresAt: Date.now() + Number(created.expiresIn || 3600) * 1000,
    };
    return cachedIdToken.token;
  }
}

async function firebaseRequest(
  url: string,
  init: RequestInit = {},
): Promise<Record<string, unknown> | null> {
  const token = await getFirebaseIdToken();
  const headers = new Headers(init.headers);

  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(withApiKey(url), {
    ...init,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(FIREBASE_REQUEST_TIMEOUT_MS),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const errorMessage =
      (data as { error?: { message?: string } } | null)?.error?.message ||
      `Firebase request failed with ${response.status}.`;
    throw new Error(errorMessage);
  }

  return data;
}

async function getCollectionEntries(
  collection: "courses" | "articles",
): Promise<ManagedEntry[]> {
  const data = (await firebaseRequest(`${getFirestoreBase()}/${collection}`)) as
    | { documents?: FirestoreDocument[] }
    | null;

  return (data?.documents ?? [])
    .map(parseFirestoreDocument)
    .filter((entry): entry is ManagedEntry => Boolean(entry));
}

async function writeEntryToFirebase(entry: ManagedEntry) {
  await firebaseRequest(
    `${getFirestoreBase()}/${entry.type === "course" ? "courses" : "articles"}/${entry.slug}`,
    {
      method: "PATCH",
      body: JSON.stringify(entryToFirestoreDocument(entry)),
    },
  );
}

async function deleteEntryFromFirebase(type: "course" | "article", slug: string) {
  try {
    await firebaseRequest(`${getFirestoreBase()}/${type === "course" ? "courses" : "articles"}/${slug}`, {
      method: "DELETE",
    });
  } catch {
    // Best-effort cleanup. Local fallback still preserves content integrity.
  }
}

async function seedFirebaseFromLocal(localStore: CmsStore) {
  const allEntries = [...localStore.courses, ...localStore.articles];

  for (const entry of allEntries) {
    await writeEntryToFirebase(entry);
  }
}

async function readFirebaseStore(localFallback: CmsStore): Promise<CmsStore> {
  const [courses, articles] = await Promise.all([
    getCollectionEntries("courses"),
    getCollectionEntries("articles"),
  ]);

  const hasRemoteData = courses.length > 0 || articles.length > 0;

  if (hasRemoteData) {
    return {
      courses: mergeEntries(localFallback.courses, courses),
      articles: mergeEntries(localFallback.articles, articles),
    };
  }

  if (localFallback.courses.length || localFallback.articles.length) {
    await seedFirebaseFromLocal(localFallback);
  }

  return localFallback;
}

async function readStore(): Promise<CmsStore> {
  const localStore = await readLocalStore();

  try {
    return await readFirebaseStore(localStore);
  } catch {
    return localStore;
  }
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

export function normalizeEntry(
  input: Partial<ManagedEntry> & { type: "course" | "article"; title: string },
) {
  return {
    type: input.type,
    slug: slugify(input.slug || input.title),
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || input.excerpt?.trim() || "",
    excerpt: input.excerpt?.trim() || "",
    image: input.image?.trim() || "/assets/al-sabri-logo.jpeg",
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

  const localStore = await readLocalStore();
  localStore[key] = [entry, ...localStore[key]];
  await writeLocalStore(localStore);

  try {
    await writeEntryToFirebase(entry);
  } catch {
    // Local JSON remains the source of truth when Firebase is unavailable.
  }

  return entry;
}

export async function updateManagedEntry(
  original: { type: "course" | "article"; slug: string },
  nextEntry: ManagedEntry,
) {
  const store = await readStore();
  const allEntries = [...store.courses, ...store.articles];

  const duplicate = allEntries.some(
    (item) =>
      !(item.type === original.type && item.slug === original.slug) &&
      item.slug === nextEntry.slug,
  );

  if (duplicate) {
    throw new Error("Another entry already uses this slug.");
  }

  const localStore = await readLocalStore();
  const originalKey = original.type === "course" ? "courses" : "articles";
  const nextKey = nextEntry.type === "course" ? "courses" : "articles";

  localStore[originalKey] = localStore[originalKey].filter((item) => item.slug !== original.slug);
  localStore[nextKey] = [nextEntry, ...localStore[nextKey].filter((item) => item.slug !== nextEntry.slug)];

  await writeLocalStore(localStore);

  try {
    await writeEntryToFirebase(nextEntry);

    if (original.slug !== nextEntry.slug || original.type !== nextEntry.type) {
      await deleteEntryFromFirebase(original.type, original.slug);
    }
  } catch {
    // Local JSON remains the source of truth when Firebase is unavailable.
  }

  return nextEntry;
}

export async function deleteManagedEntry(target: { type: "course" | "article"; slug: string }) {
  const store = await readStore();
  const key = target.type === "course" ? "courses" : "articles";
  const existingEntry = store[key].find((item) => item.slug === target.slug);

  if (!existingEntry) {
    throw new Error("Entry not found.");
  }

  const localStore = await readLocalStore();
  localStore[key] = localStore[key].filter((item) => item.slug !== target.slug);
  await writeLocalStore(localStore);

  try {
    await deleteEntryFromFirebase(target.type, target.slug);
  } catch {
    // Local JSON remains the source of truth when Firebase is unavailable.
  }

  return existingEntry;
}

export function getAdminCredentials() {
  return getFirebaseAdminCredentials();
}
