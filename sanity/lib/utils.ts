import createImageUrlBuilder from '@sanity/image-url';

import { dataset, projectId } from '@/sanity/lib/api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

export function resolveHref(
  type: string,
  slug?: string,
  language: string = 'hr'
) {
  if (!slug) return undefined;

  switch (type) {
    case 'post':
      return `/${language}/posts/${slug}`;
    case 'about':
      return `/${language}/about`;
    case 'contact':
      return `/${language}/contact`;
    default:
      return undefined;
  }
}
