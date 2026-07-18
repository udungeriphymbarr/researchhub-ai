import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";

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

    const [recentUsers, setRecentUsers] = useState([]);

    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await authFetch(
                "/api/admin/dashboard"
            );

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
            <div className="p-10">
                Loading Dashboard...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <AdminTopbar />

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

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

            {/* Recent Activity */}

            <div className="grid xl:grid-cols-2 gap-8">

                {/* Recent Users */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-xl mb-5">
                        Recent Users
                    </h2>

                    {
                        recentUsers.map(user => (

                            <div
                                key={user._id}
                                className="flex justify-between py-3 border-b"
                            >

                                <div>

                                    <h3 className="font-semibold">
                                        {user.name}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {user.email}
                                    </p>

                                </div>

                                <span className="text-blue-600 font-semibold">

                                    {user.plan}

                                </span>

                            </div>

                        ))
                    }

                </div>

                {/* Recent Orders */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-xl mb-5">
                        Recent Orders
                    </h2>

                    {

                        recentOrders.map(order => (

                            <div
                                key={order._id}
                                className="flex justify-between py-3 border-b"
                            >

                                <div>

                                    <h3 className="font-semibold">

                                        {order.productTitle}

                                    </h3>

                                    <p className="text-gray-500 text-sm">

                                        {order.user?.name}

                                    </p>

                                </div>

                                <span className="font-bold text-green-600">

                                    ₦{order.amount.toLocaleString()}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;