import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

function BlogGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API}/api/blogs`);

      const data = await response.json();

      if (data.success) {
        setPosts(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10">Latest Articles</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p>No articles published yet.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post._id}
              to={`/articles/${post.slug}`}
              className="block"
            >
              <article
                key={post._id}
                className="
            bg-white
            rounded-2xl
            overflow-hidden
            shadow
            hover:shadow-xl
            hover:-translate-y-2
            transition-all
            duration-300
            "
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-blue-600 text-sm font-semibold">
                    {post.category}
                  </span>

                  <h3 className="font-bold text-xl mt-3 leading-8">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 mt-4">
                    {post.readingTime} min read
                  </p>

                  <Link
                    to={`/articles/${post.slug}`}
                    className="
  mt-6
  inline-block
  text-blue-600
  font-semibold
  hover:underline
"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default BlogGrid;
