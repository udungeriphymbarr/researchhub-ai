import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const response = await authFetch("/api/orders/all");
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            }

        } catch (error) {
            console.log(error);
        }

    };

    const filteredOrders = orders.filter((order) => {

        const buyer = order.user?.name || "";
        const email = order.user?.email || "";
        const product = order.productTitle || "";

        return (
            buyer.toLowerCase().includes(search.toLowerCase()) ||
            email.toLowerCase().includes(search.toLowerCase()) ||
            product.toLowerCase().includes(search.toLowerCase())
        );

    });

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Orders
                </h1>

                <p className="text-gray-500 mt-2">
                    All purchases made on ResearchHub AI.
                </p>

            </div>

            <input
                type="text"
                placeholder="Search buyer, email or product..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full border rounded-xl p-4"
            />

            <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Buyer</th>

                            <th className="p-4 text-left">Email</th>

                            <th className="p-4 text-left">Product</th>

                            <th className="p-4 text-left">Amount</th>

                            <th className="p-4 text-left">Status</th>

                            <th className="p-4 text-left">Purchased</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredOrders.map((order)=>(

                            <tr
                                key={order._id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {order.user?.name}
                                </td>

                                <td className="p-4">
                                    {order.user?.email}
                                </td>

                                <td className="p-4">
                                    {order.productTitle}
                                </td>

                                <td className="p-4 font-semibold text-blue-600">
                                    ₦{order.amount}
                                </td>

                                <td className="p-4">

                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                        {order.status}

                                    </span>

                                </td>

                                <td className="p-4">

                                    {new Date(order.createdAt).toLocaleDateString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="lg:hidden space-y-4">

{orders.map((order)=>(

<div
key={order._id}
className="bg-white rounded-2xl shadow p-5"
>

<h2 className="font-bold text-lg">

{order.productTitle}

</h2>

<p className="text-gray-500">

Purchased by

<strong>

{" "}

{order.user?.name}

</strong>

</p>

<div className="mt-4 space-y-2">

<p>

<strong>Amount:</strong>

₦{order.amount.toLocaleString()}

</p>

<p>

<strong>Status:</strong>

<span
className={`
ml-2
px-3
py-1
rounded-full
text-xs
font-semibold
${
order.status==="paid"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}
`}
>

{order.status}

</span>

</p>

<p>

<strong>Date:</strong>

{new Date(order.createdAt).toLocaleDateString()}

</p>

</div>

</div>

))}

</div>

        </div>

    );

}

export default Orders;