import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";
import Swal from "sweetalert2";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await authFetch(
                "/api/users/all"
            );

            const data = await response.json();

            if (data.success) {

                setUsers(data.users);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const filteredUsers = users.filter((user) =>

        user.name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        user.email
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const updateRole = async (id, role) => {

    const response = await authFetch(

        `/api/users/role/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                role

            })

        }

    );

    const data = await response.json();

    if(data.success){

        Swal.fire({

            icon:"success",

            title:"Role Updated"

        });

        fetchUsers();

    }

};

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Users
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage registered users.
                </p>

            </div>

            <input

                type="text"

                placeholder="Search users..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                className="
                w-full
                border
                rounded-xl
                p-4
                "

            />

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>

                            <th className="p-4 text-left">Email</th>

                            <th className="p-4 text-left">Plan</th>

                            <th className="p-4 text-left">Role</th>

                            <th className="p-4 text-left">Usage</th>
s
                            <th className="p-4 text-left">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map((user)=>(

                            <tr
                            key={user._id}
                            className="border-b"
                            >

                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">

                                    {user.plan}

                                </td>

                                <td className="p-4">

                                    {user.role}

                                </td>

                                <td className="p-4">

                                    {user.usageCount}

                                </td>

<td className="p-4">
    <select
        value={user.role}
        onChange={(e) =>
            updateRole(user._id, e.target.value)
        }
        className="border rounded-lg p-2"
    >
        <option value="user">User</option>
        <option value="admin">Admin</option>
    </select>
</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Users;