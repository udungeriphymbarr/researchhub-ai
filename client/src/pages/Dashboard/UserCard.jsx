import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";

function UserCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));

      if (!localUser) return;

      const response = await authFetch(`/api/users/profile`);

      const data = await response.json();

      if (data.success) {
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error);

      const localUser = JSON.parse(localStorage.getItem("user"));

      setUser(localUser);
    }
  };

  if (!user) return null;

  const usageLimit = user.usageLimit || 20;
  const usageCount = user.usageCount || 0;

  const remaining = usageLimit - usageCount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border mb-6 border-gray-200 p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Usage</h3>

          <p className="text-sm text-gray-500">Your current subscription</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.plan === "premium"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.plan === "premium" ? "👑 Premium" : "Free"}
        </span>
      </div>

      {user.plan === "premium" ? (
        <>
          <div className="mb-5">
            <h2 className="text-4xl font-bold text-emerald-600">∞</h2>

            <p className="text-gray-500">Unlimited AI Credits</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-700 font-medium">
              Unlimited Research Assistant Enabled 🚀
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Credits Remaining</span>

            <span className="font-semibold">
              {remaining} / {usageLimit}
            </span>
          </div>

          {/* Progress */}

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{
                width: `${(remaining / usageLimit) * 100}%`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Used: {usageCount}</span>

            <span>Limit: {usageLimit}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default UserCard;
