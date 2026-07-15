import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/api";
import Swal from "sweetalert2";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${API}/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {

      Swal.fire("Product deleted successfully!");

      fetchProducts();

    } else {

      Swal.fire(data.message);

    }

  } catch (error) {

    console.log(error);

    Swal.fire("Something went wrong.");

  }

};

  const fetchProducts = async () => {

    try {

      const response = await fetch(

        `${API}/api/products`

      );

      const data = await response.json();

      if (data.success) {

        setProducts(data.products);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="p-10">

        Loading Products...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">

        All Products

      </h1>

      {

        products.length === 0 ?

        (

          <p>No products uploaded.</p>

        )

        :

        (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {

              products.map((product)=>(

                <div

                  key={product._id}

                  className="bg-white rounded-xl shadow-lg overflow-hidden"

                >

                  <img

                    src={product.coverImage}

                    alt={product.title}

                    className="w-full h-64 object-cover"

                  />

                  <div className="p-5">

                    <h2 className="text-xl font-bold">

                      {product.title}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      {product.category}

                    </p>

                    <p className="text-blue-600 font-bold mt-3">

                      ₦{product.price}

                    </p>

                    <div className="flex justify-between mt-5 text-sm text-gray-500">

                      <span>

                        Sales: {product.sales}

                      </span>

                      <span>

                        Downloads: {product.downloads}

                      </span>
                      

                    </div>
<div className="flex gap-3 mt-5">

  <button
    onClick={() =>
      navigate(`/admin/edit/${product._id}`)
    }
    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(product._id)}
    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
  >
    Delete
  </button>

</div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default AdminProducts;