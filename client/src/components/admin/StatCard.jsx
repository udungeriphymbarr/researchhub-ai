import {
    TrendingUp,
    TrendingDown
} from "lucide-react";

function StatCard({
    title,
    value,
    icon,
    color = "blue",
    change,
}) {

    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        purple: "bg-purple-100 text-purple-600",
        yellow: "bg-yellow-100 text-yellow-600",
        red: "bg-red-100 text-red-600",
        indigo: "bg-indigo-100 text-indigo-600",
    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                    w-14
                    h-14
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${colors[color]}
                    `}
                >

                    {icon}

                </div>

            </div>

            {change && (

                <div className="mt-5 flex items-center gap-2">

                    {change > 0 ? (

                        <TrendingUp
                            size={18}
                            className="text-green-500"
                        />

                    ) : (

                        <TrendingDown
                            size={18}
                            className="text-red-500"
                        />

                    )}

                    <span
                        className={
                            change > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >

                        {change}%

                    </span>

                    <span className="text-gray-400">

                        vs last month

                    </span>

                </div>

            )}

        </div>

    );

}

export default StatCard;