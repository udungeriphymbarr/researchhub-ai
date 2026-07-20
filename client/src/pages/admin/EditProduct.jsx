import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { authFetch } from "../../api/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await authFetch(`/api/products/${id}`);

    const data = await response.json();

    if (data.success) {
      const product = data.product;

      setTitle(product.title);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setFeatured(product.featured);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authFetch(
      `/api/products/${id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          description,
          category,
          price,
          featured,
        }),
      },
    );

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
      });

      navigate("/admin/products");
    }
  };

  return (
    <div>
      {/* Form goes here */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded-xl p-4"
        />

        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-xl p-4"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-xl p-4"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-xl p-4"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured Product
        </label>

        <button
          className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
