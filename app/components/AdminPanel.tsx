"use client";

import { FormEvent, useEffect, useState } from "react";

type ManagedEntry = {
  type: "course" | "article";
  slug: string;
  title: string;
  excerpt: string;
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

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<{ courses: ManagedEntry[]; articles: ManagedEntry[] }>({
    courses: [],
    articles: [],
  });
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState("");

  async function loadEntries(adminPassword: string) {
    const response = await fetch("/api/admin/content", {
      headers: {
        "x-admin-password": adminPassword,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to load content.");
    }

    setEntries(data);
  }

  useEffect(() => {
    if (!password) {
      return;
    }

    loadEntries(password).catch((error) => {
      setStatus(error instanceof Error ? error.message : "Unable to load content.");
    });
  }, [password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "Unable to save entry.");
      return;
    }

    setStatus("Saved successfully.");
    setForm({ ...initialForm, type: form.type });
    await loadEntries(password);
  }

  return (
    <main className="admin-page">
      <section className="admin-page__hero">
        <div className="admin-page__hero-content">
          <h1>Admin Panel</h1>
          <p>Add new courses and articles from one place.</p>
        </div>
      </section>

      <section className="admin-page__section">
        <div className="admin-page__auth">
          <label>
            <span>Admin Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
            />
          </label>
          <p className="admin-page__hint">Default password: admin123</p>
        </div>

        <div className="admin-page__grid">
          <section className="admin-card">
            <h2>Add Content</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                <span>Type</span>
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      type: event.target.value as "course" | "article",
                    }))
                  }
                >
                  <option value="course">Course</option>
                  <option value="article">Article</option>
                </select>
              </label>
              <label>
                <span>Title</span>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Title"
                />
              </label>
              <label>
                <span>Slug</span>
                <input
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  placeholder="optional-custom-slug"
                />
              </label>
              <label>
                <span>Subtitle</span>
                <textarea
                  rows={3}
                  value={form.subtitle}
                  onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))}
                  placeholder="Short subtitle"
                />
              </label>
              <label>
                <span>Excerpt</span>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                  placeholder="Card excerpt"
                />
              </label>
              <label>
                <span>Image URL</span>
                <input
                  value={form.image}
                  onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
                  placeholder="/assets/your-image.svg"
                />
              </label>
              <label>
                <span>Intro Title</span>
                <input
                  value={form.introTitle}
                  onChange={(event) => setForm((current) => ({ ...current, introTitle: event.target.value }))}
                  placeholder="Intro section title"
                />
              </label>
              <label>
                <span>Intro Paragraphs</span>
                <textarea
                  rows={5}
                  value={form.intro}
                  onChange={(event) => setForm((current) => ({ ...current, intro: event.target.value }))}
                  placeholder={"One paragraph per line"}
                />
              </label>
              <label>
                <span>Points Title</span>
                <input
                  value={form.pointsTitle}
                  onChange={(event) => setForm((current) => ({ ...current, pointsTitle: event.target.value }))}
                  placeholder="Points section title"
                />
              </label>
              <label>
                <span>Points</span>
                <textarea
                  rows={6}
                  value={form.points}
                  onChange={(event) => setForm((current) => ({ ...current, points: event.target.value }))}
                  placeholder={"Use one line per point: Title | Detail"}
                />
              </label>
              <label>
                <span>CTA Title</span>
                <input
                  value={form.ctaTitle}
                  onChange={(event) => setForm((current) => ({ ...current, ctaTitle: event.target.value }))}
                  placeholder="CTA title"
                />
              </label>
              <label>
                <span>CTA Text</span>
                <textarea
                  rows={3}
                  value={form.ctaText}
                  onChange={(event) => setForm((current) => ({ ...current, ctaText: event.target.value }))}
                  placeholder="CTA text"
                />
              </label>
              <button type="submit">Save Content</button>
            </form>
            {status ? <p className="admin-card__status">{status}</p> : null}
          </section>

          <section className="admin-card">
            <h2>Existing Courses</h2>
            <div className="admin-list">
              {entries.courses.map((entry) => (
                <article key={entry.slug}>
                  <strong>{entry.title}</strong>
                  <span>/{entry.slug}</span>
                </article>
              ))}
            </div>

            <h2>Existing Articles</h2>
            <div className="admin-list">
              {entries.articles.map((entry) => (
                <article key={entry.slug}>
                  <strong>{entry.title}</strong>
                  <span>/{entry.slug}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
