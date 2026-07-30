import { Helmet } from "react-helmet-async";

const SITE_URL = "https://dealora-alpha.vercel.app";

const SEO = ({
  title,
  description,
  keywords = "e-commerce, shopping, sneakers, fashion, online store",
  image = "og-image.webp",
  url = SITE_URL,
  type = "website",
}) => {
  const metaTitle = title
    ? `${title} | Dealora`
    : "Dealora | Premium E-commerce Platform";

  const metaDescription =
    description ||
    "Shop premium sneakers with exclusive deals, fast delivery, secure payments, and guaranteed quality.";

  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}/${image.replace(/^\/+/, "")}`;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{metaTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow" />
      <meta name="author" content="Dealora" />
      <meta name="theme-color" content="#f97316" />

      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dealora" />
      <meta
        property="og:title"
        content="Dealora - Premium E-commerce Platform"
      />
      <meta
        property="og:description"
        content="Shop premium sneakers with exclusive deals, fast delivery, secure payments, and guaranteed quality."
      />
      <meta property="og:url" content="https://dealora-alpha.vercel.app/" />

      <meta
        property="og:image"
        content="https://dealora-alpha.vercel.app/og-image.webp"
      />
      <meta
        property="og:image:secure_url"
        content="https://dealora-alpha.vercel.app/og-image.webp"
      />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Dealora - Premium E-commerce Platform"
      />
      <meta
        name="twitter:description"
        content="Shop premium sneakers with exclusive deals, fast delivery, secure payments, and guaranteed quality."
      />
      <meta
        name="twitter:image"
        content="https://dealora-alpha.vercel.app/og-image.webp"
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dealora" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />

      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metaTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Optional */}
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
};

export default SEO;
