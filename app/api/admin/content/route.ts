import { NextRequest, NextResponse } from "next/server";
import {
  addManagedEntry,
  getAdminPassword,
  getArticles,
  getCourses,
  normalizeEntry,
  parseLines,
  parsePoints,
} from "../../../../cms";

function isAuthorized(request: NextRequest) {
  return request.headers.get("x-admin-password") === getAdminPassword();
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [courses, articles] = await Promise.all([getCourses(), getArticles()]);
  return NextResponse.json({ courses, articles });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const entry = normalizeEntry({
    type: body.type,
    title: body.title,
    slug: body.slug,
    subtitle: body.subtitle,
    excerpt: body.excerpt,
    image: body.image,
    introTitle: body.introTitle,
    intro: parseLines(body.intro ?? ""),
    pointsTitle: body.pointsTitle,
    points: parsePoints(body.points ?? ""),
    ctaTitle: body.ctaTitle,
    ctaText: body.ctaText,
  });

  if (!entry.title || !entry.slug || !entry.excerpt) {
    return NextResponse.json({ error: "Title, slug, and excerpt are required." }, { status: 400 });
  }

  if (entry.intro.length === 0 || entry.points.length === 0) {
    return NextResponse.json(
      { error: "Intro paragraphs and points are required." },
      { status: 400 },
    );
  }

  try {
    const created = await addManagedEntry(entry);
    return NextResponse.json({ entry: created });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
