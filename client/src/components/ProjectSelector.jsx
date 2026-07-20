import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

function ProjectSelector({ projectId, setProjectId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await authFetch(`/api/projects?userId=${user.id}`);

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Select Project</label>

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Project --</option>

        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title}
          </option>
        ))}
      </select>

      {projects.length === 0 && (
        <p className="text-red-500 text-sm mt-2">
          You don't have any projects yet. Create one first.
        </p>
      )}
    </div>
  );
}

export default ProjectSelector;
