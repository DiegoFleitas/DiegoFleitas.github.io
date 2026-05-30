/** Returns the timeline node image URL when using a local logo path (e.g. /logos/foo.png). */
export function getTimelineImageUrl(logoUrl: string | undefined): string | null {
  return logoUrl ?? null
}
