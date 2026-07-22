import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { authFetch } from "../../api/api";
import SEO from "../../components/SEO";

function Store() {
  const [products, setProducts] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  const featuredBook = products.length > 0 ? products[0] : null;

  useEffect(() => {
    fetchProducts();
    fetchPurchasedBooks();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/api/products`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPurchasedBooks = async () => {
    try {
      const response = await authFetch("/api/orders/my-orders");

      const data = await response.json();

      if (data.success) {
        const ids = data.orders.map((order) => order.product._id);

        setPurchasedBooks(ids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SEO
        title="Research Books Store | ResearchHub AI"
        description="Download premium research books, SIWES guides, project templates and academic resources."
        keywords="research books, project guide, SIWES report, ResearchHub AI"
        url="https://researchhub-ai-one.vercel.app/store"
      />

      <div className="min-h-screen bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="
bg-gradient-to-r
from-blue-600
via-indigo-600
to-sky-700
rounded-3xl
text-white
px-10
py-16
mb-14
shadow-xl
"
          >
            <div className="max-w-3xl">
              <span
                className="
        inline-block
        bg-white/20
        backdrop-blur
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        mb-5
        "
              >
                📚 ResearchHub AI Store
              </span>

              <h1
                className="
        text-5xl
        font-bold
        leading-tight
        "
              >
                Premium Research Resources
              </h1>

              <p
                className="
        mt-5
        text-lg
        text-blue-100
        leading-8
        max-w-2xl
        "
              >
                Discover high-quality research guides, project templates,
                methodology resources and academic materials carefully designed
                to help students complete better research faster.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span
                  className="
            bg-white/20
            px-4
            py-2
            rounded-full
            backdrop-blur
            "
                >
                  📘 Academic Writing
                </span>

                <span
                  className="
            bg-white/20
            px-4
            py-2
            rounded-full
            backdrop-blur
            "
                >
                  🔬 Research Methodology
                </span>

                <span
                  className="
            bg-white/20
            px-4
            py-2
            rounded-full
            backdrop-blur
            "
                >
                  🎓 Project Guides
                </span>

                <span
                  className="
            bg-white/20
            px-4
            py-2
            rounded-full
            backdrop-blur
            "
                >
                  💡 Research Skills
                </span>
              </div>
            </div>
          </div>

          {/* Featured Book */}
          {products.length > 0 && (
            <div className="mb-14">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Cover */}

                  <div className="p-8 flex justify-center">
                    <img
                      src={featuredBook?.coverImage}
                      alt={featuredBook?.title}
                      className="
          w-72
          rounded-2xl
          shadow-xl
          hover:scale-105
          transition
          duration-300
          "
                    />
                  </div>

                  {/* Details */}

                  <div className="p-10">
                    <span
                      className="
        inline-flex
        items-center
        bg-yellow-100
        text-yellow-700
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        mb-5
        "
                    >
                      ⭐ Featured Resource
                    </span>

                    <h2 className="text-4xl font-bold leading-tight">
                      {featuredBook?.title}
                    </h2>

                    <p className="text-gray-600 mt-6 leading-8">
                      {featuredBook?.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-4xl font-bold text-blue-600">
                        ₦{featuredBook?.price}
                      </span>

                      <Link
                        to={`/store/${featuredBook?._id}`}
                        className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
            "
                      >
                        View Book →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Explore Resources</h2>

              <p className="text-gray-500 mt-2">
                Browse our growing collection of premium academic resources.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {products.length} Resources
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const owned = purchasedBooks.includes(product._id);

              return (
                <div
                  key={product._id}
                  className="
  relative
  bg-white
  rounded-2xl
  shadow
  hover:-translate-y-2
  hover:shadow-2xl
  transition-all
  duration-300
  overflow-hidden
"
                >
                  <div className="absolute top-3 left-3 z-10">
                    {owned ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ✓ Owned
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-6">
                    <h2 className="font-bold text-xl">{product.title}</h2>

                    <p className="text-gray-500 mt-3 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-bold text-blue-600">
                        ₦{product.price}
                      </span>

                      {owned ? (
                        <Link
                          to="/library"
                          className="
bg-green-600
hover:bg-green-700
text-white
px-5
py-2
rounded-lg
"
                        >
                          Library
                        </Link>
                      ) : (
                        <Link
                          to={`/store/${product._id}`}
                          className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
