import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../api/api";
import SEO from "../../components/SEO";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { Link2 } from "lucide-react";

function ArticleDetails() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [progress, setProgress] = useState(0);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage = (scrollTop / documentHeight) * 100;

      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const fetchArticle = async () => {
    try {
      const viewedKey = `viewed-${slug}`;

      const alreadyViewed = sessionStorage.getItem(viewedKey);

      const response = await fetch(`${API}/api/blogs/${slug}`, {
        headers: alreadyViewed
          ? {
              "x-viewed": "true",
            }
          : {},
      });

      const data = await response.json();

      if (data.success) {
        setArticle(data.blog);

        const relatedResponse = await fetch(
          `${API}/api/blogs/related/${data.blog._id}`,
        );

        const relatedData = await relatedResponse.json();

        if (relatedData.success) {
          setRelated(relatedData.blogs);
        }

        if (!alreadyViewed) {
          sessionStorage.setItem(viewedKey, "true");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading article...
      </div>
    );
  }

  const articleUrl = window.location.href;

  const share = (platform) => {
    const encodedUrl = encodeURIComponent(articleUrl);

    const encodedTitle = encodeURIComponent(article.title);

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
        );
        break;

      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          "_blank",
        );
        break;

      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
          "_blank",
        );
        break;

      default:
        navigator.clipboard.writeText(articleUrl);

        window.dispatchEvent(
          new CustomEvent("show-toast", {
            detail: "Article link copied!",
          }),
        );
    }
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={`${article.category}, research, project writing, ResearchHub AI`}
        image={article.coverImage}
      />

      <div
        className="fixed top-0 left-0 z-50 h-1 bg-blue-600 transition-all duration-150"
        style={{
          width: `${progress}%`,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <span>/</span>

          <Link to="/articles" className="hover:text-blue-600 transition">
            Articles
          </Link>

          <span>/</span>

          <span className="text-gray-800 font-medium truncate">
            {article.title}
          </span>
        </nav>

        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full rounded-2xl shadow-xl"
        />

        <div className="mt-10">
          <span className="text-blue-600 font-semibold">
            {article.category}
          </span>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex gap-6 text-gray-500 mt-6">
            <div className="flex items-center gap-4 mt-8"></div>
            <span>👁 {article.views} views</span>

            <span>⏱ {article.readingTime} min read</span>

            <span>📅 {new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <div
            className="
w-14
h-14
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
font-bold
text-xl
"
          >
            RH
          </div>

          <div>
            <p className="font-semibold">{article.author}</p>

            <p className="text-gray-500 text-sm">
              ResearchHub AI Editorial Team
            </p>
          </div>

          <div
            className="
prose
prose-lg
lg:prose-xl
max-w-none
mt-12

prose-headings:text-slate-900
prose-p:text-slate-700
prose-p:leading-8
prose-img:rounded-2xl
prose-img:shadow-lg
prose-a:text-blue-600
prose-blockquote:border-blue-500
"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </div>
        <div className="mt-16 border-t pt-10">
          <h3 className="text-xl font-bold mb-3">
            Found this article helpful?
          </h3>

          <p className="text-gray-600 mb-6">
            Share it with other students and researchers.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => share("facebook")}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              <FaFacebookF />
              Facebook
            </button>

            <button
              onClick={() => share("linkedin")}
              className="flex items-center gap-2 bg-sky-700 text-white px-5 py-3 rounded-xl hover:bg-sky-800 transition"
            >
              <FaLinkedinIn />
              LinkedIn
            </button>

            <button
              onClick={() => share("twitter")}
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition"
            >
              <FaXTwitter />X
            </button>

            <button
              onClick={() => share("copy")}
              className="flex items-center gap-2 bg-gray-700 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Link2 size={18} />
              Copy Link
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((post) => (
                <Link
                  key={post._id}
                  to={`/articles/${post.slug}`}
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
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-6">
                    <span className="text-blue-600 text-sm font-semibold">
                      {post.category}
                    </span>

                    <h3 className="font-bold text-xl mt-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 mt-4">
                      {post.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ArticleDetails;
