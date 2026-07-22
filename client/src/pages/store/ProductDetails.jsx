import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SEO from "../../components/SEO";
import StructuredData from "../../components/StructuredData";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [owned, setOwned] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    checkOwnership();
    fetchMyReview();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API}/api/products/${id}`);

      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOwnership = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(`${API}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const hasBought = data.orders.some((order) => order.product._id === id);

        setOwned(hasBought);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyReview = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(`${API}/api/reviews/mine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.review) {
        setMyReview(data.review);
        setRating(data.review.rating);
        setComment(data.review.comment);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API}/api/reviews/${id}`);

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReview = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        myReview
          ? `${API}/api/reviews/${myReview._id}`
          : `${API}/api/reviews/${id}`,
        {
          method: myReview ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product: id,
            rating,
            comment,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
        });

        setComment("");

        await fetchReviews();
        await fetchMyReview();
      }
    } catch (err) {
      console.log(err);
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
        },
      );

      const data = await response.json();

      if (data.success) {
        window.location.href = data.authorization_url;
      } else {
        Swal.fire({
          icon: "error",

          title: "Payment Error",

          text: data.message,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Error",

        text: "Unable to initialize payment.",
      });
    }
  };

  const copyLink = async () => {
    const link = window.location.href;

    await navigator.clipboard.writeText(link);

    Swal.fire({
      icon: "success",

      title: "Link copied!",

      text: "You can now share this book.",
    });
  };

  const shareBook = async () => {
    const link = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: product.title,

        text: product.description,

        url: link,
      });
    } else {
      copyLink();
    }
  };

  const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: product.coverImage,
  description: product.description,
  brand: {
    "@type": "Brand",
    name: "ResearchHub AI",
  },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
  },
};

  return (
    <>
      <SEO
        title={`${product.title} | ResearchHub AI`}
        description={product.description}
        keywords={`${product.title}, ${product.category}, research guide`}
        image={product.coverImage}
        url={`https://researchhub-ai-one.vercel.app/store/${product._id}`}
      />

      <StructuredData data={productSchema} />

      <div className="min-h-screen bg-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14">
            <div className="flex justify-center">
              <img
                src={product.coverImage}
                alt={product.title}
                className="
        w-full
        max-w-md
        rounded-3xl
        shadow-2xl
        hover:scale-105
        transition-all
        duration-300
        "
              />
            </div>

            <span
              className="
inline-flex
items-center
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
text-sm
font-semibold
mb-5
"
            >
              📘 {product.category}
            </span>

            <div
              className="
flex
items-center
gap-2
mb-6
"
            >
              <span className="text-yellow-500">⭐</span>

              <p className="text-gray-600">Premium Research Resource</p>
            </div>

            <div>
              <h1 className="text-4xl font-bold">{product.title}</h1>

              <p className="text-lg leading-8 text-gray-600 mt-4 ">
                {product.description}
              </p>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Reviews</h2>

                {reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="border-b py-5">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{review.user.name}</h3>

                        <span>⭐ {review.rating}</span>
                      </div>

                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {owned && (
                <div className="mt-12 bg-white rounded-2xl shadow p-6">
                  <h2 className="text-2xl font-bold mb-5">
                    {myReview ? "Update Your Review" : "Leave a Review"}
                  </h2>

                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border rounded-lg p-3 mb-4"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>

                    <option value={4}>⭐⭐⭐⭐ Very Good</option>

                    <option value={3}>⭐⭐⭐ Good</option>

                    <option value={2}>⭐⭐ Fair</option>

                    <option value={1}>⭐ Poor</option>
                  </select>

                  <textarea
                    rows="5"
                    placeholder="Tell others about this resource..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded-lg p-4"
                  />

                  <button
                    onClick={handleReview}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                  >
                    {myReview ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={copyLink}
                  className="
px-5
py-3
rounded-xl
border
hover:bg-gray-100
"
                >
                  📋 Copy Link
                </button>

                <button
                  onClick={shareBook}
                  className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
"
                >
                  📤 Share
                </button>
              </div>

              <div className="space-y-3 mt-8">
                <div className="flex gap-3">
                  <span className="text-green-600">✔</span>

                  <span>Instant Digital Download</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-600">✔</span>

                  <span>Lifetime Access</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-600">✔</span>

                  <span>Works on Mobile & PC</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-600">✔</span>

                  <span>Unlimited Downloads</span>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-gray-500">Price</p>

                <h2
                  className="
text-5xl
font-extrabold
text-blue-600
"
                >
                  ₦{product.price}
                </h2>
              </div>

              <button
                onClick={handleBuyNow}
                className="
mt-10
w-full
bg-gradient-to-r
from-blue-600
to-indigo-600
hover:from-blue-700
hover:to-indigo-700
text-white
font-semibold
text-lg
py-4
rounded-xl
transition-all
duration-300
shadow-lg
hover:shadow-xl
"
              >
                Buy Now
              </button>

              <p
                className="
text-sm
text-gray-500
text-center
mt-4
"
              >
                🔒 Secure payment powered by Paystack
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
