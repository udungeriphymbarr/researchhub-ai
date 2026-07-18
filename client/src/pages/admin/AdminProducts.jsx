import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await authFetch(
                "/api/products/admin/all"
            );

            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            }

        } catch (error) {
            console.log(error);
        }

    };

    const filteredProducts = products.filter((product) =>

    product.title
        .toLowerCase()
        .includes(search.toLowerCase())

);

    return (

        <div>

<div className="flex justify-between items-center mb-8">

    <h1 className="text-3xl font-bold">

        Products

    </h1>

    <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        border
        rounded-xl
        px-4
        py-3
        w-80
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
    />

</div>
            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Cover
                            </th>

                            <th className="p-4 text-left">
                                Title
                            </th>

                            <th className="p-4 text-left">
                                Category
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Sales
                            </th>

                            <th className="p-4 text-left">
                                Downloads
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredProducts.map(product => (

                                <tr
                                    key={product._id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        <img
                                            src={product.coverImage}
                                            alt={product.title}
                                            className="w-14 h-20 rounded-lg object-cover"
                                        />

                                    </td>

                                    <td className="p-4 font-semibold">

                                        {product.title}

                                    </td>

<td className="p-4">

<span
className="
bg-purple-100
text-purple-700
px-3
py-1
rounded-full
text-sm
"
>

{product.category}

</span>

</td>

                                    <td className="p-4">

                                        ₦{product.price.toLocaleString()}

                                    </td>

<td className="p-4">

<span
className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
font-semibold
"
>

{product.sales}

</span>

</td>

<td className="p-4">

<span
className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
font-semibold
"
>

{product.downloads}

</span>

</td>

                                    <td className="p-4 space-x-2">

                                        <button className="bg-blue-600 text-white px-3 py-2 rounded">

                                            Edit

                                        </button>

                                        <button className="bg-red-600 text-white px-3 py-2 rounded">

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminProducts;