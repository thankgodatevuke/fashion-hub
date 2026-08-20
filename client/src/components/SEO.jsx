// client/src/components/SEO.jsx
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "ÉLYSÉE — Luxury Fashion House",
  description = "Where architectural precision meets draped fluidity. Discover the new collection of luxury fashion for men and women.",
  keywords = "luxury fashion, designer clothing, women's fashion, men's fashion, premium clothing",
  image = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
  url = "https://tgdev.com",
  type = "website",
}) => {
  const siteTitle = "ÉLYSÉE";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;
