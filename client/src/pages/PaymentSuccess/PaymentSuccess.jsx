import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authFetch } from "../../api/api";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const reference = searchParams.get("reference");

      if (!reference) {
        toast.error("Invalid payment.");
        navigate("/subscription");
        return;
      }

      const response = await authFetch(
        `/api/payment/verify/${reference}`
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        navigate("/subscription");
        return;
      }

      // Update local user
const user = data.user;

localStorage.setItem(
    "user",
    JSON.stringify(user)
);

toast.success("🎉 Premium activated!");

navigate("/dashboard", { replace: true });

    } catch (error) {
      console.log(error);

      toast.error("Verification failed.");

      navigate("/subscription");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-bold">
        Verifying Payment...
      </h2>
    </div>
  );
}

export default PaymentSuccess;