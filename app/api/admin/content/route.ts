import { NextRequest, NextResponse } from "next/server";
import {
  addManagedEntry,
  deleteManagedEntry,
  getAdminCredentials,
  getArticles,
  getCourses,
  normalizeEntry,
  parseLines,
  parsePoints,
  updateManagedEntry,
} from "../../../../cms";

function ensureAuthorized(request: NextRequest) {
  try {
    const credentials = getAdminCredentials();

    if (
      request.headers.get("x-admin-email") === credentials.email &&
      request.headers.get("x-admin-password") === credentials.password
    ) {
      return null;
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admin environment is not configured.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authorizationError = ensureAuthorized(request);
  if (authorizationError) {
    return authorizationError;
  }

  const [courses, articles] = await Promise.all([getCourses(), getArticles()]);
  return NextResponse.json({ courses, articles });
}

export async function POST(request: NextRequest) {
  const authorizationError = ensureAuthorized(request);
  if (authorizationError) {
    return authorizationError;
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

export async function PATCH(request: NextRequest) {
  const authorizationError = ensureAuthorized(request);
  if (authorizationError) {
    return authorizationError;
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

  if (!body.originalSlug || !body.originalType) {
    return NextResponse.json(
      { error: "Original slug and type are required for editing." },
      { status: 400 },
    );
  }

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
    const updated = await updateManagedEntry(
      {
        type: body.originalType,
        slug: body.originalSlug,
      },
      entry,
    );
    return NextResponse.json({ entry: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const authorizationError = ensureAuthorized(request);
  if (authorizationError) {
    return authorizationError;
  }

  const body = await request.json();

  if (!body.slug || !body.type) {
    return NextResponse.json({ error: "Slug and type are required for deletion." }, { status: 400 });
  }

  try {
    const deleted = await deleteManagedEntry({
      type: body.type,
      slug: body.slug,
    });
    return NextResponse.json({ entry: deleted });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
