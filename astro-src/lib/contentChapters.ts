import { type CollectionEntry, getCollection } from 'astro:content';
import { chapterTitles } from './chapterTitles';

export type Chapter = {
  id: string;
  title: string;
  intro?: {
    entryId: string;
    title: string;
  };
  sections: Array<{
    id: string; // e.g. "1.7"
    title: string;
    entryId: string; // content entry id for getEntry()
    order: number;
  }>;
};

type ParsedEntry =
  | {
      kind: 'intro';
      chapterId: string;
    }
  | {
      kind: 'section';
      chapterId: string;
      sectionId: string;
      order: number;
    };

function parseEntryId(entryId: string): ParsedEntry | null {
  // Intro: "ch1/ch1.md"
  const introMatch = /^ch(\d+)\/ch\1(?:\.md)?$/.exec(entryId);
  if (introMatch) {
    return { kind: 'intro', chapterId: String(Number(introMatch[1])) };
  }

  // Section: "ch1/ch1-07.md"
  const sectionMatch = /^ch(\d+)\/ch\1-(\d{2})(?:\.md)?$/.exec(entryId);
  if (sectionMatch) {
    const chapterId = String(Number(sectionMatch[1]));
    const sectionNum = Number(sectionMatch[2]);
    const sectionId = `${chapterId}.${sectionNum}`;
    return { kind: 'section', chapterId, sectionId, order: sectionNum };
  }

  return null;
}

function parseTitleFromMarkdownBody(body: string, fallback: string) {
  const line = body.split('\n').find((l) => l.trim().startsWith('#'));
  const raw = line ? line.replace(/^#+\s*/, '').trim() : fallback;
  const withoutSuffix = raw.replace(/\s*-\s*Go语言圣经\s*$/i, '').trim();
  // Some sources include numbering like "1.7. Web服务" in the heading; strip it for display.
  const withoutLeadingNumber = withoutSuffix.replace(/^\d+(?:\.\d+)+\.?\s*/g, '').trim();
  return withoutLeadingNumber || withoutSuffix || fallback;
}

export async function getChaptersFromContent(): Promise<Chapter[]> {
  const entries = (await getCollection('sections')) as Array<CollectionEntry<'sections'>>;

  const byChapter = new Map<string, Chapter>();
  for (const entry of entries) {
    const parsed = parseEntryId(entry.id);
    if (!parsed) continue;

    const chapter =
      byChapter.get(parsed.chapterId) ??
      (() => {
        const created: Chapter = {
          id: parsed.chapterId,
          title: chapterTitles[parsed.chapterId] ?? `第 ${parsed.chapterId} 章`,
          sections: [],
        };
        byChapter.set(parsed.chapterId, created);
        return created;
      })();

    if (parsed.kind === 'intro') {
      const title = parseTitleFromMarkdownBody(entry.body ?? '', chapter.title);
      chapter.intro = { entryId: entry.id, title };
    } else {
      const titleFallback = parsed.sectionId;
      const title = parseTitleFromMarkdownBody(entry.body ?? '', titleFallback);
      chapter.sections.push({
        id: parsed.sectionId,
        title,
        entryId: entry.id,
        order: parsed.order,
      });
    }
  }

  const chapters = Array.from(byChapter.values()).sort((a, b) => Number(a.id) - Number(b.id));
  for (const chapter of chapters) {
    chapter.sections.sort((a, b) => a.order - b.order);
  }
  return chapters;
}

export async function getChapterFromContent(chapterId: string) {
  const chapters = await getChaptersFromContent();
  return chapters.find((c) => c.id === chapterId);
}

export async function getSectionFromContent(sectionId: string) {
  const chapters = await getChaptersFromContent();
  for (const chapter of chapters) {
    const section = chapter.sections.find((s) => s.id === sectionId);
    if (section) return { chapter, section };
  }
  return undefined;
}
