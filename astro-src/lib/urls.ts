export function chapterUrl(chapterId: string) {
  return `chapter/${chapterId}/`;
}

export function sectionUrl(chapterId: string, sectionId: string) {
  return `chapter/${chapterId}/section/${sectionId}/`;
}
