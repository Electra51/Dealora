import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image = "/assets/images/og-image.webp",
  url = "https://dealora-alpha.vercel.app/",
  type = "website",
}) => {
  const metaTitle = title
    ? `${title} | Dealora`
    : "Dealora | Premium E-commerce Platform";

  const metaDescription =
    description ??
    "Shop premium sneakers with exclusive deals, fast delivery, secure payments, and guaranteed quality.";

  return (
    <Helmet>
      <title>{metaTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow" />
      <meta name="author" content="Dealora" />
      <meta name="theme-color" content="#f97316" />

      <link rel="canonical" href={url} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Dealora" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;