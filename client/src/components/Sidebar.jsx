import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold text-blue-600">ResearchHub AI</h1>

      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/topic-generator">Topic Generator</Link>
          </li>

          <li>
            <Link to="/research-questions">Research Questions</Link>
          </li>

          <li>
            <Link to="/chapter-outline">Chapter Outline</Link>
          </li>
          <li>
            <Link to="/subscription" className="sidebar-link">
              Subscription
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
