import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `http://localhost:5000/api/projects?userId=${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProject = async () => {
    try {
      if (!title.trim()) {
        alert("Project title is required");
        return;
      }

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTitle("");
        setDescription("");

        fetchProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        My Projects
      </h1>

      <p className="text-gray-500 mb-8">
        Create and manage your research projects.
      </p>

      {/* Create Project */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Create New Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 mb-4"
          rows="4"
        />

        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Create Project
        </button>

      </div>

      {/* Empty State */}

      {projects.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow text-center">

          <h2 className="text-xl font-semibold mb-2">
            No Projects Yet
          </h2>

          <p className="text-gray-500">
            Create your first research project.
          </p>

        </div>
      )}

      {/* Projects Grid */}

      <div className="grid md:grid-cols-2 gap-6">

        {projects.map((project) => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition block"
          >

            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {project.description ||
                "No description provided"}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Created:{" "}
              {new Date(
                project.createdAt
              ).toLocaleDateString()}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default Projects;