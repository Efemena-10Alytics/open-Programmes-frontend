"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { ProtectedRoute } from "../utilities/ProtectedRoute";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaClock,
  FaGraduationCap,
  FaUnlock,
  FaCalendarAlt,
  FaStar
} from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { TbCalendarDue } from "react-icons/tb";
import { MdVerified, MdTrendingUp } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Logo from "../10alytics"
import LoadingOverlay from "../utilities/LoadingOverlay";

const TOTAL_COURSE_FEE = Number(process.env.NEXT_PUBLIC_TOTAL_COURSE_FEE) || 250000;
const ORIGINAL_COURSE_FEE = 350000;

type PaymentPlan = "FULL" | "HALF" | "THREE_INSTALLMENT" | "INSTALLMENT" | null;

type InstallmentItem = {
  amount: number;
  label: string;
  dueDate?: string;
  description?: string;
  cumulativeAmount?: number;
  milestone?: string;
};

type PaymentPlanConfig = {
  title: string;
  description: string;
  benefits: string[];
  paymentPlan: "FULL_PAYMENT" | "FIRST_HALF_COMPLETE" | "FOUR_INSTALLMENTS" | "THREE_INSTALLMENTS";
  popular?: boolean;
  savings?: number;
} & (
    | { type: "FULL"; amount: number }
    | { type: "HALF"; installments: number[] }
    | { type: "THREE_INSTALLMENT"; installments: InstallmentItem[] }
    | { type: "INSTALLMENT"; installments: InstallmentItem[] }
  );

type PaymentPlansType = {
  [key in Exclude<PaymentPlan, null>]: PaymentPlanConfig;
};

const PAYMENT_PLANS: PaymentPlansType = {
  FULL: {
    type: "FULL",
    title: "Full Payment",
    description: "Pay the entire course fee upfront and join a specific cohort",
    paymentPlan: "FULL_PAYMENT",
    amount: TOTAL_COURSE_FEE,
    savings: ORIGINAL_COURSE_FEE - TOTAL_COURSE_FEE,
    benefits: [
      "Immediate full course access",
      "Priority support & mentorship",
      "Certificate included",
      "Lifetime access to updates",
      "Exclusive alumni network",
      "Choose your cohort start date"
    ],
  },
  HALF: {
    type: "HALF",
    title: "Two Installments",
    description: "Split payment into two equal parts with cohort-based timing",
    paymentPlan: "FIRST_HALF_COMPLETE",
    installments: [TOTAL_COURSE_FEE / 2, TOTAL_COURSE_FEE / 2],
    benefits: [
      "Pay 50% now, 50% later",
      "Cohort-based payment schedule",
      "Course access after first payment",
      "Payment reminders included",
      "Choose your cohort start date"
    ],
  },
  THREE_INSTALLMENT: {
    type: "THREE_INSTALLMENT",
    title: "Three Installments",
    description: "Three payments aligned with your cohort's program milestones",
    paymentPlan: "THREE_INSTALLMENTS",
    popular: true,
    installments: [
      {
        amount: 85000,
        label: "Cohort Start Payment",
        description: "Secure your spot when your cohort begins",
        cumulativeAmount: 85000,
        milestone: "Immediate Course Access"
      },
      {
        amount: 85000,
        label: "1 Month Payment",
        description: "Due 1 month into your cohort program",
        cumulativeAmount: 170000,
        milestone: "Advanced Modules Unlocked"
      },
      {
        amount: 80000,
        label: "2 Month Payment",
        description: "Due 2 months into your cohort program",
        cumulativeAmount: 250000,
        milestone: "Program Completion & Certification"
      },
    ],
    benefits: [
      "Start with ₦85,000 only",
      "Payments aligned with cohort milestones",
      "Immediate access after first payment",
      "Cohort-based schedule ensures timely support",
      "Payment reminders before each due date"
    ],
  },
  INSTALLMENT: {
    type: "INSTALLMENT",
    title: "Four Installments",
    description: "Maximum flexibility with cohort-aligned milestone payments",
    paymentPlan: "FOUR_INSTALLMENTS",
    installments: [
      {
        amount: 30000,
        label: "Seat Reservation",
        description: "Reserve your spot in your chosen cohort",
        cumulativeAmount: 30000,
        milestone: "Seat Confirmed"
      },
      {
        amount: 55000,
        label: "Cohort Access",
        description: "Complete payment for full course access at cohort start",
        cumulativeAmount: 85000,
        milestone: "Full Course Access"
      },
      {
        amount: 85000,
        label: "1 Month Payment",
        description: "Due 1 month into your cohort program",
        cumulativeAmount: 170000,
        milestone: "Advanced Content Unlocked"
      },
      {
        amount: 80000,
        label: "2 Month Payment",
        description: "Due 2 months into your cohort program",
        cumulativeAmount: 250000,
        milestone: "Program Completion"
      },
    ],
    benefits: [
      "Start with just ₦30,000",
      "Payments timed with cohort progress",
      "Access after ₦85k total payment",
      "Milestone-based progression",
      "Cohort-based support and community"
    ],
  },
};

const PaymentPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(null);
  const [selectedCohort, setSelectedCohort] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPlans, setShowPlans] = useState(false);

  // Ref for the payment button to scroll to
  const paymentButtonRef = useRef<HTMLButtonElement>(null);

  // Generate cohort options for the next 2 months
  const getAvailableCohorts = () => {
    const today = new Date();
    const cohorts: string[] = [];

    // In development, allow selecting current month (0) for testing
    // In production, default restriction applies (starts from next month, 1)
    // NOTE: Revert this or ensure strictly for dev before live deployment if needed, 
    // though the ENV check handles it safely.
    const startOffset = process.env.NEXT_PUBLIC_NODE_ENV === "development" || "production" ? 0 : 1;
    const numberOfCohorts = 2;

    for (let i = startOffset; i < startOffset + numberOfCohorts; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      const year = date.getFullYear();
      cohorts.push(`${monthName} ${year} Cohort`);
    }

    return cohorts;
  };

  const availableCohorts = getAvailableCohorts();

  const { data: existingPayment } = useQuery({
    queryKey: ["paymentStatus", courseId, user?.id],
    queryFn: async () => {
      if (!user?.id || !courseId) return null;
      const { data } = await api.get(`/api/payment-status`, {
        params: { userId: user.id, courseId },
      });
      return data;
    },
    enabled: !!user?.id && !!courseId,
  });

  const { mutate: initiatePayment, isPending } = useMutation({
    mutationFn: async () => {
      if (!selectedPlan) throw new Error("Please select a payment plan");
      if (!user?.id) throw new Error("User not authenticated");
      if (!courseId) throw new Error("Course ID not found");
      if (!selectedCohort) throw new Error("Please select a cohort");

      let payload: any = { userId: user.id, courseId };

      if (existingPayment?.status === "BALANCE_HALF_PAYMENT") {
        payload = {
          ...payload,
          existingPaymentId: existingPayment.id,
          planType: "HALF",
          amount: existingPayment.remainingAmount,
        };
      } else {
        payload = {
          ...payload,
          planType: selectedPlan,
          cohortName: selectedCohort,
        };
      }

      const { data } = await api.post("/api/initiate-payment", payload);
      return data;
    },
    onSuccess: (data) => {
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    },
    onError: (err: any) => {
      console.error("Payment error:", err);

      // Extract error message from different error formats
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (err.response?.data?.message) {
        // Backend API error with message
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        // Backend API error with error field
        errorMessage = err.response.data.error;
      } else if (err.message) {
        // Standard error message
        errorMessage = err.message;
      }

      // Add helpful context for common errors
      if (errorMessage.toLowerCase().includes("cohort")) {
        errorMessage = `⚠️ Cohort Error: ${errorMessage}. Please contact support or try selecting a different cohort.`;
      } else if (errorMessage.toLowerCase().includes("course")) {
        errorMessage = `⚠️ Course Error: ${errorMessage}. This course may not be available for enrollment yet.`;
      } else if (errorMessage.toLowerCase().includes("payment")) {
        errorMessage = `⚠️ Payment Error: ${errorMessage}`;
      }

      setError(errorMessage);

      // Scroll to error message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Clear error after 10 seconds (increased from 5)
      setTimeout(() => setError(null), 10000);
    },
  });

  // Scroll to payment button when both plan and cohort are selected
  useEffect(() => {
    if (selectedPlan && selectedCohort && paymentButtonRef.current) {
      setTimeout(() => {
        paymentButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [selectedPlan, selectedCohort]);

  const handlePlanSelect = (planKey: PaymentPlan) => {
    setSelectedPlan(planKey);

    // If cohort is already selected, scroll to payment button
    if (selectedCohort && paymentButtonRef.current) {
      setTimeout(() => {
        paymentButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  };

  const handleCohortSelect = (cohort: string) => {
    setSelectedCohort(cohort);

    // If plan is already selected, scroll to payment button
    if (selectedPlan && paymentButtonRef.current) {
      setTimeout(() => {
        paymentButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  };

  const calculateTotal = (plan: PaymentPlanConfig): number => {
    switch (plan.type) {
      case "FULL":
        return plan.amount;
      case "HALF":
        return plan.installments.reduce((sum, i) => sum + i, 0);
      case "INSTALLMENT":
      case "THREE_INSTALLMENT":
        return plan.installments.reduce((sum, i) => sum + i.amount, 0);
      default:
        return 0;
    }
  };

  const getPaymentScheduleDescription = (plan: PaymentPlanConfig) => {
    if (!selectedCohort) return null;

    if (plan.type === "FULL") {
      return (
        <div className="mt-3 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            📅 You'll join the: {selectedCohort}
          </p>
        </div>
      );
    }

    if (plan.type === "HALF") {
      return (
        <div className="mt-3 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            📅 Your payment schedule for {selectedCohort}:
          </p>
          <ul className="text-xs text-green-700 mt-2 space-y-1">
            <li>• Payment 1: At cohort start (50%)</li>
            <li>• Payment 2: 1 month into program (50%)</li>
          </ul>
        </div>
      );
    }

    if (plan.type === "THREE_INSTALLMENT") {
      return (
        <div className="mt-3 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            📅 Your payment schedule for {selectedCohort}:
          </p>
          <ul className="text-xs text-green-700 mt-2 space-y-1">
            <li>• Payment 1: At cohort start</li>
            <li>• Payment 2: 1 month into program</li>
            <li>• Payment 3: 2 months into program</li>
          </ul>
        </div>
      );
    }

    if (plan.type === "INSTALLMENT") {
      return (
        <div className="mt-3 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            📅 Your payment schedule for {selectedCohort}:
          </p>
          <ul className="text-xs text-green-700 mt-2 space-y-1">
            <li>• Payment 1: Seat reservation</li>
            <li>• Payment 2: Cohort access</li>
            <li>• Payment 3: 1 month into program</li>
            <li>• Payment 4: 2 months into program</li>
          </ul>
        </div>
      );
    }
  };

  const renderInstallmentDetails = (plan: PaymentPlanConfig) => {
    if (plan.type === "FULL") {
      return (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-700 mb-2">
              ₦{plan.amount.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-500 line-through">₦{ORIGINAL_COURSE_FEE.toLocaleString()}</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                Save ₦{(ORIGINAL_COURSE_FEE - plan.amount).toLocaleString()}
              </span>
            </div>
            <p className="text-purple-600 font-medium">One-time payment</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-purple-600">
              <FaUnlock className="text-lg" />
              <span className="text-sm font-medium">Instant full access</span>
            </div>
          </div>
        </div>
      );
    }

    if (plan.type === "HALF") {
      return (
        <div className="space-y-4">
          {plan.installments.map((amount, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-purple-900">Payment {idx + 1}</h4>
                  <p className="text-sm text-purple-600">
                    {idx === 0 ? "Initial payment for access" : "Final payment"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-700">
                    ₦{amount.toLocaleString()}
                  </div>
                  {idx === 0 && (
                    <div className="text-xs text-gray-500 line-through">₦{(ORIGINAL_COURSE_FEE / 2).toLocaleString()}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (plan.type === "THREE_INSTALLMENT" || plan.type === "INSTALLMENT") {
      return (
        <div className="space-y-4">
          {plan.installments.map((installment, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      Step {idx + 1}
                    </span>
                    <h4 className="font-semibold text-purple-900">{installment.label}</h4>
                  </div>
                  <p className="text-sm text-purple-600 mb-2">{installment.description}</p>
                  <div className="flex items-center gap-2 text-purple-700">
                    <MdVerified className="text-sm" />
                    <span className="text-xs font-medium">{installment.milestone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-700 mb-1">
                    ₦{installment.amount.toLocaleString()}
                  </div>
                  {idx === 0 && (
                    <div className="text-xs text-gray-500 line-through">₦{(ORIGINAL_COURSE_FEE * 0.3).toLocaleString()}</div>
                  )}
                  <div className="text-xs text-purple-500">
                    Total: ₦{installment.cumulativeAmount?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((installment.cumulativeAmount || 0) / TOTAL_COURSE_FEE) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      {isPending && <LoadingOverlay message="Processing your payment..." />}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Logo />
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-purple-500 transition-colors p-2 rounded-full hover:bg-purple-50"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>
        </nav>

        {existingPayment?.status === "BALANCE_HALF_PAYMENT" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-300 shadow-lg">
              <div className="flex items-center gap-3">
                <FaClock className="text-amber-600 text-xl" />
                <div>
                  <h3 className="font-semibold text-amber-800">Payment In Progress</h3>
                  <p className="text-amber-700">
                    You have an existing payment plan. Remaining balance: ₦{(TOTAL_COURSE_FEE / 2).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
              <FaShieldAlt />
              <span>Secure Payment System</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Invest in Your Future
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> Today</span>
            </h1>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-2xl border border-purple-200 max-w-3xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  LIMITED TIME OFFER
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-800 font-medium">
                    Get <span className="font-bold text-purple-700">₦100,000 OFF</span> the original ₦350,000 course fee!
                  </p>
                  <p className="text-sm text-gray-606 mt-1">
                    Pay only ₦250,000 now while this discount lasts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-purple-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Payment System Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose your preferred cohort and payment plan. All payments are aligned with cohort milestones.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-400 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Cohort</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold text-purple-600">Next 2 cohorts only</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Select which cohort you want to join from the available options
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MdTrendingUp className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Payment Plan</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold text-purple-600">4 flexible options</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Choose full payment, half payment, or installment plans aligned with your cohort
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Your Cohort</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-bold text-purple-600">Cohort-based learning</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Start learning with peers in your chosen cohort, with payments timed to program milestones
                </p>
              </div>
            </div>
          </div>

          {!showPlans && (
            <div className="text-center mb-12">
              <button
                onClick={() => setShowPlans(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Choose Your Payment Plan
              </button>
            </div>
          )}

          <div className={`transition-all duration-700 ${showPlans ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 pointer-events-none'}`}>
            {showPlans && (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Payment Plan</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Select the payment option that best fits your budget and choose your cohort
                  </p>
                </div>

                {/* Cohort selection for ALL payment plans */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                    <h3 className="text-xl font-semibold text-blue-900">Select Your Cohort</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <select
                        value={selectedCohort}
                        onChange={(e) => handleCohortSelect(e.target.value)}
                        className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-center"
                      >
                        <option value="">Choose your cohort</option>
                        {availableCohorts.map((cohort) => (
                          <option key={cohort} value={cohort}>
                            {cohort}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-blue-600 mt-2">
                        Available cohorts for the next 2 months only
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      {selectedCohort ? (
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-semibold text-blue-800">
                            📅 Selected: {selectedCohort}
                          </p>
                          <p className="text-sm text-blue-600 mt-1">
                            You'll join this cohort's program
                          </p>
                        </div>
                      ) : (
                        <div className="text-center text-blue-600">
                          <FaCalendarAlt className="text-3xl mx-auto mb-2" />
                          <p>Please select a cohort</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-8 p-5 bg-red-50 text-red-800 rounded-xl border-2 border-red-300 shadow-lg animate-shake">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-900 mb-1">Payment Error</h3>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{error}</p>
                      </div>
                      <button
                        onClick={() => setError(null)}
                        className="flex-shrink-0 text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Close error"
                      >
                        <IoCloseOutline className="text-2xl" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  {Object.entries(PAYMENT_PLANS).map(([planKey, plan]) => (
                    <div
                      key={planKey}
                      onClick={() => handlePlanSelect(planKey as PaymentPlan)}
                      className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${selectedPlan === planKey
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-2xl scale-[1.02]"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl"
                        }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                            <FaStar className="text-xs" />
                            Most Popular
                          </div>
                        </div>
                      )}

                      {plan.savings && (
                        <div className="absolute -top-4 right-8">
                          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Save ₦{plan.savings.toLocaleString()}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                          <p className="text-gray-600 mb-4">{plan.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-gray-900">
                              ₦{calculateTotal(plan).toLocaleString()}
                            </div>
                            <div className="text-gray-500 line-through text-sm">
                              ₦{ORIGINAL_COURSE_FEE.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className={`transition-all duration-300 ${selectedPlan === planKey ? "scale-100 opacity-100" : "scale-0 opacity-0"
                          }`}>
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        {renderInstallmentDetails(plan)}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                        {plan.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FaCheckCircle className="text-purple-600 text-xs" />
                            </div>
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {selectedPlan === planKey && selectedCohort && (
                        getPaymentScheduleDescription(plan)
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    ref={paymentButtonRef}
                    onClick={() => initiatePayment()}
                    disabled={!selectedPlan || isPending || !selectedCohort}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 mx-auto"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <FaMoneyCheckAlt className="text-xl" />
                        {existingPayment?.status === "BALANCE_HALF_PAYMENT"
                          ? "Pay Remaining Balance"
                          : selectedPlan === "FULL"
                            ? "Pay Full Amount"
                            : "Start Payment Plan"
                        }
                      </>
                    )}
                  </button>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-emerald-600" />
                        <span>256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/svg/paystack-logo.png" alt="Paystack" className="h-4 opacity-75" />
                        <span>Secure payments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;