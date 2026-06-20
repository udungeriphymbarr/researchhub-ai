import { useState } from "react";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    university: user?.university || "",
    department: user?.department || "",
    level: user?.level || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await fetch(
      "http://localhost:5000/api/users/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...formData,
        })
      );

      alert("Profile Updated Successfully");
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100"
          />

          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Level"
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
         >
            Update Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;