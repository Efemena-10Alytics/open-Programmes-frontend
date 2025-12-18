export function extractFileIdFromGoogleLink(
  link: string | undefined
): string | null {
  if (!link) return null;
  const regex = /\/d\/(.+?)\/view/;
  const match = link.match(regex);
  return match ? match[1] : null;
}
