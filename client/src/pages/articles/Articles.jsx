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
        description="Free research writing guides, project tips, AI tutorials, academic resources and more."
        keywords="Research articles, project writing, final year project, academic writing, research tips"
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