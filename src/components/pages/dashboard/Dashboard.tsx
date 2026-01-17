"use client";

import { useState, useEffect, useRef } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import BorderedCard from "../../dashboard/BorderedCard";
import EmptyState from "../../dashboard/EmptyState";
import QuickInfoCard from "../../dashboard/QuickInfoCard";
import TableRow from "../../dashboard/TableRow";
import CourseCard2 from "../../utilities/CourseCard2";
import ProgressBar from "../../utilities/ProgressBar";
import { ProtectedRoute } from "../../utilities/ProtectedRoute";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "../../dashboard/Cards";
import FormattedDate from "../../dashboard/FormattedDate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import Loader from "../../utilities/Loader";
import { formatName } from "../../../utils/formatName";
import Image from "next/image";

const TOTAL_COURSE_FEE =
  Number(process.env.NEXT_PUBLIC_TOTAL_COURSE_FEE) || 250000;

const EnrollBtn = () => {
  return (
    <Link
      href="/dashboard/catalog"
      className="bg-[#2684FF2B] flex justify-center items-center text-[#2684FF] text-[12px] rounded-full px-5 py-2"
    >
      Enroll Now
    </Link>
  );
};

interface LeaderboardEntry {
  rank: number;
  userId: string;
  quizPoints: number;
  completedVideos: number;
  hasCompletedCourse: boolean;
  user?: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface CurrentWeekData {
  currentWeek: {
    id: string;
    title: string;
    iconUrl?: string;
  };
  currentWeekNumber: number;
  totalWeeks: number;
  upcomingEvent?: {
    id: string;
    name: string;
    category: string;
    date: Date;
  };
}

interface ModuleProgress {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  status: "Ongoing" | "Completed" | "Next Lesson";
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  imageUrl: string;
}

interface CohortData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  courseId: string;
  cohortCourses?: {
    onboardingBrochureUrl?: string;
  }[];
}

const Dashboard = () => {
  const { user, userID, isLoading: authLoading, refetchUser } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [countdown, setCountdown] = useState<string>("");
  const [cohortHasStarted, setCohortHasStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0);
  const hasCheckedPaymentRefresh = useRef(false);

  console.log("user data:", user);

  const isProductionDomain = () => {
    if (typeof window === "undefined") return false;
    const hostname = window.location.hostname;
    return hostname.includes('nebiant.com') || hostname.includes('www.nebiant.com');
  };

  // Check URL parameters for payment success
  useEffect(() => {
    if (searchParams?.get("payment") === "success") {
      sessionStorage.setItem("paymentSuccess", "true");
      // Clean URL by removing the parameter
      const newUrl = pathname?.split("?")[0] || "/dashboard";
      router.replace(newUrl);
    }
  }, [searchParams, pathname, router]);

  // Effect to handle payment success redirects and data refresh
  useEffect(() => {
    const checkForPaymentRefresh = async () => {
      // Prevent running multiple times
      if (hasCheckedPaymentRefresh.current) return;
      hasCheckedPaymentRefresh.current = true;

      // Check if we need to refresh data after payment
      const paymentSuccess = sessionStorage.getItem("paymentSuccess");

      if (paymentSuccess) {
        console.log("Refreshing data after payment...");

        // Force refresh all data
        try {
          await refetchUser();
          queryClient.invalidateQueries({ queryKey: ["user"] });
          queryClient.invalidateQueries({ queryKey: ["paymentStatus"] });
          queryClient.invalidateQueries({ queryKey: ["courseProgress"] });
          queryClient.invalidateQueries({ queryKey: ["cohort"] });
          queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
          queryClient.invalidateQueries({ queryKey: ["currentWeek"] });

          // Trigger a re-render with updated data
          setForceRefresh((prev) => prev + 1);
        } catch (error) {
          console.error("Error refreshing data after payment:", error);
        } finally {
          // Clear the flags
          sessionStorage.removeItem("paymentSuccess");
        }
      }
    };

    checkForPaymentRefresh();
  }, [refetchUser, queryClient]);

  // Derived values
  const courses = user?.course_purchased || [];
  const selectedCourse = courses[selectedCourseIndex]?.course;
  const courseId =
    selectedCourse?.id || user?.course_purchased?.[0]?.course?.id;
  const cohortId =
    user?.cohorts?.[selectedCourseIndex]?.cohortId ||
    user?.cohorts?.[0]?.cohortId;
  const isNewUser = courses.length === 0;
  const hasMultipleCourses = courses.length > 1;

  // Get the current user cohort for the selected course
  const userCohort = user?.cohorts?.[selectedCourseIndex];

  // Fetch cohort data including start date
  const {
    data: cohortData,
    isLoading: cohortLoading,
    error: cohortError,
    refetch: refetchCohort,
  } = useQuery<CohortData>({
    queryKey: ["cohort", cohortId, forceRefresh],
    queryFn: async () => {
      if (!cohortId) return null;
      const response = await api.get(`/api/cohorts/${cohortId}`);
      return response.data.data;
    },
    enabled: !!cohortId && !isNewUser,
  });

  // Check if cohort has started
  useEffect(() => {
    if (cohortData?.startDate) {
      const startDate = new Date(cohortData.startDate);
      const now = new Date();
      const hasStarted = now >= startDate;
      setCohortHasStarted(hasStarted);
      setShowWelcome(!hasStarted);
    }
  }, [cohortData]);

  // Create brochure data from cohort data
  const brochureData = cohortData?.cohortCourses?.[0]?.onboardingBrochureUrl
    ? {
      brochureUrl: cohortData.cohortCourses[0].onboardingBrochureUrl,
      cohortName: cohortData.name,
      cohortStartDate: cohortData.startDate,
      courseTitle: selectedCourse?.title || "Your Course",
    }
    : null;

  // Countdown timer effect
  useEffect(() => {
    if (!cohortData?.startDate) return;

    const startDate = new Date(cohortData.startDate);
    const now = new Date();

    // Check if cohort has started
    if (now >= startDate) {
      setCohortHasStarted(true);
      setShowWelcome(false);
      setCountdown("Cohort has started!");
      return;
    }

    // Set up countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const timeRemaining = startDate.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        setCohortHasStarted(true);
        setShowWelcome(false);
        setCountdown("Cohort has started!");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [cohortData]);

  const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    if (!cohortId) return [];
    try {
      const response = await api.get(`/api/leaderboard-ranking/${cohortId}`);
      return response.data.leaderboard || [];
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      return [];
    }
  };

  const {
    data: leaderboard = [],
    error: leaderboardError,
    isLoading: leaderboardLoading,
    refetch: refetchLeaderboard,
  } = useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", cohortId, forceRefresh],
    queryFn: fetchLeaderboard,
    enabled: !!cohortId && cohortHasStarted,
  });

  const {
    data: currentWeekData,
    isLoading: weekLoading,
    error: weekError,
    refetch: refetchCurrentWeek,
  } = useQuery<CurrentWeekData>({
    queryKey: ["currentWeek", userID, courseId, forceRefresh],
    queryFn: async () => {
      if (!userID || !courseId) return null;
      const response = await api.get(
        `/api/users/${userID}/courses/${courseId}/current-week`
      );
      return response.data.data;
    },
    enabled: !!userID && !!courseId && cohortHasStarted,
  });

  const {
    data: paymentStatus,
    error: paymentError,
    refetch: refetchPaymentStatus,
  } = useQuery({
    queryKey: ["paymentStatus", userID, courseId, forceRefresh],
    queryFn: async () => {
      if (!userID || !courseId) return null;
      const { data } = await api.get(`/api/payment-status`, {
        params: { userId: userID, courseId: courseId },
      });
      return data;
    },
    enabled: !!userID && !!courseId,
    staleTime: 1000 * 30, // 30 seconds
    retry: 2,
  });

  // Add manual refresh function for payment status
  const refreshPaymentStatus = async () => {
    try {
      await refetchUser();
      await refetchPaymentStatus();
      queryClient.invalidateQueries({ queryKey: ["paymentStatus"] });
      setForceRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error refreshing payment status:", error);
    }
  };

  // Check if user account is active - More robust version
  const canAccessContent =
    !user?.inactive && (user?.course_purchased?.length ?? 0) > 0;

  // Fetch module progress data with proper error handling
  const {
    data: moduleProgress = [],
    isLoading: progressLoading,
    error: progressError,
    refetch: refetchModuleProgress,
  } = useQuery<ModuleProgress[]>({
    queryKey: ["moduleProgress", userID, courseId, forceRefresh],
    queryFn: async () => {
      if (!userID || !courseId) return [];
      try {
        const response = await api.get(
          `/api/users/${userID}/courses/${courseId}/progress`
        );
        return Array.isArray(response.data?.data) ? response.data.data : [];
      } catch (error) {
        console.error("Error fetching progress:", error);
        return [];
      }
    },
    enabled:
      !!userID &&
      !!courseId &&
      !isNewUser &&
      canAccessContent &&
      cohortHasStarted,
  });

  // Safe certification progress calculation
  const calculateCertificationProgress = (): number => {
    if (!Array.isArray(moduleProgress) || moduleProgress.length === 0) return 0;

    try {
      const totalLessons = moduleProgress.reduce(
        (sum, module) => sum + (module.totalLessons || 0),
        0
      );
      const completedLessons = moduleProgress.reduce(
        (sum, module) => sum + (module.completedLessons || 0),
        0
      );

      return totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  const certificationProgress = calculateCertificationProgress();

  const initiatePayment = async (paymentPlan: string) => {
    try {
      // First try to get existing payment link
      const existingLink = await fetchExistingPaymentLink();

      if (existingLink) {
        // Use existing payment link
        window.location.href = existingLink;
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  // Fetch existing payment link
  const fetchExistingPaymentLink = async (): Promise<string | null> => {
    if (!userID || !courseId) return null;
    try {
      const { data } = await api.get(`/api/payment-link`, {
        params: { userId: userID, courseId: courseId },
      });

      return data.exists ? data.authorizationUrl : null;
    } catch (error) {
      console.error("Error fetching payment link:", error);
      return null;
    }
  };

  const getPaymentButton = () => {
    const handlePayment = async (frontendPlanType: string) => {
      try {
        // First try to get existing payment link
        const { data: linkData } = await api.get(`/api/payment-link`, {
          params: {
            userId: userID,
            courseId: courseId,
          },
        });

        if (linkData.exists && linkData.authorizationUrl) {
          window.location.href = linkData.authorizationUrl;
          return;
        }

        // If no existing link, try to create a new one with proper plan type
        const { data: newLinkData } = await api.get(`/api/payment-link`, {
          params: {
            userId: userID,
            courseId: courseId,
            planType: frontendPlanType,
          },
        });

        if (newLinkData.exists && newLinkData.authorizationUrl) {
          window.location.href = newLinkData.authorizationUrl;
        } else {
          // Fallback to the original initiatePayment method
          await initiatePayment(frontendPlanType);
        }
      } catch (error: any) {
        console.error("Payment link fetch failed:", error);

        // If it's a cohort error, fall back to original method
        if (
          error.response?.status === 400 &&
          error.response.data.error.includes("cohort")
        ) {
          await initiatePayment(frontendPlanType);
        } else {
          alert("Payment system error. Please try again or contact support.");
        }
      }
    };

    if (!paymentStatus) {
      return (
        <button
          onClick={() => handlePayment("FULL")}
          className="bg-purple-500 hover:bg-purple-600 text-white text-[12px] rounded-full px-5 py-2"
        >
          Complete Payment to Access Content
        </button>
      );
    }

    if (paymentStatus.paymentPlan === "FOUR_INSTALLMENTS") {
      const unpaidInstallment = paymentStatus.paymentInstallments?.find(
        (i: any) => !i.paid
      );

      if (unpaidInstallment) {
        return (
          <button
            onClick={() => handlePayment("INSTALLMENT")}
            className="bg-purple-500 hover:bg-purple-600 text-white text-[12px] rounded-full px-5 py-2"
          >
            Pay Installment (₦{unpaidInstallment.amount})
          </button>
        );
      }
    }

    if (paymentStatus.paymentPlan === "THREE_INSTALLMENTS") {
      const unpaidInstallment = paymentStatus.paymentInstallments?.find(
        (i: any) => !i.paid
      );

      if (unpaidInstallment) {
        return (
          <button
            onClick={() => handlePayment("THREE_INSTALLMENT")}
            className="bg-purple-500 hover:bg-purple-600 text-white text-[12px] rounded-full px-5 py-2"
          >
            Pay Installment (₦{unpaidInstallment.amount})
          </button>
        );
      }
    }

    if (
      paymentStatus.paymentPlan === "FIRST_HALF_COMPLETE" &&
      paymentStatus.status === "BALANCE_HALF_PAYMENT"
    ) {
      return (
        <button
          onClick={() => handlePayment("HALF")}
          className="bg-purple-500 hover:bg-purple-600 text-white text-[12px] rounded-full px-5 py-2"
        >
          Pay Remaining Balance (₦{TOTAL_COURSE_FEE / 2})
        </button>
      );
    }

    // Default payment button
    return (
      <button
        onClick={() => handlePayment("FULL")}
        className="bg-purple-500 hover:bg-purple-600 text-white text-[12px] rounded-full px-5 py-2"
      >
        Complete Payment to Access Content
      </button>
    );
  };

  const getRankBgStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-800";
      default:
        return "bg-gray-100";
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseIndex(parseInt(e.target.value));
  };

  const downloadBrochure = () => {
    if (brochureData?.brochureUrl) {
      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = brochureData.brochureUrl;
      link.download = `Onboarding_Brochure_${brochureData.cohortName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Onboarding/Welcome Screen Component
  const OnboardingScreen = () => (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to{" "}
          {brochureData?.courseTitle || selectedCourse?.title || "Your Course"}!
        </h1>
        <p className="text-gray-600">
          Your cohort "{cohortData?.name}" starts on{" "}
          {cohortData?.startDate
            ? new Date(cohortData.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            : "soon"}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Image
            src={`/courses/${selectedCourse?.title}.png`}
            alt="Info"
            width={20}
            height={20}
            className="w-5 h-5 mt-1 text-blue-600"
          />
          <div>
            <h3 className="text-blue-700 font-bold mb-2">
              Getting Ready for Your Journey
            </h3>
            <p className="text-blue-600 text-sm mb-3">
              While you wait for your cohort to begin, here's what you can do to
              prepare:
            </p>
            <ul className="text-blue-600 text-sm list-disc list-inside space-y-1">
              <li>Download your onboarding brochure</li>
              <li>Set up your learning environment</li>
              <li>Join our community channels</li>
              <li>Review any pre-course materials</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brochure Download Section */}
      {brochureData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Image
              src="/svg/document.svg"
              alt="Document"
              width={20}
              height={20}
              className="w-5 h-5 mt-1"
            />
            <div>
              <h3 className="text-green-700 font-bold mb-2">
                Onboarding Brochure
              </h3>
              <p className="text-green-600 text-sm mb-3">
                Download your comprehensive onboarding guide to get started with
                your learning journey. This brochure contains important
                information about your course schedule, expectations, and
                resources.
              </p>
              <button
                onClick={downloadBrochure}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Download Onboarding Brochure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Display */}
      {countdown && !cohortHasStarted && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <h4 className="text-purple-700 font-bold mb-2">Cohort Starts In:</h4>
          <div className="text-2xl font-mono text-purple-800 bg-purple-100 p-3 rounded-lg">
            {countdown}
          </div>
          <p className="text-purple-600 text-sm mt-2">
            We're excited to have you join us! The countdown is on...
          </p>
        </div>
      )}

      {/* Support Contact */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <h4 className="text-gray-700 font-bold mb-2">Need Help?</h4>
        <p className="text-gray-600 text-sm">
          If you have any questions or need assistance, please contact our
          support team at{" "}
          <a
            href="mailto:eneze@10alytics.org"
            className="text-blue-600 hover:underline"
          >
            eneze@10alytics.org
          </a>
        </p>
      </div>
    </div>
  );

  if (!user || authLoading || cohortLoading) {
    return <Loader />;
  }

  // Show onboarding screen if cohort hasn't started yet and user is enrolled
  if (showWelcome && !cohortHasStarted && !isNewUser) {
    return (
      <main className="bg-[#F4F4F4] min-h-screen w-full px-3 md:px-4 lg:px-6 py-4">
        <OnboardingScreen />
      </main>
    );
  }

  // Show course enrollment prompt if user has no courses
  if (isNewUser) {
    return (
      <main className="bg-[#F4F4F4] min-h-screen w-full px-3 md:px-4 lg:px-6 py-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto mt-8 text-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Your Learning Dashboard!
            </h1>
            <p className="text-gray-600 mb-6">
              It looks like you haven't enrolled in any courses yet. Browse our
              catalog and start your learning journey today.
            </p>
            <Image
              src="/img/empty3.png"
              alt="No courses"
              width={256}
              height={256}
              className="w-64 h-64 mx-auto mb-6"
            />
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/dashboard/catalog")}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Browse Courses
            </button>

            <div className="text-sm text-gray-500">
              <p>Need help choosing a course?</p>
              <p>
                Contact our advisors at{" "}
                <a
                  href="mailto:eneze@10alytics.org"
                  className="text-blue-600 hover:underline"
                >
                  eneze@10alytics.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F4F4F4] h-full min-h-screen w-full px-3 md:px-4 lg:px-6 py-4">
      <section className="flex h-full">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row flex-wrap gap-3">
            <div className="w-full lg:w-[70%] order-1 lg:order-1">
              {/* Welcome Card with Countdown */}
              <div className="bg-white border border-[#EDEDED] rounded-[10px] text-[#828282] text-xs sm:text-[10px] mb-4 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <span className="mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/svg/calendar4.svg"
                      alt="Calendar"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span className="text-[10px]">
                      <FormattedDate />
                    </span>
                  </div>
                  <h2 className="text-[#333333] text-lg sm:text-[20px] font-bold mt-1">
                    Welcome Back {formatName(user?.name)}
                  </h2>
                  <span className="text-xs">
                    Ensure you hit your daily and weekly learning goals. We are
                    rooting for you
                  </span>

                  {/* Countdown Display */}
                  {countdown && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-md">
                      {!cohortHasStarted && (
                        <p className="text-blue-700 text-sm font-semibold">
                          <>⏳ Cohort starts in: {countdown}</>
                        </p>
                      )}
                    </div>
                  )}
                </span>
                <div className="flex gap-2">
                  <Link
                    href="/dashboard/classroom"
                    className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer whitespace-nowrap"
                  >
                    Classroom
                  </Link>
                  {user?.role === "COURSE_ADMIN" && (
                    <Link
                      href="/dashboard/course-admin"
                      className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer whitespace-nowrap"
                    >
                      Track Your Students
                    </Link>
                  )}
                </div>
              </div>

              {/* Course Selection Dropdown */}
              {hasMultipleCourses && (
                <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
                  <label
                    htmlFor="course-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Course:
                  </label>
                  <select
                    id="course-select"
                    onChange={handleCourseChange}
                    value={selectedCourseIndex}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    {courses.map((course, index) => (
                      <option key={index} value={index}>
                        {course.course?.title || `Course ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Payment Status Banner */}
              {!canAccessContent && !isNewUser && (
                <div className="bg-purple-50 border border-purple-200 rounded-[10px] p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/svg/warning.svg"
                      alt="Warning"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div>
                      <h3 className="text-purple-700 font-bold mb-2">
                        Account Inactive - Payment Overdue
                      </h3>
                      <p className="text-purple-600 text-sm mb-3">
                        Please check your email for payment instructions and
                        complete your payment to restore access.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {getPaymentButton()}
                        <button
                          onClick={refreshPaymentStatus}
                          className="bg-gray-500 hover:bg-gray-600 text-white text-[12px] rounded-full px-4 py-2"
                        >
                          Refresh Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center mb-8 md:mb-12">
                <QuickInfoCard
                  title="Enrolled Course"
                  number={courses.length || 0}
                  color="#2684FF1A"
                  icon="/svg/list.svg"
                />
                <QuickInfoCard
                  title="Completed Lessons"
                  number={user?.completed_videos?.length || 0}
                  color="#71FF651A"
                  icon="/svg/checked.svg"
                />
                <QuickInfoCard
                  title="Certification"
                  number={certificationProgress}
                  color="#7C3AED0F"
                  icon="/svg/badge2.svg"
                />
              </div>

              {/* Ongoing Courses & Current Event */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <BorderedCard
                  heading="Ongoing Courses"
                  label={
                    canAccessContent ? (
                      <Link
                        href={`/dashboard/lessons/${selectedCourse?.id}`}
                        className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer whitespace-nowrap"
                      >
                        Continue Watching
                      </Link>
                    ) : null
                  }
                >
                  {!canAccessContent ? (
                    <div className="text-center py-4">
                      <Image
                        src="/svg/lock.svg"
                        alt="Locked"
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-purple-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Complete your payment to unlock course content
                      </p>
                      {getPaymentButton()}
                    </div>
                  ) : (
                    selectedCourse && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                        <Image
                          src={selectedCourse.imageUrl}
                          alt={selectedCourse.title}
                          width={90}
                          height={60}
                          className="w-full sm:w-[90px] max-w-[120px] h-auto sm:h-[60px] object-cover rounded-[3px]"
                        />
                        <div className="w-full flex flex-col gap-1 mt-2 sm:mt-0">
                          <span className="text-[#333333] text-[12px] font-bold">
                            <Link
                              href={`/dashboard/lessons/${selectedCourse.id}`}
                            >
                              {selectedCourse.title || "No course title"}
                            </Link>
                          </span>
                          <p className="text-[#828282] text-[9px]">
                            {selectedCourse.description?.slice(0, 100) +
                              "..." || "No course description"}
                          </p>
                          <ProgressBar progress={certificationProgress} />
                          <div className="flex items-center gap-2 text-[10px] mt-1">
                            <Image
                              src="/svg/hourglass.svg"
                              alt="Hourglass"
                              width={12}
                              height={12}
                              className="w-3 h-3"
                            />
                            <div className="">
                              <span className="text-[#828282]">Countdown:</span>
                              <span className="text-primary font-semibold">
                                {" "}
                                {countdown || "Calculating..."}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </BorderedCard>

                <BorderedCard
                  heading="Current Event"
                  label={
                    <div className="bg-[#2684FF2B] flex justify-center items-center text-[#2684FF] text-[9px] px-4 h-6 rounded-full whitespace-nowrap">
                      Current Event
                    </div>
                  }
                >
                  {!canAccessContent ? (
                    <div className="text-center py-4">
                      <Image
                        src="/svg/lock.svg"
                        alt="Locked"
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-purple-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Complete your payment to unlock course content
                      </p>
                    </div>
                  ) : weekLoading ? (
                    <Loader />
                  ) : currentWeekData ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <Image
                        src={user?.image || "/img/dp1.png"}
                        alt="User"
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                      <span className="text-xs text-gray-500 text-center px-2">
                        Week {currentWeekData.currentWeekNumber} of{" "}
                        {currentWeekData.totalWeeks}:{" "}
                        {currentWeekData.currentWeek.title}
                      </span>
                    </div>
                  ) : (
                    <EmptyState
                      img="/svg/empty2.svg"
                      text="No upcoming events scheduled for this week"
                      cta={null}
                    />
                  )}
                </BorderedCard>
              </div>

              {/* Learning Path */}
              <div className="mt-8">
                <h1 className="text-lg sm:text-[20px] font-bold mb-4">
                  My Learning Path
                </h1>
                {!canAccessContent ? (
                  <div className="bg-white p-4 rounded-[10px] text-center">
                    <Image
                      src="/svg/lock.svg"
                      alt="Locked"
                      width={64}
                      height={64}
                      className="w-16 h-16 mx-auto mb-3"
                    />
                    <h3 className="text-purple-600 font-bold mb-2">
                      Content Locked
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Complete your payment to unlock your learning path
                    </p>
                    {getPaymentButton()}
                    <p className="text-xs text-gray-500 mt-2">
                      You will be redirected to your existing payment link if
                      one exists
                    </p>
                  </div>
                ) : progressLoading ? (
                  <div className="flex justify-center p-4">
                    <Loader />
                  </div>
                ) : progressError ? (
                  <div className="bg-white p-4 rounded-[10px] text-purple-500 text-sm">
                    Error loading learning progress
                  </div>
                ) : (
                  <div className="relative overflow-x-auto text-[#333333] rounded-[10px]">
                    <table className="bg-white w-full text-left rtl:text-right text-[12px] rounded-[10px]">
                      <thead className="font-light border-b">
                        <tr>
                          <th scope="col" className="px-3 md:px-6 py-3">
                            Current Module
                          </th>
                          <th scope="col" className="px-2 md:px-6 py-3">
                            Lessons
                          </th>
                          <th scope="col" className="px-2 md:px-6 py-3">
                            Status
                          </th>
                          <th
                            scope="col"
                            className="hidden sm:table-cell px-2 md:px-6 py-3"
                          >
                            Level
                          </th>
                          <th
                            scope="col"
                            className="hidden md:table-cell px-2 md:px-6 py-3"
                          >
                            Trainer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {moduleProgress?.map((module) => (
                          <TableRow
                            key={module.id}
                            img={module.imageUrl || "/img/home-img1.png"}
                            title={module.title}
                            lesson={`${module.completedLessons}/${module.totalLessons}`}
                            status={module.status}
                            level={module.level}
                            trainer="/img/dp1.png"
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - 30% on large screens */}
            <div className="w-full lg:w-[28%] order-2 lg:order-2 mt-6 lg:mt-0">
              <div className="flex flex-col gap-5">
                {/* Leader Board */}
                <Card heading="Leader Board">
                  {leaderboardLoading ? (
                    <div className="flex justify-center p-2">
                      <Loader />
                    </div>
                  ) : leaderboardError ? (
                    <div className="text-purple-500 p-2 text-xs text-center">
                      Failed to load leaderboard
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <EmptyState
                      img="/img/empty4.png"
                      text="You currently don't have a leader board record. Enroll in a course to activate"
                      cta={<EnrollBtn />}
                    />
                  ) : (
                    <div className="bg-white p-2 rounded-md">
                      <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                        {leaderboard.map((entry) => {
                          const totalParticipants = leaderboard.length;
                          const progressPercent = Math.max(
                            15,
                            ((totalParticipants - entry.rank + 1) /
                              totalParticipants) *
                            100
                          );

                          return (
                            <div
                              key={entry.userId}
                              className={`py-2 ${entry.rank < leaderboard.length
                                ? "border-b border-gray-100"
                                : ""
                                }`}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div
                                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${entry.rank <= 3
                                    ? "text-white " +
                                    getRankBgStyle(entry.rank)
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                  {entry.rank}
                                </div>
                                <Image
                                  src={entry.user?.image || "/img/profile.png"}
                                  alt={entry.user?.name || "User"}
                                  width={28}
                                  height={28}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                                <span className="font-medium text-xs">
                                  {formatName(entry.user?.name) || "Anonymous"}
                                </span>
                              </div>
                              <div className="pl-8 pr-2">
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Upcoming Project/Assessment */}
                <Card heading="Upcoming Project/Assessment">
                  {!canAccessContent ? (
                    <div className="text-center py-4">
                      <Image
                        src="/svg/lock.svg"
                        alt="Locked"
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-purple-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Complete your payment to unlock projects
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-[12px] text-[#828282] font-bold">
                        Upcoming project title
                      </h2>
                      <div className="flex flex-col gap-3 text-[#828282] text-[13px]">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/svg/calendar3.svg"
                            alt="Calendar"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          <span>
                            <span>Submission Timeline:</span>
                            <span className="font-bold">Jun 13 - July 14</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image
                            src="/svg/users2.svg"
                            alt="Users"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          <span>Team Members</span>
                          <Image
                            src="/img/people2.png"
                            alt="People"
                            width={80}
                            height={20}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Image
                            src="/svg/hourglass.svg"
                            alt="Hourglass"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          <span>Proficiency</span>
                          <ProgressBar progress={certificationProgress} />
                        </div>
                      </div>
                    </>
                  )}
                </Card>

                {/* This Week's Goals */}
                <Card heading="This Week's Goals">
                  {!canAccessContent ? (
                    <div className="text-center py-4">
                      <Image
                        src="/svg/lock.svg"
                        alt="Locked"
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-purple-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Complete your payment to unlock goals
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 text-[#828282] text-[12px]">
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-primary text-lg" />
                        <span className="strike-through">
                          Complete this week's module
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                        <span>Submit your Quiz</span>
                        <div className="border-[0.4px] border-[#A78BFA] rounded-[2px] text-[#A78BFA] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-primary text-lg" />
                        <span className="strike-through">
                          Meet your daily streak of 4 daily videos
                        </span>
                        <div className="border-[0.4px] border-[#A78BFA] rounded-[2px] text-[#A78BFA] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                        <span>Solve your project</span>
                        <div className="border-[0.4px] border-[#A78BFA] rounded-[2px] text-[#A78BFA] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                        <span>Join live session</span>
                        <div className="border-[0.4px] border-[#A78BFA] rounded-[2px] text-[#A78BFA] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Certification */}
                <Card heading="Certification">
                  {!canAccessContent ? (
                    <div className="text-center py-4">
                      <Image
                        src="/svg/lock.svg"
                        alt="Locked"
                        width={48}
                        height={48}
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-purple-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Complete your payment to view certification progress
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Image
                        src="/svg/certificate4.svg"
                        alt="Certificate"
                        width={200}
                        height={150}
                        className="max-w-full"
                      />
                      <span className="text-[#6D6D6D] text-[13px] text-center font-bold mt-2">
                        You're {100 - certificationProgress}% away from being
                        certified.
                      </span>
                    </div>
                  )}
                </Card>

                {/* Chat with a Training Advisor */}
                <Card heading="Chat with a Training Advisor">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
                    <div className="grid grid-cols-3 gap-3 flex-[0.8]">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="bg-white flex justify-center items-center w-full rounded-[4px] p-2"
                        >
                          <div className="bg-[#F3E8FF] flex justify-center items-center h-[27px] w-[27px] rounded-[3px]">
                            <Image
                              src="/svg/chat3.svg"
                              alt="Chat"
                              width={16}
                              height={16}
                              className="h-4"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Image
                      src="/svg/calendar6.svg"
                      alt="Calendar"
                      width={60}
                      height={48}
                      className="flex-[0.2] max-h-12 self-center"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;