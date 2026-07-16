import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleBuyNow = async () => {

  try {

    const token = localStorage.getItem("token");

    if (!token) {

      Swal.fire({

        icon: "warning",

        title: "Login Required",

        text: "Please login to continue.",

      });

      navigate("/login");

      return;

    }

    const response = await fetch(

      `${API}/api/payment/product/initialize`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({

          productId: product._id,

        }),

      }

    );

    const data = await response.json();

    if (data.success) {

      window.location.href = data.authorization_url;

    }

    else {

      Swal.fire({

        icon: "error",

        title: "Payment Error",

        text: data.message,

      });

    }

  }

  catch (error) {

    console.log(error);

    Swal.fire({

      icon: "error",

      title: "Error",

      text: "Unable to initialize payment.",

    });

  }

};

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
              onClick={handleBuyNow}
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