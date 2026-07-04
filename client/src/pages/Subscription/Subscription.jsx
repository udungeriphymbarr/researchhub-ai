import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";
import { toast } from "react-toastify";

function Subscription() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = JSON.parse(
            localStorage.getItem("user")
        );

        setUser(storedUser);

    }, []);

    if (!user) return null;
    

    const percentage =
        Math.min(
            (user.usageCount / 20) * 100,
            100
        );

const upgrade = async () => {
  const response = await authFetch("/api/payment/initialize", {
    method: "POST",
  });

  const data = await response.json();

  if (!data.success) {
    toast.error(data.message);
    return;
  }

  window.location.href = data.authorization_url;
};

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Subscription
                </h1>

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-bold">

                        {user.plan === "premium"
                            ? "Premium Plan ⭐"
                            : "Free Plan"}

                    </h2>

                    {
                        user.plan === "free" && (

                            <>

                                <p className="mt-5">

                                    AI Usage

                                </p>

                                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

                                    <div

                                        className="bg-blue-600 h-4 rounded-full"

                                        style={{
                                            width: `${percentage}%`
                                        }}

                                    />

                                </div>

                                <p className="mt-2 text-gray-600">

                                    {user.usageCount} / 20 AI generations used

                                </p>

                            </>

                        )
                    }

                    {
                        user.plan === "premium" && (

                            <div className="mt-6">

                                <p className="text-green-600 font-semibold">

                                    Unlimited AI Access Enabled

                                </p>

                            </div>

                        )
                    }

                </div>

               {
user.plan === "premium" ? (

<button
disabled
className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-default"
>
Premium Active ✅
</button>

) : (

<button
onClick={upgrade}
className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
Upgrade to Premium
</button>

)
}

            </div>

        </div>

    );

}

export default Subscription;