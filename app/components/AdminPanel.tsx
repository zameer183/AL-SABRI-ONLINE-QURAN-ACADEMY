"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";

type ManagedEntry = {
  type: "course" | "article";
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  introTitle: string;
  intro: string[];
  pointsTitle: string;
  points: Array<{ title: string; text: string }>;
  ctaTitle: string;
  ctaText: string;
};

type FormState = {
  type: "course" | "article";
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  image: string;
  introTitle: string;
  intro: string;
  pointsTitle: string;
  points: string;
  ctaTitle: string;
  ctaText: string;
};

type StatusState = {
  tone: "idle" | "success" | "error" | "info";
  message: string;
};

type EditingState = {
  originalSlug: string;
  originalType: "course" | "article";
} | null;

const initialForm: FormState = {
  type: "course",
  title: "",
  slug: "",
  subtitle: "",
  excerpt: "",
  image: "",
  introTitle: "",
  intro: "",
  pointsTitle: "",
  points: "",
  ctaTitle: "",
  ctaText: "",
};

type NavItem = {
  key: "dashboard" | "courses" | "articles" | "pages" | "media" | "settings";
  label: string;
  activeType?: "all" | "course" | "article";
  disabled?: boolean;
};

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", activeType: "all" as const },
  { key: "courses", label: "Courses", activeType: "course" as const },
  { key: "articles", label: "Articles", activeType: "article" as const },
  { key: "pages", label: "Pages", disabled: true },
  { key: "media", label: "Media", disabled: true },
  { key: "settings", label: "Settings", disabled: true },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function entryToForm(entry: ManagedEntry): FormState {
  return {
    type: entry.type,
    title: entry.title,
    slug: entry.slug,
    subtitle: entry.subtitle,
    excerpt: entry.excerpt,
    image: entry.image,
    introTitle: entry.introTitle,
    intro: entry.intro.join("\n"),
    pointsTitle: entry.pointsTitle,
    points: entry.points.map((point) => `${point.title} | ${point.text}`).join("\n"),
    ctaTitle: entry.ctaTitle,
    ctaText: entry.ctaText,
  };
}

function StatusBanner({ status }: { status: StatusState }) {
  if (!status.message) {
    return null;
  }

  return (
    <div className={`admin-status admin-status--${status.tone}`} role="status" aria-live="polite">
      {status.message}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone: "green" | "gold" | "orange";
}) {
  return (
    <article className={`admin-stat admin-stat--${tone}`}>
      <div className="admin-stat__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="admin-stat__copy">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function FieldSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel-card admin-panel-card--section">
      <div className="admin-panel-card__head">
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
      <div className="admin-field-grid">{children}</div>
    </section>
  );
}

function NavIcon({ kind }: { kind: "dashboard" | "courses" | "articles" | "pages" | "media" | "settings" | "logout" }) {
  switch (kind) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z" fill="currentColor" />
        </svg>
      );
    case "courses":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5 12 2l8 3.5v13L12 22l-8-3.5v-13Zm8 1.03L6 9.16v7.8l6 2.63 6-2.63v-7.8l-6-2.63Z" fill="currentColor" />
        </svg>
      );
    case "articles":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5V4Zm3 3v2h8V7H8Zm0 4v2h8v-2H8Zm0 4v2h5v-2H8Z" fill="currentColor" />
        </svg>
      );
    case "pages":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h9l5 5v13H6V3Zm8 1.5V9h4.5L14 4.5Z" fill="currentColor" />
        </svg>
      );
    case "media":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2 8 3-4 2 3 2-2 3 3H8Z" fill="currentColor" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 8.4 1.2-2.6 2.8.5.4 2.8 2.3 1.5-1.1 2.6 1.1 2.6-2.3 1.5-.4 2.8-2.8.5L12 15.6l-1.2 2.6-2.8-.5-.4-2.8-2.3-1.5 1.1-2.6-1.1-2.6 2.3-1.5.4-2.8 2.8-.5L12 8.4Zm0 5.1a1.5 1.5 0 1 0 0-3.1 1.5 1.5 0 0 0 0 3.1Z" fill="currentColor" />
        </svg>
      );
    case "logout":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 4H4v16h6v-2H6V6h4V4Zm6.59 3L15.17 8.4 17.76 11H9v2h8.76l-2.59 2.59L16.59 17 22 11.59 16.59 7Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function AdminPanel() {
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [entries, setEntries] = useState<{ courses: ManagedEntry[]; articles: ManagedEntry[] }>({
    courses: [],
    articles: [],
  });
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<StatusState>({ tone: "idle", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<"all" | "course" | "article">("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "name">("latest");
  const [editingEntry, setEditingEntry] = useState<EditingState>(null);

  const previewSlug = useMemo(() => form.slug.trim() || slugify(form.title), [form.slug, form.title]);
  const isEditing = Boolean(editingEntry);

  const filteredEntries = useMemo(() => {
    const merged =
      activeType === "all"
        ? [...entries.courses, ...entries.articles]
        : activeType === "course"
          ? entries.courses
          : entries.articles;

    const normalizedSearch = search.toLowerCase().trim();
    const searched = normalizedSearch
      ? merged.filter((entry) =>
          [entry.title, entry.slug, entry.excerpt].join(" ").toLowerCase().includes(normalizedSearch),
        )
      : merged;

    return [...searched].sort((left, right) => {
      if (sortOrder === "name") {
        return left.title.localeCompare(right.title);
      }

      return 0;
    });
  }, [activeType, entries.articles, entries.courses, search, sortOrder]);

  async function loadEntries(email: string, password: string) {
    const response = await fetch("/api/admin/content", {
      headers: {
        "x-admin-email": email,
        "x-admin-password": password,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to load content.");
    }

    setEntries(data);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ tone: "info", message: "Checking admin access..." });

    try {
      await loadEntries(authEmail, authPassword);
      setAdminEmail(authEmail);
      setAdminPassword(authPassword);
      setIsAuthorized(true);
      setStatus({ tone: "success", message: "Dashboard ready. You can now manage courses and articles." });
    } catch (error) {
      setIsAuthorized(false);
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "Unable to load content.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminEmail || !adminPassword) {
      setStatus({ tone: "error", message: "Admin email and password are required before saving content." });
      return;
    }

    setIsLoading(true);
    setStatus({
      tone: "info",
      message: isEditing ? "Updating content..." : "Saving content...",
    });

    const response = await fetch("/api/admin/content", {
      method: isEditing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": adminEmail,
        "x-admin-password": adminPassword,
      },
      body: JSON.stringify(
        editingEntry
          ? {
              ...form,
              originalSlug: editingEntry.originalSlug,
              originalType: editingEntry.originalType,
            }
          : form,
      ),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setStatus({
        tone: "error",
        message:
          data.error || (isEditing ? "Unable to update entry." : "Unable to save entry."),
      });
      return;
    }

    const savedType = form.type;
    const savedSlug = previewSlug;

    setForm({ ...initialForm, type: savedType });
    setEditingEntry(null);
    await loadEntries(adminEmail, adminPassword);
    setIsLoading(false);
    setStatus({
      tone: "success",
      message: isEditing
        ? `Updated successfully. /${savedSlug} is now refreshed on the site.`
        : "Saved successfully. The new entry is now available on the site.",
    });
  }

  function handleQuickCreate(type: "course" | "article") {
    setEditingEntry(null);
    setForm({ ...initialForm, type });
    setActiveType(type);
    document.getElementById("admin-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEditEntry(entry: ManagedEntry) {
    setEditingEntry({
      originalSlug: entry.slug,
      originalType: entry.type,
    });
    setForm(entryToForm(entry));
    setActiveType(entry.type);
    setStatus({
      tone: "info",
      message: `Editing /${entry.slug}. Update the fields below and save when ready.`,
    });
    document.getElementById("admin-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleCancelEdit() {
    setEditingEntry(null);
    setForm((current) => ({ ...initialForm, type: current.type }));
    setStatus({ tone: "idle", message: "" });
  }

  async function handleDeleteEntry(entry: ManagedEntry) {
    if (!adminEmail || !adminPassword) {
      setStatus({ tone: "error", message: "Admin email and password are required before deleting content." });
      return;
    }

    const confirmed = window.confirm(
      `Delete "${entry.title}" (${entry.type})? This will remove /${entry.slug} from the CMS.`,
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);
    setStatus({ tone: "info", message: `Deleting /${entry.slug}...` });

    const response = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": adminEmail,
        "x-admin-password": adminPassword,
      },
      body: JSON.stringify({
        type: entry.type,
        slug: entry.slug,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setStatus({ tone: "error", message: data.error || "Unable to delete entry." });
      return;
    }

    if (
      editingEntry &&
      editingEntry.originalSlug === entry.slug &&
      editingEntry.originalType === entry.type
    ) {
      setEditingEntry(null);
      setForm({ ...initialForm, type: entry.type });
    }

    await loadEntries(adminEmail, adminPassword);
    setIsLoading(false);
    setStatus({ tone: "success", message: `Deleted successfully. /${entry.slug} has been removed.` });
  }

  function handleLogout() {
    setAuthEmail("");
    setAuthPassword("");
    setAdminEmail("");
    setAdminPassword("");
    setIsAuthorized(false);
    setEntries({ courses: [], articles: [] });
    setStatus({ tone: "idle", message: "" });
    setEditingEntry(null);
    setForm(initialForm);
    setSearch("");
    setActiveType("all");
    setSortOrder("latest");
  }

  if (!isAuthorized) {
    return (
      <main className="admin-page">
        <section className="admin-auth-shell">
          <div className="admin-auth-card">
            <div className="admin-auth-card__brand">
              <div className="admin-auth-card__logo">
                <img src="/assets/al-sabri-logo.jpeg" alt="Al Sabri Online Quran Academy" />
              </div>
              <div>
                <p>Admin Access</p>
                <h1>Content Dashboard</h1>
                <span>Manage courses, articles, and guided content from one clean workspace.</span>
              </div>
            </div>

            <form className="admin-auth-form" onSubmit={handleLogin}>
              <label className="admin-field">
                <span>Admin Email</span>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(event) => setAuthEmail(event.target.value)}
                  placeholder="Enter admin email"
                  autoComplete="email"
                />
              </label>
              <label className="admin-field">
                <span>Admin Password</span>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
              </label>
              <button type="submit" className="admin-button admin-button--primary" disabled={isLoading}>
                {isLoading ? "Unlocking..." : "Enter Dashboard"}
              </button>
            </form>

            <div className="admin-auth-card__meta">
              <span>Use your admin credentials to access the dashboard</span>
              <span>Firebase-backed CMS with local JSON fallback</span>
            </div>

            <StatusBanner status={status} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar__brand">
            <div className="admin-sidebar__logo">
              <img src="/assets/al-sabri-logo.jpeg" alt="Al Sabri Online Quran Academy" />
            </div>
            <div>
              <p>Al Sabri</p>
              <strong>Content Dashboard</strong>
              <span>Green branded content management</span>
            </div>
          </div>

          <nav className="admin-sidebar__nav" aria-label="Admin navigation">
            {navItems.map((item) => {
              const active =
                item.key === "dashboard"
                  ? activeType === "all"
                  : item.activeType
                    ? activeType === item.activeType
                    : false;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={`admin-sidebar__item${active ? " is-active" : ""}${item.disabled ? " is-disabled" : ""}`}
                  onClick={() => {
                    if (item.disabled) {
                      return;
                    }
                    setActiveType(item.activeType ?? "all");
                  }}
                  disabled={item.disabled}
                >
                  <span className="admin-sidebar__item-icon">
                    <NavIcon kind={item.key as Parameters<typeof NavIcon>[0]["kind"]} />
                  </span>
                  <span>{item.label}</span>
                  {item.disabled ? <em>Soon</em> : null}
                </button>
              );
            })}
          </nav>

          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <span className="admin-sidebar__item-icon">
              <NavIcon kind="logout" />
            </span>
            <span>Logout</span>
          </button>
        </aside>

        <div className="admin-content">
          <header className="admin-topbar">
            <div className="admin-topbar__copy">
              <p>CMS Workspace</p>
              <h1>Content Dashboard</h1>
              <span>Manage your courses, articles, and guided page content from one place.</span>
            </div>

            <div className="admin-topbar__actions">
              <button type="button" className="admin-button admin-button--secondary" onClick={() => handleQuickCreate("course")}>
                + Add Course
              </button>
              <button type="button" className="admin-button admin-button--primary" onClick={() => handleQuickCreate("article")}>
                + Add Article
              </button>
            </div>
          </header>

          <StatusBanner status={status} />

          <section className="admin-stats" aria-label="Overview">
            <StatCard
              label="Courses"
              value={entries.courses.length}
              tone="green"
              icon={<NavIcon kind="courses" />}
            />
            <StatCard
              label="Articles"
              value={entries.articles.length}
              tone="gold"
              icon={<NavIcon kind="articles" />}
            />
            <StatCard
              label="Total Pages"
              value={entries.courses.length + entries.articles.length}
              tone="orange"
              icon={<NavIcon kind="pages" />}
            />
          </section>

          <div className="admin-workspace">
            <div className="admin-workspace__main">
              <section className="admin-panel-card admin-panel-card--editor" id="admin-editor">
                <div className="admin-panel-card__head">
                  <p>Publishing</p>
                  <h2>{isEditing ? `Edit ${form.type === "course" ? "Course" : "Article"}` : `Add ${form.type === "course" ? "Course" : "Article"}`}</h2>
                  <span>
                    {isEditing
                      ? "Update the selected entry and save the changes to refresh the live page."
                      : "Use the grouped fields below to publish consistent content across the website."}
                  </span>
                </div>

                <div className="admin-editor-switch">
                  <button
                    type="button"
                    className={form.type === "course" ? "is-active" : ""}
                    onClick={() => setForm((current) => ({ ...current, type: "course" }))}
                  >
                    Course
                  </button>
                  <button
                    type="button"
                    className={form.type === "article" ? "is-active" : ""}
                    onClick={() => setForm((current) => ({ ...current, type: "article" }))}
                  >
                    Article
                  </button>
                </div>

                {isEditing ? (
                  <div className="admin-editor-note">
                    <strong>Editing:</strong> /{editingEntry?.originalSlug}
                  </div>
                ) : null}

                <form className="admin-editor-form" onSubmit={handleSubmit}>
                  <FieldSection
                    eyebrow="Section 1"
                    title="Basic Info"
                    description="Core title, slug, subtitle, and artwork for the card and page hero."
                  >
                    <label className="admin-field">
                      <span>Title</span>
                      <input
                        value={form.title}
                        onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                        placeholder="Course or article title"
                      />
                    </label>
                    <label className="admin-field">
                      <span>Slug</span>
                      <input
                        value={form.slug}
                        onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                        placeholder="optional-custom-slug"
                      />
                      <small>Preview: /{previewSlug || "your-page-slug"}</small>
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Subtitle</span>
                      <textarea
                        rows={3}
                        value={form.subtitle}
                        onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))}
                        placeholder="Short supporting subtitle"
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Image URL</span>
                      <input
                        value={form.image}
                        onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
                        placeholder="/assets/your-image.jpeg"
                      />
                    </label>
                  </FieldSection>

                  <FieldSection
                    eyebrow="Section 2"
                    title="Content"
                    description="Card excerpt and introduction text shown on detail pages."
                  >
                    <label className="admin-field admin-field--full">
                      <span>Excerpt</span>
                      <textarea
                        rows={3}
                        value={form.excerpt}
                        onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                        placeholder="Short card description"
                      />
                    </label>
                    <label className="admin-field">
                      <span>Intro Title</span>
                      <input
                        value={form.introTitle}
                        onChange={(event) => setForm((current) => ({ ...current, introTitle: event.target.value }))}
                        placeholder="Intro section heading"
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Intro Paragraphs</span>
                      <textarea
                        rows={6}
                        value={form.intro}
                        onChange={(event) => setForm((current) => ({ ...current, intro: event.target.value }))}
                        placeholder={"Write one paragraph per line"}
                      />
                    </label>
                  </FieldSection>

                  <FieldSection
                    eyebrow="Section 3"
                    title="Highlights"
                    description="Structured bullet content for the benefit or learning points area."
                  >
                    <label className="admin-field">
                      <span>Points Title</span>
                      <input
                        value={form.pointsTitle}
                        onChange={(event) => setForm((current) => ({ ...current, pointsTitle: event.target.value }))}
                        placeholder="Points section title"
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>Points</span>
                      <textarea
                        rows={6}
                        value={form.points}
                        onChange={(event) => setForm((current) => ({ ...current, points: event.target.value }))}
                        placeholder={"One point per line: Title | Detail"}
                      />
                    </label>
                  </FieldSection>

                  <FieldSection
                    eyebrow="Section 4"
                    title="Call to Action"
                    description="Controls the closing CTA used on the detail page."
                  >
                    <label className="admin-field">
                      <span>CTA Title</span>
                      <input
                        value={form.ctaTitle}
                        onChange={(event) => setForm((current) => ({ ...current, ctaTitle: event.target.value }))}
                        placeholder="CTA heading"
                      />
                    </label>
                    <label className="admin-field admin-field--full">
                      <span>CTA Text</span>
                      <textarea
                        rows={4}
                        value={form.ctaText}
                        onChange={(event) => setForm((current) => ({ ...current, ctaText: event.target.value }))}
                        placeholder="CTA supporting text"
                      />
                    </label>
                  </FieldSection>

                  <div className="admin-form-actions">
                    <div>
                      <strong>{isEditing ? "Ready to update" : "Ready to publish"}</strong>
                      <span>
                        Courses and articles are saved to the CMS with Firebase sync when it is
                        available.
                      </span>
                    </div>
                    <div className="admin-form-actions__buttons">
                      {isEditing ? (
                        <button
                          type="button"
                          className="admin-button admin-button--secondary"
                          onClick={handleCancelEdit}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                      ) : null}
                      <button type="submit" className="admin-button admin-button--primary" disabled={isLoading}>
                        {isLoading
                          ? isEditing
                            ? "Updating..."
                            : "Saving..."
                          : `${isEditing ? "Update" : "Save"} ${form.type === "course" ? "Course" : "Article"}`}
                      </button>
                    </div>
                  </div>
                </form>
              </section>

              <section className="admin-panel-card admin-panel-card--preview">
                <div className="admin-panel-card__head">
                  <p>Preview</p>
                  <h2>Live Preview</h2>
                  <span>Quick visual summary of the content currently in the editor.</span>
                </div>

                <article className="admin-preview-card">
                  <span className="admin-preview-card__badge">
                    {form.type === "course" ? "Course page" : "Article page"}
                  </span>
                  <h3>{form.title || "Your content title will appear here"}</h3>
                  <p>{form.subtitle || form.excerpt || "Add a subtitle or excerpt to see the preview summary."}</p>
                  <dl>
                    <div>
                      <dt>Slug</dt>
                      <dd>/{previewSlug || "your-page-slug"}</dd>
                    </div>
                    <div>
                      <dt>Intro Title</dt>
                      <dd>{form.introTitle || "Intro section title"}</dd>
                    </div>
                    <div>
                      <dt>CTA</dt>
                      <dd>{form.ctaTitle || "Start Learning Today"}</dd>
                    </div>
                  </dl>
                </article>
              </section>
            </div>

            <aside className="admin-panel-card admin-panel-card--library">
              <div className="admin-panel-card__head">
                <p>Library</p>
                <h2>Existing Content</h2>
                <span>Search, sort, and review the content already available on the site.</span>
              </div>

              <div className="admin-library-controls">
                <label className="admin-field admin-field--search">
                  <span>Search</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search courses or articles"
                  />
                </label>
                <label className="admin-field admin-field--sort">
                  <span>Sort</span>
                  <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "latest" | "name")}>
                    <option value="latest">Latest</option>
                    <option value="name">Name</option>
                  </select>
                </label>
              </div>

              <div className="admin-library-filters" role="tablist" aria-label="Entry filters">
                <button
                  type="button"
                  className={activeType === "all" ? "is-active" : ""}
                  onClick={() => setActiveType("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={activeType === "course" ? "is-active" : ""}
                  onClick={() => setActiveType("course")}
                >
                  Courses
                </button>
                <button
                  type="button"
                  className={activeType === "article" ? "is-active" : ""}
                  onClick={() => setActiveType("article")}
                >
                  Articles
                </button>
              </div>

              <div className="admin-library-list">
                {filteredEntries.length ? (
                  filteredEntries.map((entry) => (
                    <article
                      key={`${entry.type}-${entry.slug}`}
                      className={`admin-entry-card${
                        editingEntry &&
                        editingEntry.originalSlug === entry.slug &&
                        editingEntry.originalType === entry.type
                          ? " is-editing"
                          : ""
                      }`}
                    >
                      <div className="admin-entry-card__meta">
                        <span className={`admin-entry-card__type admin-entry-card__type--${entry.type}`}>
                          {entry.type}
                        </span>
                        <a href={`/${entry.slug}`} target="_blank" rel="noreferrer">
                          /{entry.slug}
                        </a>
                      </div>
                      <strong>{entry.title}</strong>
                      <p>{entry.excerpt}</p>
                      <div className="admin-entry-card__actions">
                        <button
                          type="button"
                          className="admin-button admin-button--ghost admin-button--small"
                          onClick={() => handleEditEntry(entry)}
                          disabled={isLoading}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-button admin-button--danger admin-button--small"
                          onClick={() => handleDeleteEntry(entry)}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                        <a href={`/${entry.slug}`} target="_blank" rel="noreferrer">
                          Open page
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="admin-empty-state">
                    <strong>No entries found</strong>
                    <span>Adjust the search or filter to find the content you need.</span>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
