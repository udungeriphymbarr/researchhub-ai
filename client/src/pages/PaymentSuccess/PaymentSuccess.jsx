import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../api/api";

function PaymentSuccess(){

    const navigate = useNavigate();

    useEffect(()=>{

        const verify = async()=>{

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const reference =
                params.get("reference");

            if(!reference){

                navigate("/dashboard");

                return;

            }

            const response =
                await authFetch(
                    `/api/payment/verify/${reference}`
                );

            const data =
                await response.json();

            if(data.success){

                const user =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                user.plan="premium";

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                alert(
                    "Premium Activated 🎉"
                );

            }

            navigate("/dashboard");

        };

        verify();

    },[]);

    return(

        <div className="flex items-center justify-center h-screen">

            <h1 className="text-2xl font-bold">

                Verifying Payment...

            </h1>

        </div>

    );

}

export default PaymentSuccess;