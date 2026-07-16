import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await fetch(
        `${API}/api/products/${id}`
      );

      const data = await response.json();

      if (data.success) {

        setProduct(data.product);

      }

    } catch (error) {

      console.log(error);

    }

  };

  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-14">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-14">

          <img
            src={product.coverImage}
            alt={product.title}
            className="rounded-2xl shadow-lg"
          />

          <div>

            <h1 className="text-4xl font-bold">

              {product.title}

            </h1>

            <p className="mt-6 text-gray-600 leading-8">

              {product.description}

            </p>

            <div className="mt-8">

              <h2 className="text-4xl font-bold text-blue-600">

                ₦{product.price}

              </h2>

            </div>

            <button
              className="
              mt-10
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-10
              py-4
              rounded-xl
              font-semibold
              "
            >

              Buy Now

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;