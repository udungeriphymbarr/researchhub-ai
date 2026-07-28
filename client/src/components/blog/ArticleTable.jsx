import { useEffect, useState } from "react";
import API from "../../api/api";
import Swal from "sweetalert2";

function ArticleTable({ setEditingArticle }) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 10;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API}/api/blogs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setArticles(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    const result = await Swal.fire({
      title: "Delete Article?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          timer: 1200,
          showConfirmButton: false,
        });

        fetchArticles();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Unable to delete article.",
      });
    }
  };

  const togglePublish = async (article) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", article.title);
      formData.append("slug", article.slug);
      formData.append("excerpt", article.excerpt);
      formData.append("category", article.category);
      formData.append("content", article.content);
      formData.append("readingTime", article.readingTime);

      formData.append("featured", article.featured);

      formData.append("published", (!article.published).toString());

      formData.append("tags", JSON.stringify(article.tags));

      const response = await fetch(`${API}/api/blogs/${article._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        fetchArticles();

        Swal.fire({
          icon: "success",
          title: article.published ? "Moved to Draft" : "Published",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const keyword = search.toLowerCase();

    return (
      article.title.toLowerCase().includes(keyword) ||
      article.category.toLowerCase().includes(keyword) ||
      article.author.toLowerCase().includes(keyword)
    );
  });

  const indexOfLastArticle = currentPage * articlesPerPage;

  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">All Articles</h2>

      <div className="overflow-x-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-96 border rounded-xl px-4 py-3"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Cover</th>

              <th className="text-left">Title</th>

              <th>Category</th>

              <th>Status</th>

              <th>Views</th>

              <th>Featured</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentArticles.map((article) => (
              <tr key={article._id} className="border-b hover:bg-gray-50">
                <td className="py-4">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="font-semibold">{article.title}</td>

                <td className="text-center">{article.category}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      article.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="text-center">{article.views}</td>

                <td className="text-center">{article.featured ? "⭐" : "-"}</td>

                <td className="text-center">
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => togglePublish(article)}
                    className="text-blue-600"
                  >
                    {article.published ? "Draft" : "Publish"}
                  </button>

                  <button
                    onClick={() => deleteArticle(article._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-8">
          <p className="text-gray-600">
            Showing {indexOfFirstArticle + 1}–
            {Math.min(indexOfLastArticle, filteredArticles.length)} of{" "}
            {filteredArticles.length} Articles
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleTable;
