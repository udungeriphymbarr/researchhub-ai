import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  keywords,
  image = "/logo192.png",
  url = "https://researchhub-ai.vercel.app",
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ResearchHub AI" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;