import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";

function UserCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const localUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!localUser) return;

      const response = await authFetch(
        `/api/users/profile`
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }
    } catch (error) {
      console.log(error);

      const localUser = JSON.parse(
        localStorage.getItem("user")
      );

      setUser(localUser);
    }
  };

  if (!user) return null;

  const usageLimit = user.usageLimit || 20;
  const usageCount = user.usageCount || 0;

  const remaining = usageLimit - usageCount;

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Plan</span>

          <span
            className={`font-bold ${
              user.plan === "premium"
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            {user.plan === "premium"
              ? "Premium 👑"
              : "Free"}
          </span>
        </div>

        {user.plan === "premium" ? (
          <div className="flex justify-between">
            <span>AI Credits</span>

            <span className="font-bold text-green-600">
              Unlimited ♾️
            </span>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span>AI Used</span>

              <span className="font-bold">
                {usageCount}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Remaining</span>

              <span className="font-bold">
                {remaining}
              </span>
            </div>
          </>
        )}

      </div>

      {user.plan === "premium" && (
        <div className="mt-6 bg-green-100 text-green-700 rounded-lg p-3 text-center font-semibold">
          Unlimited Research Assistant Enabled 🚀
        </div>
      )}
    </div>
  );
}

export default UserCard;