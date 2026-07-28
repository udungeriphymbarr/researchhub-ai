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
        title={`${article.title} | ResearchHub AI`}
        description={article.excerpt}
        keywords={`${article.category}, research, project writing, AI research, ${article.tags?.join(", ")}`}
        image={article.coverImage}
        url={`https://researchhub-ai-one.vercel.app/articles/${article.slug}`}
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
