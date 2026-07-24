import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Workspace from "../../components/landing/Workspace";
import WhyResearchHub from "../../components/landing/WhyResearchHub";
import Pricing from "../../components/landing/Pricing";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import { Navigate } from "react-router-dom";
import SEO from "../../components/SEO";
import StructuredData from "../../components/StructuredData";

function Home() {

  const token = localStorage.getItem("token");

  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ResearchHub AI",
  url: "https://researchhub-ai-one.vercel.app",
  logo: "https://researchhub-ai-one.vercel.app/emotion.png",
  sameAs: [
    "https://facebook.com/profile.php?id=100034652832161",
    "https://linkedin.com/in/udungeri-phymbarr-137404400/"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ResearchHub AI",
  url: "https://researchhub-ai-one.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://researchhub-ai-one.vercel.app/store?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ResearchHub AI",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "url": "https://researchhub-ai-one.vercel.app",
  "description": "AI-powered research assistant for students.",
  "creator": {
    "@type": "Organization",
    "name": "ResearchHub AI"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "NGN"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ResearchHub AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ResearchHub AI helps students generate research topics, research questions, chapter outlines and access premium academic resources.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download books after purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Purchased books remain permanently available inside your library.",
      },
    },
  ],
};

  return (
    <>
      <SEO
        title="ResearchHub AI | AI Research Assistant for Students"
        description="Generate research topics, research questions, chapter outlines and access premium academic resources."
        keywords="ResearchHub AI, research topics, AI research assistant"
        url="https://researchhubai.vercel.app"
      />

      <StructuredData data={organizationSchema} />

      <StructuredData data={websiteSchema} />

      <StructuredData data={appSchema} />

      <StructuredData data={faqSchema} />

      <div className="bg-white overflow-hidden">
        <Hero />
        <Features />
        <Workspace />
        <WhyResearchHub />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}

export default Home;
