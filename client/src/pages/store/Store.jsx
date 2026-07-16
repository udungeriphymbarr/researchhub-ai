import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

function Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
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

  return (
    <div className="min-h-screen bg-gray-50 py-14">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12">

          <h1 className="text-4xl font-bold">
            ResearchHub Store
          </h1>

          <p className="text-gray-500 mt-3">
            Premium academic resources to accelerate your research.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >

              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h2 className="font-bold text-xl">
                  {product.title}
                </h2>

                <p className="text-gray-500 mt-3 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-6">

                  <span className="text-2xl font-bold text-blue-600">
                    ₦{product.price}
                  </span>

                  <Link
                    to={`/store/${product._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    View
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Store;