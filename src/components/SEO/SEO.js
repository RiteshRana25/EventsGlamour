import { Helmet } from "react-helmet";

const SITE_URL = "https://www.eventsglamour.com";
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764402017/IMG_1049_sehxxs.jpg";
const SITE_NAME = "Events Glamour";

/**
 * Page-level SEO via react-helmet (already in the project).
 * Pass unique title + description per route; defaults fill OG/Twitter/canonical.
 */
const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const fullTitle = title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
export { SITE_URL, DEFAULT_IMAGE, SITE_NAME };
