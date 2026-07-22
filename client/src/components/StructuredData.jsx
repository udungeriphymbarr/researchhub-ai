import { Helmet } from "react-helmet-async";

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ResearchHub AI",
    url: "https://researchhubai.vercel.app",
    description:
      "AI-powered research assistant helping students generate research topics, research questions, chapter outlines and access premium academic resources.",
    publisher: {
      "@type": "Organization",
      name: "ResearchHub AI",
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://researchhub-ai-one.vercel.app/store?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default StructuredData;