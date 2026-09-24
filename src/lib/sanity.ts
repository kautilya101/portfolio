import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { toHTML, escapeHTML, uriLooksSafe } from '@portabletext/to-html';
import type { RichText, SanityImage } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) ?? 'production';
const apiVersion = (import.meta.env.SANITY_API_VERSION as string | undefined) ?? '2025-01-01';
const token = import.meta.env.SANITY_READ_TOKEN as string | undefined;

export const isSanityConfigured = Boolean(projectId);

export const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: !token, token, perspective: 'published' })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2000];

export function hasImage(image?: SanityImage | null): image is SanityImage {
  return Boolean(image?.asset && (image.asset._id || image.asset._ref || image.asset.url));
}

export function imageDimensions(image: SanityImage, fallbackRatio = 4 / 3) {
  const d = image.asset?.metadata?.dimensions;
  const ratio = d?.aspectRatio ?? fallbackRatio;
  return { ratio, width: d?.width ?? 1600, height: d?.height ?? Math.round(1600 / ratio) };
}

export function imageUrl(image: SanityImage, width: number, height?: number) {
  if (!builder) return image.asset?.url ?? '';
  let b = builder.image(image).width(width).auto('format').quality(72).fit('max');
  if (height) b = b.height(height).fit('crop');
  return b.url();
}

export function imageSrcSet(image: SanityImage, ratio?: number) {
  const max = image.asset?.metadata?.dimensions?.width ?? 2000;
  const widths = IMAGE_WIDTHS.filter((w) => w <= max);
  if (!widths.length) widths.push(max);
  return widths.map((w) => `${imageUrl(image, w, ratio ? Math.round(w / ratio) : undefined)} ${w}w`).join(', ');
}

export function richTextToHtml(value: RichText) {
  if (!value) return '';
  if (typeof value === 'string') {
    return value
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHTML(p)}</p>`)
      .join('');
  }
  return toHTML(value, {
    components: {
      marks: {
        link: ({ children, value: mark }) => {
          const href = typeof mark?.href === 'string' ? mark.href : '';
          if (!uriLooksSafe(href)) return children;
          const external = /^https?:\/\//.test(href);
          return `<a href="${escapeHTML(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${children}</a>`;
        }
      }
    }
  });
}

export function plainText(value: RichText) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value
    .map((block) =>
      'children' in block && Array.isArray(block.children)
        ? block.children.map((c) => ('text' in c && typeof c.text === 'string' ? c.text : '')).join('')
        : ''
    )
    .join(' ');
}
