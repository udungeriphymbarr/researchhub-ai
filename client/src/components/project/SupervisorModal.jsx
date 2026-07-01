import { useState } from "react";

function SupervisorModal({
    title,
    content,
    onClose,
}) {

    const copy = () => {
        navigator.clipboard.writeText(content);
        alert("Copied!");
    };

    return (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

<div className="bg-white w-full max-w-4xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto">

<h2 className="text-3xl font-bold mb-6">

🤖 {title}

</h2>

<div className="border rounded-xl p-6 whitespace-pre-wrap">

{content}

</div>

<div className="flex gap-3 justify-end mt-6">

<button

onClick={copy}

className="bg-blue-600 text-white px-5 py-2 rounded-lg"

>

Copy

</button>

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