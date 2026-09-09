import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
	projectId: 'xg5xa25v',
	dataset: 'production',
	apiVersion: '2026-01-01',
	useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: unknown) {
	return builder.image(source as never);
}
