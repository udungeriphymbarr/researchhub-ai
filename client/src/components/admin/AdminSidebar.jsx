import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

function Sidebar({ closeSidebar }) {
  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: BookOpen,
    },
    {
      name: "Upload Product",
      path: "/admin/upload",
      icon: Upload,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: FolderTree,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="
w-64
h-screen
overflow-y-auto
bg-slate-900
text-white
shadow-xl
"
    >
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">ResearchHub AI</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              onClick={closeSidebar}
              key={menu.path}
              to={menu.path}
              end={menu.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
