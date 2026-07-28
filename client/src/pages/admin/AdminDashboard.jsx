import { useEffect, useState } from "react";
import API, { authFetch } from "../../api/api";

import StatCard from "../../components/admin/StatCard";
import AdminTopbar from "../../components/admin/AdminTopbar";
import {
  Users,
  Gem,
  BookOpen,
  ShoppingCart,
  Download,
  Wallet,
} from "lucide-react";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});

  const [blogStats, setBlogStats] = useState(null);

  const [recentUsers, setRecentUsers] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();

    fetchBlogStats();
  }, []);

  const fetchBlogStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API}/api/blogs/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setBlogStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await authFetch("/api/admin/dashboard");

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);

        setRecentUsers(data.recentUsers);

        setRecentOrders(data.recentOrders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminTopbar />

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Users"
          value={stats.users}
          icon={<Users size={30} />}
          color="blue"
        />

        <StatCard
          title="Premium Users"
          value={stats.premiumUsers}
          icon={<Gem size={30} />}
          color="purple"
        />

        <StatCard
          title="Products"
          value={stats.products}
          icon={<BookOpen size={30} />}
          color="indigo"
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          icon={<ShoppingCart size={30} />}
          color="green"
        />

        <StatCard
          title="Downloads"
          value={stats.downloads}
          icon={<Download size={30} />}
          color="yellow"
        />

        <StatCard
          title="Revenue"
          value={`₦${stats.revenue}`}
          icon={<Wallet size={30} />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard
          title="Articles"
          value={(blogStats?.totalArticles || 0).toLocaleString()}
          icon={<BookOpen size={30} />}
          color="indigo"
        />

        <StatCard
          title="Published"
          value={(blogStats?.published || 0).toLocaleString()}
          icon={<BookOpen size={30} />}
          color="green"
        />

        <StatCard
          title="Drafts"
          value={(blogStats?.drafts || 0).toLocaleString()}
          icon={<BookOpen size={30} />}
          color="yellow"
        />

        <StatCard
          title="Featured"
          value={(blogStats?.featured || 0).toLocaleString()}
          icon={<BookOpen size={30} />}
          color="purple"
        />

        <StatCard
          title="Views"
          value={(blogStats?.totalViews || 0).toLocaleString()}
          icon={<Users size={30} />}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow mt-8">
        <h3 className="font-bold text-lg">
          {blogStats?.mostViewed?.title || "No articles yet"}
        </h3>

        <p className="text-gray-500 mt-2">
          Category: {blogStats?.mostViewed?.category || "-"}
        </p>

        <p className="text-blue-600 mt-2 font-semibold">
          👁 {(blogStats?.mostViewed?.views || 0).toLocaleString()} Views
        </p>
      </div>

      {/* Recent Activity */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Users */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-5">Recent Users</h2>

          {recentUsers.map((user) => (
            <div key={user._id} className="flex justify-between py-3 border-b">
              <div>
                <h3 className="font-semibold">{user.name}</h3>

                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <span className="text-blue-600 font-semibold">{user.plan}</span>
            </div>
          ))}
        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-5">Recent Orders</h2>

          {recentOrders.map((order) => (
            <div key={order._id} className="flex justify-between py-3 border-b">
              <div>
                <h3 className="font-semibold">{order.productTitle}</h3>

                <p className="text-gray-500 text-sm">{order.user?.name}</p>
              </div>

              <span className="font-bold text-green-600">
                ₦{order.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
