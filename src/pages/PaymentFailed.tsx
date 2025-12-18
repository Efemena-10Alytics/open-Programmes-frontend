import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";

const Spinner = () => (
  <div className="flex justify-center my-8">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-white"></div>
  </div>
);

const FailedCross = () => (
  <svg
    className="mx-auto my-6"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
  >
    <circle cx="32" cy="32" r="32" fill="#ef4444" />
    <path
      d="M22 22L42 42M42 22L22 42"
      stroke="#fff"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const PaymentFailed = () => {
  const [status, setStatus] = useState<"verifying" | "failed" | "recovered">("verifying");
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");
  const reason = params.get("reason");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await api.get(`/api/verify?reference=${reference}`);
        if (data.status === "success") {
          setStatus("recovered");
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("failed");
      }
    };

    if (reference) verifyPayment();
    else setStatus("failed");
  }, [reference, navigate]);

  const getErrorMessage = () => {
    if (reason === "verification") return "Payment verification timeout";
    if (reason === "processing") return "Payment processing error";
    return "Payment processing failed";
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-200">
        {status === "verifying" ? (
          <>
            <Spinner />
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Checking Payment Status...
            </h1>
            <p className="text-gray-600">Please wait while we verify transaction</p>
          </>
        ) : status === "recovered" ? (
          <>
            <div className="text-green-500 text-6xl my-6">✓</div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Payment Recovered!
            </h1>
            <p className="text-gray-600 mb-6">
              Redirecting to dashboard...
            </p>
          </>
        ) : (
          <>
            <FailedCross />
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              {getErrorMessage()}
            </h1>
            <p className="text-gray-600 mb-4">
              Reference: {reference || "N/A"}
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate("/courses")}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold
                  hover:bg-red-600 transition-colors"
              >
                Retry Payment
              </button>
              
              <button
                onClick={() => navigate("/support")}
                className="w-full border border-red-500 text-red-500 py-3 rounded-lg
                  font-semibold hover:bg-red-50 transition-colors"
              >
                Contact Support
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Already paid? Status might update within 5-10 minutes
            </p>
          </>
        )}
      </div>
    </div>
  );
};