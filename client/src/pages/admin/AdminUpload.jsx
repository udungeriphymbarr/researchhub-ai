import { useState } from "react";
import API from "../../api/api";
import Swal from "sweetalert2";

function AdminUpload() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");

const [language, setLanguage] = useState("English");

const [featured, setFeatured] = useState(false);

const [features, setFeatures] = useState([]);

const [featureInput, setFeatureInput] = useState("");

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const addFeature = () => {

    if (!featureInput.trim()) return;

    setFeatures([...features, featureInput]);

    setFeatureInput("");

};

const removeFeature = (index) => {

    setFeatures(
        features.filter((_, i) => i !== index)
    );

};

  const handlePublish = async () => {

  try {

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    formData.append("language", language);
    formData.append("featured", featured);
    formData.append("features", JSON.stringify(features));

    formData.append("cover", cover);
    formData.append("pdf", pdf);

    const token = localStorage.getItem("token");
    const response = await fetch(

      `${API}/api/products`,

      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

<label className="block mb-2 font-medium">

Language

</label>

<select

value={language}

onChange={(e)=>setLanguage(e.target.value)}

className="w-full border rounded-lg p-3"

>

<option>English</option>

<option>French</option>

<option>Spanish</option>

<option>Arabic</option>

</select>

</div>

<div className="flex items-center gap-3">

<input

type="checkbox"

checked={featured}

onChange={(e)=>setFeatured(e.target.checked)}

/>

<label>

Featured Product

</label>

</div>

<div>

<label className="block mb-2 font-medium">

Features

</label>

<div className="flex gap-2">

<input

type="text"

value={featureInput}

onChange={(e)=>setFeatureInput(e.target.value)}

placeholder="Instant Download"

className="flex-1 border rounded-lg p-3"

/>

<button

type="button"

onClick={addFeature}

className="
bg-blue-600
text-white
px-5
rounded-lg
"

>

Add

</button>

</div>

<div className="mt-4 flex flex-wrap gap-2">

{

features.map((feature,index)=>(

<div

key={index}

className="
bg-blue-100
text-blue-700
px-3
py-2
rounded-full
flex
items-center
gap-2
"

>

{feature}

<button

type="button"

onClick={()=>removeFeature(index)}

className="text-red-500"

>

✕

</button>

</div>

))

}

</div>

</div>

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