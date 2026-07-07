import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Workspace from "../../components/landing/Workspace";
import WhyResearchHub from "../../components/landing/WhyResearchHub";
import Pricing from "../../components/landing/Pricing";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

function Home() {
  
    const token = localStorage.getItem("token");

    if (token) {
    return <Navigate to="/dashboard" replace />;
    }  

  return (
    <>
      <Hero />
      <Features />
      <Workspace />
      <WhyResearchHub />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;