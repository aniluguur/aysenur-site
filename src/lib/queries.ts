import type { SanityImage } from "./media";
import { sanityClient } from "./sanity";

export interface Category {
  coverImage?: SanityImage;
  _id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
}

export interface TechnicalInfoItem {
  label: string;
  value: string;
}

export interface Project {
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  _id: string;
  title: string;
  slug: string;
  category: { title: string; slug: string } | null;
  shortDescription: string;
  description: unknown;
  location: string;
  projectDate: string;
  technicalInfo: TechnicalInfoItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HomePage {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  stats: StatItem[];
  testimonialQuote: string;
  testimonialAuthorName: string;
  testimonialAuthorCompany: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface AboutPage {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  storyParagraphs: string[];
  values: ValueItem[];
}

export interface ContactPage {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  companyName: string;
  footerTagline: string;
  socialLinks: SocialLink[];
}

const categoryProjection = `{
	_id,
	title,
	"slug": slug.current,
	description,
	order,
	coverImage
}`;

const projectProjection = `{
	_id,
	title,
	"slug": slug.current,
	"category": category->{title, "slug": slug.current},
	shortDescription,
	description,
	location,
	projectDate,
	technicalInfo[]{label, value},
	coverImage,
	gallery
}`;

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(order asc) ${categoryProjection}`,
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0] ${categoryProjection}`,
    { slug },
  );
}

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project"] | order(projectDate desc) ${projectProjection}`,
  );
}

export async function getProjectsByCategory(
  categorySlug: string,
): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project" && category->slug.current == $categorySlug] | order(projectDate desc) ${projectProjection}`,
    { categorySlug },
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`,
    {
      slug,
    },
  );
}

export async function getHomePage(): Promise<HomePage | null> {
  return sanityClient.fetch(`*[_type == "homePage"][0]{
		heroEyebrow,
		heroTitle,
		heroDescription,
		stats[]{value, label},
		testimonialQuote,
		testimonialAuthorName,
		testimonialAuthorCompany
	}`);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityClient.fetch(`*[_type == "aboutPage"][0]{
		heroEyebrow,
		heroTitle,
		heroDescription,
		storyParagraphs,
		values[]{title, description}
	}`);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return sanityClient.fetch(`*[_type == "contactPage"][0]{
		heroEyebrow,
		heroTitle,
		heroDescription,
		address,
		phone,
		email
	}`);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]{
		companyName,
		footerTagline,
		socialLinks[]{label, url}
	}`);
}
