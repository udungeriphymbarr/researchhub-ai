import { useEffect, useState } from "react";
import { authFetch } from "../../api/api";
import Swal from "sweetalert2";

function Settings() {
const [saving, setSaving] = useState(false);
const [settings, setSettings] = useState({

siteName:"",

heroTitle:"",

heroSubtitle:"",

footerText:"",

contactEmail:"",

supportEmail:"",

phone:"",

currency:"",

currencySymbol:"",

productsPerPage:12,

featuredProductsCount:6,

maintenanceMode:false,

});

useEffect(()=>{

fetchSettings();

},[]);

const fetchSettings = async()=>{

try{

const response = await authFetch("/api/settings");

const data = await response.json();

if(data.success){

setSettings(data.settings);

}

}catch(err){

console.log(err);

}

};

const handleChange=(e)=>{

const {name,value,type,checked}=e.target;

setSettings({

...settings,

[name]:

type==="checkbox"

? checked

: value,

});

};

const saveSettings = async()=>{

try{

const response=await authFetch(

"/api/settings",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(settings),

}

);

const data=await response.json();

if(data.success){

    Swal.fire({

        icon:"success",

        title:"Settings Updated"

    });

    fetchSettings();

}

}catch(err){

console.log(err);

}

};

const saveSettings = async () => {
    try {
        setSaving(true);

        const response = await authFetch(
            "/api/settings",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings),
            }
        );

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                icon: "success",
                title: "Settings Updated"
            });

            fetchSettings();
        }

    } catch (err) {
        console.log(err);

    } finally {
        setSaving(false);
    }
};

return (

<div className="max-w-5xl mx-auto space-y-8">

<h1 className="text-4xl font-bold">
Platform Settings
</h1>

<div className="bg-white rounded-2xl shadow p-6 space-y-5">

<h2 className="text-2xl font-bold">
🎨 Branding
</h2>

<input
name="siteName"
value={settings.siteName || ""}
onChange={handleChange}
placeholder="Platform Name"
className="w-full border rounded-lg p-3"
/>

<input
name="heroTitle"
value={settings.heroTitle || ""}
onChange={handleChange}
placeholder="Hero Title"
className="w-full border rounded-lg p-3"
/>

<input
name="heroSubtitle"
value={settings.heroSubtitle || ""}
onChange={handleChange}
placeholder="Hero Subtitle"
className="w-full border rounded-lg p-3"
/>

<textarea
name="footerText"
value={settings.footerText || ""}
onChange={handleChange}
placeholder="Footer Text"
rows="3"
className="w-full border rounded-lg p-3"
/>

</div>

<div className="bg-white rounded-2xl shadow p-6 space-y-5">

<h2 className="text-2xl font-bold">
📞 Contact
</h2>

<input
name="contactEmail"
value={settings.contactEmail || ""}
onChange={handleChange}
placeholder="Contact Email"
className="w-full border rounded-lg p-3"
/>

<input
name="supportEmail"
value={settings.supportEmail || ""}
onChange={handleChange}
placeholder="Support Email"
className="w-full border rounded-lg p-3"
/>

<input
name="phone"
value={settings.phone || ""}
onChange={handleChange}
placeholder="Phone Number"
className="w-full border rounded-lg p-3"
/>

</div>

<div className="bg-white rounded-2xl shadow p-6 space-y-5">

<h2 className="text-2xl font-bold">
🛒 Store
</h2>

<div className="grid md:grid-cols-2 gap-5">

<input
name="currency"
value={settings.currency || ""}
onChange={handleChange}
placeholder="Currency"
className="border rounded-lg p-3"
/>

<input
name="currencySymbol"
value={settings.currencySymbol || ""}
onChange={handleChange}
placeholder="Currency Symbol"
className="border rounded-lg p-3"
/>

<input
type="number"
name="productsPerPage"
value={settings.productsPerPage || 12}
onChange={handleChange}
placeholder="Products Per Page"
className="border rounded-lg p-3"
/>

<input
type="number"
name="featuredProductsCount"
value={settings.featuredProductsCount || 6}
onChange={handleChange}
placeholder="Featured Products"
className="border rounded-lg p-3"
/>

</div>

</div>

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-2xl font-bold mb-5">
⚙️ System
</h2>

<label className="flex items-center gap-4">

<input
type="checkbox"
name="maintenanceMode"
checked={settings.maintenanceMode || false}
onChange={handleChange}
/>

<span>
Enable Maintenance Mode
</span>

</label>

</div>

<div className="text-right">

<button
    disabled={saving}
    onClick={saveSettings}
    className="
    bg-blue-600
    hover:bg-blue-700
    disabled:bg-gray-400
    text-white
    font-semibold
    px-8
    py-4
    rounded-xl
    transition
    "
>
    {saving ? "Saving..." : "💾 Save Settings"}
</button>

</div>

</div>

);

}


export default Settings;