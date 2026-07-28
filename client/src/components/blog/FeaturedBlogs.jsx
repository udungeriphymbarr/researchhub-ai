import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

function FeaturedBlogs() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await fetch(`${API}/api/blogs/featured`);

      const data = await response.json();

      if (data.success) {
        setArticles(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex justify-between items-center mb-12">

        <div>

          <h2 className="text-4xl font-bold">
            Featured Articles
          </h2>

          <p className="text-gray-500 mt-2">
            Handpicked research guides and AI insights.
          </p>

        </div>

        <Link
          to="/articles"
          className="text-blue-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {articles.map((article) => (

          <Link
            key={article._id}
            to={`/articles/${article.slug}`}
          >

            <article
              className="
              bg-white
              rounded-2xl
              overflow-hidden
              shadow
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              cursor-pointer
              "
            >

              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <span className="text-blue-600 text-sm font-semibold">
                  {article.category}
                </span>

                <h3 className="text-xl font-bold mt-3">
                  {article.title}
                </h3>

                <p className="text-gray-500 mt-4">
                  {article.readingTime} min read
                </p>

              </div>

            </article>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default FeaturedBlogs;