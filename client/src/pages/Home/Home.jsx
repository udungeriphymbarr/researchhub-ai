import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Workspace from "../../components/landing/Workspace";
import WhyResearchHub from "../../components/landing/WhyResearchHub";
import Pricing from "../../components/landing/Pricing";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import { Navigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
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
  );
}

export default Home;
