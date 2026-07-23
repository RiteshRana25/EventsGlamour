/**
 * Optimize Cloudinary delivery URLs with auto format/quality and max width.
 * Leaves non-Cloudinary and video URLs unchanged.
 */
export function cld(url, { w = 1200, q = "auto" } = {}) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  // Do not transform video delivery URLs
  if (url.includes("/video/upload/")) return url;
  // Already transformed
  if (/\/upload\/(?:[^/]+,)?f_auto/.test(url)) return url;

  return url.replace("/upload/", `/upload/f_auto,q_${q},w_${w},c_limit/`);
}

/** Hero / full-bleed backgrounds */
export const cldHero = (url) => cld(url, { w: 1600 });

/** Carousel / grid thumbnails */
export const cldThumb = (url) => cld(url, { w: 600 });

/** Lightbox / large overlay */
export const cldLarge = (url) => cld(url, { w: 1600 });
