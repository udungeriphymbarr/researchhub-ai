import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">


        <main className="flex-1 p-8 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;