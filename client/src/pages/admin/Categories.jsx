import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";
import API from "../../api/api";
import Swal from "sweetalert2";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API}/api/categories`);

      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    const url = editingId ? `/api/categories/${editingId}` : "/api/categories";

    const method = editingId ? "PUT" : "POST";

    const response = await authFetch(url, {
      method,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
      }),
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: "success",

        title: editingId ? "Category Updated" : "Category Created",
      });

      setName("");
      setEditingId(null);

      fetchCategories();
    }
  };

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category?",

      icon: "warning",

      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const response = await authFetch(
      `/api/categories/${id}`,

      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: "success",

        title: "Deleted",
      });

      fetchCategories();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>

        <p className="text-gray-500 mt-2">Manage all store categories.</p>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded-xl p-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Slug</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-4">{category.name}</td>

                <td className="p-4 text-gray-500">{category.slug}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(category._id);
                      setName(category.name);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
