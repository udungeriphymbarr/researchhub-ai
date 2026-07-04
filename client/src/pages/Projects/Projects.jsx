import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { authFetch } from "../../api/api";
import { toast } from "react-toastify";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [editingProject, setEditingProject] =
  useState(null);

const [editTitle, setEditTitle] =
  useState("");

const [editDescription,
  setEditDescription] =
  useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {
    setLoadingProjects(true);

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await authFetch(
      `/api/projects?userId=${user.id}`
    );

    const data = await response.json();

    if (data.success) {
      setProjects(data.projects);
    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoadingProjects(false);

  }
};

const createProject = async () => {
  try {
    if (!title.trim()) {
      toast.error("Project title is required");
      return;
    }

    setLoading(true);

    const response = await authFetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      toast.success("Project created successfully!");

      await fetchProjects();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to create project.");
  } finally {
    setLoading(false);
  }
};

  const deleteProject = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this project?"
  );

  if (!confirmDelete) return;

  try {
    const response = await authFetch(
      `/api/projects/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      fetchProjects();
    }
    toast.success("Project deleted successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete project.");
  }
};

const startEdit = (project) => {
  setEditingProject(project);
  setEditTitle(project.title);
  setEditDescription(
    project.description || ""
  );
};

const saveEdit = async () => {
  try {
    const response = await authFetch(
      `/api/projects/${editingProject._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setEditingProject(null);
      fetchProjects();
    }
  } catch (error) {
    console.error(error);
  }
};

const filteredProjects = [...projects]
  .filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    }

    if (sortBy === "az") {
      return a.title.localeCompare(
        b.title
      );
    }

    if (sortBy === "za") {
      return b.title.localeCompare(
        a.title
      );
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            My Projects
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage all your
            research projects.
          </p>
        </div>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow">
          <p className="text-sm">
            Total Projects
          </p>

          <p className="text-2xl font-bold">
            {projects.length}
          </p>
        </div>

      </div>


      {/* Create Project */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Create New Project
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="4"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

<button
  onClick={createProject}
  disabled={loading}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
>
  {loading
    ? "Creating..."
    : "Create Project"}
</button>

        </div>

      </div>

      {loadingProjects && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {[1,2,3,4,5,6].map((item) => (

      <div
        key={item}
        className="bg-white rounded-2xl shadow p-6 animate-pulse"
      >

        <div className="w-12 h-12 bg-gray-300 rounded-xl mb-4"></div>

        <div className="h-5 bg-gray-300 rounded mb-3"></div>

        <div className="h-4 bg-gray-200 rounded mb-2"></div>

        <div className="h-4 bg-gray-200 rounded mb-6"></div>

        <div className="h-10 bg-gray-300 rounded-lg"></div>

      </div>

    ))}

  </div>
)}

      {/* Empty State */}
{!loadingProjects && filteredProjects.length === 0 && (

  <div className="bg-white p-12 rounded-2xl shadow text-center">

    <div className="text-6xl mb-4">
      📁
    </div>

    <h2 className="text-2xl font-bold mb-3">
      No Projects Yet
    </h2>

    <p className="text-gray-500">
      Create your first research project
      and start generating academic
      content with AI.
    </p>

  </div>

)}

<div className="mb-6 flex flex-col md:flex-row gap-4">

  <input
    type="text"
    placeholder="🔍 Search projects..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="flex-1 border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="border rounded-xl px-5 py-3"
  >
    <option value="newest">
      Newest First
    </option>

    <option value="oldest">
      Oldest First
    </option>

    <option value="az">
      A → Z
    </option>

    <option value="za">
      Z → A
    </option>

  </select>

</div>

      {/* Projects Grid */}

{!loadingProjects && filteredProjects.length > 0 && (

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {filteredProjects.map((project) => (

      <div
        key={project._id}
        className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 border border-gray-100"
      >

        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
            📚
          </div>

          <div>
            <h2 className="text-lg font-bold">
              {project.title}
            </h2>

            <p className="text-xs text-gray-400">
              {new Date(
                project.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {project.description ||
            "No description provided for this project."}
        </p>

<div className="flex gap-2">

  <Link
    to={`/projects/${project._id}`}
    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
  >
    Open
  </Link>

  <button
    onClick={() =>
      startEdit(project)
    }
    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteProject(project._id)
    }
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  >
    Delete
  </button>

</div>

      </div>

    ))}

  </div>

)}

{editingProject && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Edit Project
      </h2>

      <input
        type="text"
        value={editTitle}
        onChange={(e) =>
          setEditTitle(
            e.target.value
          )
        }
        className="w-full border rounded-lg px-4 py-3 mb-4"
        placeholder="Project Title"
      />

      <textarea
        rows="4"
        value={editDescription}
        onChange={(e) =>
          setEditDescription(
            e.target.value
          )
        }
        className="w-full border rounded-lg px-4 py-3 mb-4"
        placeholder="Project Description"
      />

      <div className="flex gap-3 justify-end">

        <button
          onClick={() =>
            setEditingProject(null)
          }
          className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={saveEdit}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
    </div>

    
  );
}

export default Projects;