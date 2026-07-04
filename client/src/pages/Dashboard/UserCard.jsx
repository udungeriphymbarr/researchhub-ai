function UserCard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

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