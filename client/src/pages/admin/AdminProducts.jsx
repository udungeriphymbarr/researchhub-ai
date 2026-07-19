import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

const handleDelete = async (id) => {

    const result = await Swal.fire({

        title: "Delete Product?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc2626",

        confirmButtonText: "Delete",

    });

    if (!result.isConfirmed) return;

    try {

        const response = await authFetch(

            `/api/products/${id}`,

            {

                method: "DELETE",

            }

        );

        const data = await response.json();

        if (data.success) {

            Swal.fire(

                "Deleted!",

                "Product removed successfully.",

                "success"

            );

            setProducts((prev) =>
                prev.filter((item) => item._id !== id)
            );

        }

    } catch (error) {

        console.log(error);

    }

};

    return (

        <div>

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

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
        w-full md:w-80
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
    />

</div>
            <div className="bg-white rounded-2xl hidden lg:block shadow overflow-hidden">

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

<Link
to={`/admin/products/edit/${product._id}`}
className="
bg-blue-600
hover:bg-blue-700
text-white
px-4
py-2
rounded-lg
"
>

Edit

</Link>

<button
onClick={() => handleDelete(product._id)}
className="
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-lg
transition
"
>

Delete

</button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <div className="lg:hidden space-y-4">

{filteredProducts.map(product => (

<div
key={product._id}
className="bg-white rounded-xl shadow p-5"
>

<img
src={product.coverImage}
className="h-40 w-full object-cover rounded-lg"
/>

<h2 className="font-bold mt-4">

{product.title}

</h2>

<p className="text-blue-600 font-semibold">

₦{product.price}

</p>

<p className="text-gray-500">

{product.category}

</p>

<div className="flex gap-3 mt-4">

<Link
    to={`/admin/products/edit/${product._id}`}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
    Edit
</Link>

<button
    onClick={() => handleDelete(product._id)}
    className="bg-red-600 text-white px-4 py-2 rounded-lg"
>
    Delete
</button>

</div>

</div>

))}

</div>

        </div>

    );

}

export default AdminProducts;