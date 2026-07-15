import { useState } from "react";
import API from "../../api/api";
import Swal from "sweetalert2";

function AdminUpload() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {

  try {

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    formData.append("cover", cover);
    formData.append("pdf", pdf);

    const response = await fetch(

      `${API}/api/products`,

      {

        method: "POST",

        body: formData,

      }

    );

    const data = await response.json();

    if (data.success) {

      Swal.fire({

        icon: "success",

        title: "Published!",

        text: "Product uploaded successfully.",

      });

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");

      setCover(null);
      setPdf(null);

    } else {

      Swal.fire({

        icon: "error",

        title: "Upload Failed",

        text: data.message,

      });

    }

  } catch (error) {

    console.log(error);

    Swal.fire({

      icon: "error",

      title: "Error",

      text: "Something went wrong.",

    });

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload New Book
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border rounded-lg p-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded-lg p-4"
          />

          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border rounded-lg p-4"
          >

            <option value="">
              Select Category
            </option>

            <option>
              Research Guide
            </option>

            <option>
              Project Template
            </option>

            <option>
              Seminar
            </option>

            <option>
              Proposal
            </option>

            <option>
              Statistics
            </option>

          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="w-full border rounded-lg p-4"
          />

          <div>

            <label className="font-semibold">
              Book Cover
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>setCover(e.target.files[0])}
              className="mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              PDF File
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e)=>setPdf(e.target.files[0])}
              className="mt-2"
            />

          </div>

<button

  onClick={handlePublish}

  disabled={loading}

  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"

>

  {

    loading

      ? "Publishing..."

      : "Publish Product"

  }

</button>

        </div>

      </div>

    </div>
  );
}

export default AdminUpload;