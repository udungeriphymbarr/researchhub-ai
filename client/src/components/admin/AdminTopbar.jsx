function AdminTopbar() {
  return (
    <header className="bg-white shadow-sm border-b">

      <div className="flex justify-between items-center px-8 py-5">

        <div>

          <h2 className="text-2xl font-bold">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 text-sm">
            Manage your ResearchHub AI Store
          </p>

        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              ResearchHub AI
            </p>

          </div>

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

            A

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminTopbar;