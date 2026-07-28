import { Helmet } from "react-helmet-async";

function SEO({
  title = "ResearchHub AI",
  description = "AI-powered academic research assistant for students.",
  keywords = "ResearchHub AI, research, AI, project writing",
  image = "https://researchhub-ai-one.vercel.app/logo.png",
  url = "https://researchhub-ai-one.vercel.app",
}) {
  return (
    <Helmet>
      {/* Basic SEO */}

      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="author" content="ResearchHub AI" />

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      {/* Google Verification */}

      <meta
        name="google-site-verification"
        content="kDKplqK2vGYHi-jxpPVHnnIRGyRKqi6EoPxfMw6ewuQ"
      />

      {/* Open Graph */}

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta property="og:url" content={url} />

      <meta property="og:type" content="article" />

      <meta property="og:site_name" content="ResearchHub AI" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
