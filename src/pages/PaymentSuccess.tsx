import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

// Red/white spinner loader
const Spinner = () => (
  <div className="flex justify-center my-8">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-white"></div>
  </div>
);

// Red checkmark SVG
const SuccessCheckmark = () => (
  <svg
    className="mx-auto my-6"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
  >
    <circle cx="32" cy="32" r="32" fill="#ef4444" />
    <path
      d="M20 34L29 43L44 25"
      stroke="#fff"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PaymentSuccess = () => {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");
  const { refetchUser } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");

  useEffect(() => {
    const verifyPaymentAndUpdateUser = async () => {
      try {
        // Step 1: Verify payment with Paystack
        const { data } = await api.get(`/api/verify?reference=${reference}`);
        
        if (data.status === "success") {
          setStatus("success");
          setMessage("Payment verified successfully! Updating your account...");

          // Step 2: Immediately refetch user data to get latest payment status
          try {
            await refetchUser();
            
            // Step 3: Invalidate all relevant queries
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["paymentStatus"] });
            queryClient.invalidateQueries({ queryKey: ["courseProgress"] });
            queryClient.invalidateQueries({ queryKey: ["cohort"] });
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            queryClient.invalidateQueries({ queryKey: ["currentWeek"] });
            
            setMessage("Account updated! Redirecting to dashboard...");
            
            // Set session storage flag for dashboard to detect
            sessionStorage.setItem('paymentSuccess', 'true');
            sessionStorage.setItem('paymentTimestamp', Date.now().toString());
            
            // Step 4: Short delay to ensure data is refreshed, then redirect
            setTimeout(() => {
              navigate("/dashboard", { 
                replace: true,
                state: { paymentSuccess: true }
              });
            }, 1500);
            
          } catch (userError) {
            console.error("User data refresh error:", userError);
            // Still proceed to dashboard but with flag for manual refresh
            setMessage("Payment successful! Redirecting...");
            sessionStorage.setItem('paymentSuccess', 'true');
            setTimeout(() => navigate("/dashboard"), 2000);
          }
          
        } else {
          setStatus("error");
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        
        // Check if it's an installment error that might be recoverable
        if (error.response?.data?.error?.includes("already paid")) {
          setStatus("success");
          setMessage("Payment already processed! Updating your account...");
          
          // Still refetch user data
          await refetchUser();
          queryClient.invalidateQueries({ queryKey: ["user"] });
          
          sessionStorage.setItem('paymentSuccess', 'true');
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          setStatus("error");
          setMessage("Payment verification failed. Please contact support.");
        }
      }
    };

    if (reference) {
      verifyPaymentAndUpdateUser();
    } else {
      setStatus("error");
      setMessage("No payment reference found.");
    }
  }, [reference, navigate, refetchUser, queryClient]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-200">
        {status === "verifying" ? (
          <>
            <Spinner />
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Verifying Payment...
            </h1>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </>
        ) : status === "success" ? (
          <>
            <SuccessCheckmark />
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="mt-4">
              <Spinner />
              <p className="text-sm text-gray-500 mt-2">Preparing your dashboard...</p>
            </div>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl my-6">✖</div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-xs text-gray-500 mb-4">
              Reference: {reference || "N/A"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/courses")}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};