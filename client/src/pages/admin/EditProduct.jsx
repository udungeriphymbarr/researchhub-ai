import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../../api/api";
import Swal from "sweetalert2";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await fetch(

        `${API}/api/products`

      );

      const data = await response.json();

      const product = data.products.find(

        (p) => p._id === id

      );

      if (product) {

        setTitle(product.title);

        setDescription(product.description);

        setPrice(product.price);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        `${API}/api/products/${id}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            title,

            description,

            price,

          }),

        }

      );

      const data = await response.json();

      if (data.success) {

        Swal.fire("Product updated successfully.");

        navigate("/admin/products");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">

          Edit Product

        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border p-4 rounded-lg"
          />

          <textarea
            rows={6}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="w-full border p-4 rounded-lg"
          />

          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;