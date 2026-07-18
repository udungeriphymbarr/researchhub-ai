import { NavLink } from "react-router-dom";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Upload Product",
      path: "/admin/upload",
    },
    {
      name: "Categories",
      path: "/admin/categories",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">

          ResearchHub AI

        </h1>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;