import { useState } from "react";
import API from "../../api/api";

function SupervisorModal({
    action,
    generation,
    projectId,
    onClose,
}) {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const runAI = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/api/ai/supervisor`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({

                        action,

                        content:Array.isArray(generation.output)
                        ? generation.output.join("\n")
                        : generation.output,

                        projectId,

                    }),
                }
            );

            const data = await response.json();

            if(data.success){

                setResult(data.output);

            }

            else{

                alert(data.message);

            }

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    };

    return(

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

<div className="bg-white rounded-2xl w-full max-w-3xl p-8">

<h2 className="text-2xl font-bold mb-5">

AI Supervisor

</h2>

{!result && !loading && (

<button

onClick={runAI}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

Run AI

</button>

)}

{loading && (

<p>Thinking...</p>

)}

{result && (

<div className="bg-gray-100 rounded-xl p-5 whitespace-pre-wrap">

{result}

</div>

)}

<div className="mt-6 flex justify-end">

<button

onClick={onClose}

className="bg-gray-500 text-white px-5 py-2 rounded-lg"

>

Close

</button>

</div>

</div>

</div>

    );

}

export default SupervisorModal;