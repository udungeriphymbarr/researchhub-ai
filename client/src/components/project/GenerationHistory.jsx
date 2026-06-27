function GenerationHistory({
    generations
}) {

    return (

        <div className="space-y-5">

            {generations.map((item) => (

                <div
                    key={item._id}
                    className="bg-white rounded-xl shadow p-5"
                >

                    <div className="flex justify-between mb-4">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                            {item.type}

                        </span>

                        <small className="text-gray-500">

                            {new Date(
                                item.createdAt
                            ).toLocaleString()}

                        </small>

                    </div>

                    <h3 className="font-semibold mb-3">

                        {item.input}

                    </h3>

                    {(Array.isArray(item.output)
                        ? item.output
                        : [item.output]
                    ).map((answer, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-3 mb-2"
                        >

                            {answer}

                        </div>

                    ))}

                </div>

            ))}

        </div>

    );

}

export default GenerationHistory;