import SEO from "../../components/SEO";
import BlogHero from "../../components/blog/BlogHero";
import SearchBar from "../../components/blog/SearchBar";
import Categories from "../../components/blog/Categories";
import FeaturedBlogs from "../../components/blog/FeaturedBlogs";
import BlogGrid from "../../components/blog/BlogGrid";
import Newsletter from "../../components/blog/Newsletter";

function Articles() {
  return (
    <>
      <SEO
        title="Research Articles | ResearchHub AI"
        description="Read practical articles on research writing, AI tools, project guides, academic success and final year tips."
        keywords="research articles, project writing, AI for students, final year project, ResearchHub AI"
        image="https://researchhub-ai-one.vercel.app/logo.png"
        url="https://researchhub-ai-one.vercel.app/articles"
      />

      <div className="bg-gray-50 min-h-screen">
        <BlogHero />

        <SearchBar />

        <Categories />

        <FeaturedBlogs />

        <BlogGrid />

        <Newsletter />
      </div>
    </>
  );
}

export default Articles;
