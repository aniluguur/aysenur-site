import { urlFor } from "./sanity";
export interface SanityImage {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
}
export function imageUrl(
  source: SanityImage | null | undefined,
  width = 1200,
  fallback = "/images/engineering.jpg",
) {
  return source?.asset
    ? urlFor(source).width(width).auto("format").fit("max").url()
    : fallback;
}
export function sectorImage(slug?: string) {
  return slug === "tarim"
    ? "/images/field.jpg"
    : slug === "mekanik"
      ? "/images/engineering.jpg"
      : "/images/planning.jpg";
}
export function projectImage(slug?: string, category?: string) {
  if (slug === "antalya-sulama-sistemi") return "/images/agriculture.jpg";
  if (slug === "bursa-ekipman-montaji") return "/images/installation.jpg";
  return sectorImage(category);
}
export function projectDate(value?: string) {
  if (!value || !/^\d{4}-\d{2}/.test(value)) return "";
  const date = new Date(
    value.length === 7
      ? `${value}-01T12:00:00Z`
      : `${value.slice(0, 10)}T12:00:00Z`,
  );
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("tr-TR", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}
export function hasContent(value?: string) {
  return Boolean(value?.trim() && !value.includes("["));
}
