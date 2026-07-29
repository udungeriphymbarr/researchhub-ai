import { useEffect, useState } from "react";
import API from "../../api/api";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

function ArticleForm({ editingArticle, setEditingArticle }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    tags: "",
    coverImage: "",
    readingTime: 5,
    featured: false,
    published: true,
    content: "",
  });

  useEffect(() => {
    if (!editingArticle) return;

    setForm({
      title: editingArticle.title,
      slug: editingArticle.slug,
      excerpt: editingArticle.excerpt,
      category: editingArticle.category,
      tags: editingArticle.tags.join(", "),
      coverImage: editingArticle.coverImage,
      readingTime: editingArticle.readingTime,
      featured: editingArticle.featured,
      published: editingArticle.published,
      content: editingArticle.content,
    });
  }, [editingArticle]);

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: createSlug(value),
      });

      return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const publishArticle = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!editingArticle && !form.coverImage) {
        return Swal.fire({
          icon: "warning",
          title: "Cover Image Required",
        });
      }
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("excerpt", form.excerpt);
      formData.append("category", form.category);
      formData.append("content", form.content);

      formData.append("readingTime", form.readingTime);
      formData.append("featured", form.featured);
      formData.append("published", form.published);

      formData.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      );

      // Upload image
      formData.append("cover", form.coverImage);

      const url = editingArticle
        ? `${API}/api/blogs/${editingArticle._id}`
        : `${API}/api/blogs`;

      const method = editingArticle ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Article Published 🎉",
        });

        setForm({
          title: "",
          slug: "",
          excerpt: "",
          category: "",
          tags: "",
          coverImage: null,
          readingTime: 5,
          featured: false,
          published: true,
          content: "",
        });

        setEditingArticle(null);
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold mb-8">New Article</h2>

      <div className="space-y-6">
        <input
          name="title"
          placeholder="Article Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        />

        <input
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        />

        <textarea
          rows="3"
          name="excerpt"
          placeholder="Short description..."
          value={form.excerpt}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border rounded-xl p-4"
        />

        <div>
          <label className="font-semibold">Article Cover</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                coverImage: e.target.files[0],
              })
            }
            className="mt-2"
          />

          {form.coverImage && (
            <img
              src={
                typeof form.coverImage === "string"
                  ? form.coverImage
                  : URL.createObjectURL(form.coverImage)
              }
              alt="preview"
              className="
        mt-4
        w-60
        rounded-xl
        shadow-lg
      "
            />
          )}
        </div>

        <Editor
          apiKey="sxv1x350u3nvm235jz8fj2yvyrh5vuh0dvzgo9hw1552irdi"
          value={form.content}
          init={{
            height: 600,
            menubar: true,

            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "paste",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],

            toolbar:
              "undo redo | formatselect | " +
              "bold italic underline forecolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | " +
              "link image media table | " +
              "removeformat code fullscreen preview",

            paste_as_text: false,
            paste_merge_formats: true,
            paste_remove_styles_if_webkit: true,

            branding: false,
          }}
          onEditorChange={(content) =>
            setForm({
              ...form,
              content,
            })
          }
        />

        <div className="flex gap-8">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
            Published
          </label>
        </div>

        <button
          onClick={publishArticle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          {editingArticle ? "Update Article" : "Publish Article"}
        </button>
      </div>
    </div>
  );
}

export default ArticleForm;
