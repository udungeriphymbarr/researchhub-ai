import { useEffect, useState } from "react";
import API, { authFetch } from "../../api/api";
import { toast } from "react-toastify";

function Library() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchLibrary();

  }, []);

  const fetchLibrary = async () => {

    try {

      const response = await authFetch(
        "/api/orders/my-orders"
      );

      const data = await response.json();

      if (data.success) {

        setOrders(data.orders);

      }

    } catch (error) {

      console.log(error);

    }

  };

  
const handleDownload = async (productId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(

      `${API}/api/orders/download/${productId}`,

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    const data = await response.json();

    if (!data.success) {

      throw new Error(data.message);

    }

    window.open(data.downloadUrl, "_blank");

  }

  catch (error) {

    console.log(error);

    alert("Unable to download.");

  }

};

  return (

    <div className="min-h-screen bg-gray-100 py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">

          My Library

        </h1>

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold">

              No Purchases Yet

            </h2>

            <p className="text-gray-500 mt-3">

              Books you purchase will appear here.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {orders
            .filter(order => order.product)
            .map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <img
                  src={order.product.coverImage}
                  alt={order.product.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h2 className="font-bold text-xl">

                    {order.product.title}

                  </h2>

<button
  onClick={() => handleDownload(order.product._id)}
  className="
  mt-6
  bg-green-600
  hover:bg-green-700
  text-white
  px-6
  py-3
  rounded-lg
  "
>
  Download
</button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Library;