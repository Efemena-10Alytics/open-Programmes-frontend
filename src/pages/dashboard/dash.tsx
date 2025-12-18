import { useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import Link from "next/link";
import BorderedCard from "../../components/dashboard/BorderedCard";
import EmptyState from "../../components/dashboard/EmptyState";
import QuickInfoCard from "../../components/dashboard/QuickInfoCard";
import TableRow from "../../components/dashboard/TableRow";
import CourseCard2 from "../../components/utilities/CourseCard2";
import ProgressBar from "../../components/utilities/ProgressBar";
import { ProtectedRoute } from "../../components/utilities/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";

import Card from "../../components/dashboard/Cards";
import FormattedDate from "../../components/dashboard/FormattedDate";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import Loader from "../../components/utilities/Loader";
import { formatName } from "../../utils/formatName";

const TOTAL_COURSE_FEE =
  Number(import.meta.env.VITE_TOTAL_COURSE_FEE) || 250000;

const EnrollBtn = () => {
  return (
    <Link
      href={"/dashboard/catalog"}
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

const Dashboard = () => {
  const { user, userID, isLoading: authLoading } = useAuth();
  const [newUser, setNewUser] = useState(true);

  // Derived values
  const courseId = user?.cohorts?.[0]?.cohortId;
  const isNewUser = !user?.course_purchased?.length;
  const lastCourseId = user?.course_purchased?.[0]?.courseId;

  const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    if (!courseId) return [];
    try {
      const response = await api.get(`/api/leaderboard-ranking/${courseId}`);
      return response.data.leaderboard || [];
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      return [];
    }
  };

  const {
    data: leaderboard = [],
    error,
    isLoading,
  } = useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", courseId],
    queryFn: fetchLeaderboard,
    enabled: !!courseId,
  });

  const { data: currentWeekData, isLoading: weekLoading } =
    useQuery<CurrentWeekData>({
      queryKey: ["currentWeek", userID, lastCourseId],
      queryFn: async () => {
        if (!userID || !user?.course_purchased?.length) return null;
        const response = await api.get(
          `/api/users/${userID}/courses/${lastCourseId}/current-week`
        );
        return response.data.data;
      },
      enabled: !!userID && !!user?.course_purchased?.length,
    });

  const { data: paymentStatus } = useQuery({
    queryKey: ["paymentStatus", userID, lastCourseId],
    queryFn: async () => {
      if (!userID || !lastCourseId) return null;
      const { data } = await api.get(`/payment-status`, {
        params: { userId: userID, courseId: lastCourseId },
      });
      return data;
    },
    enabled: !!userID && !!lastCourseId,
  });

  const initiatePayment = async (paymentPlan: string) => {
    try {
      const response = await api.post("/initiate-payment", {
        userId: userID,
        courseId: lastCourseId,
        planType: paymentPlan,
      });
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const getPaymentButton = () => {
    if (!paymentStatus) return null;

    if (paymentStatus.paymentPlan === "FOUR_INSTALLMENTS") {
      const unpaidInstallment = paymentStatus.paymentInstallments?.find(
        (i: any) => !i.paid && new Date(i.dueDate) < new Date()
      );

      if (unpaidInstallment) {
        return (
          <button
            onClick={() => initiatePayment("INSTALLMENT")}
            className="bg-red-500 hover:bg-red-600 text-white text-[12px] rounded-full px-5 py-2"
          >
            Pay Overdue Installment ({unpaidInstallment.amount})
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
          onClick={() => initiatePayment("HALF")}
          className="bg-red-500 hover:bg-red-600 text-white text-[12px] rounded-full px-5 py-2"
        >
          Pay Remaining Balance ({TOTAL_COURSE_FEE / 2})
        </button>
      );
    }

    return null;
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

  if (!user || authLoading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#F4F4F4] h-full min-h-screen w-full px-3 md:px-4 lg:px-6 py-4">
      <section className="flex h-full">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row flex-wrap gap-3">
            <div className="w-full lg:w-[70%] order-1 lg:order-1">
              {/* Welcome Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[10px] text-[#828282] text-xs sm:text-[10px] mb-4 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <span className="mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <img src="svg/calendar4.svg" alt="" className="w-4 h-4" />
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
                </span>
                {user?.role === "COURSE_ADMIN" &&
                  user.course_purchased.length > 0 && (
                    <Link
                      href={`/dashboard/course-admin`}
                      className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer whitespace-nowrap"
                    >
                      Track Your Students
                    </Link>
                  )}
              </div>

              {/* Payment Overdue Banner */}
              {user?.inactive && (
                <div className="bg-red-50 border border-red-200 rounded-[10px] p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <img
                      src="svg/warning.svg"
                      alt="Warning"
                      className="w-5 h-5 mt-1"
                    />
                    <div>
                      <h3 className="text-red-700 font-bold mb-2">
                        Account Inactive - Payment Overdue
                      </h3>
                      <p className="text-red-600 text-sm mb-3">
                        Please check your email for payment instructions and
                        complete your payment to restore access.
                      </p>
                      {getPaymentButton()}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center mb-8 md:mb-12">
                <QuickInfoCard
                  title="Enrolled Course"
                  number={user?.course_purchased?.length || 0}
                  color="#2684FF1A"
                  icon="svg/list.svg"
                />
                <QuickInfoCard
                  title="Completed Lessons"
                  number={user?.completed_videos?.length || 0}
                  color="#71FF651A"
                  icon="svg/checked.svg"
                />
                <QuickInfoCard
                  title="Certification"
                  number={0}
                  color="#CA24210F"
                  icon="svg/badge2.svg"
                />
              </div>

              {/* Ongoing Courses & Current Event */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <BorderedCard
                  heading="Ongoing Courses"
                  label={
                    !user?.inactive ? (
                      <Link
                        href={`/dashboard/lessons/${user?.course_purchased?.[0]?.course?.id}`}
                        className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer whitespace-nowrap"
                      >
                        Continue Watching
                      </Link>
                    ) : null
                  }
                >
                  {isNewUser ? (
                    <EmptyState
                      img="svg/empty1.svg"
                      text="You currently don't have an ongoing course, Enroll in a course"
                      cta={<EnrollBtn />}
                    />
                  ) : user?.inactive ? (
                    <div className="text-center py-4">
                      <img
                        src="svg/lock.svg"
                        alt="Locked"
                        className="w-12 h-12 mx-auto mb-3"
                      />
                      <h3 className="text-red-600 font-bold mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Complete your payment to unlock course content
                      </p>
                      {getPaymentButton()}
                    </div>
                  ) : (
                    <>
                      {user?.course_purchased?.map((course, i) => {
                        return (
                          <div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4"
                            key={i}
                          >
                            <img
                              src={course.course.imageUrl}
                              alt=""
                              className="w-full sm:w-[90px] max-w-[120px] h-auto sm:h-[60px] object-cover rounded-[3px]"
                            />
                            <div className="w-full flex flex-col gap-1 mt-2 sm:mt-0">
                              <span className="text-[#333333] text-[12px] font-bold">
                                <Link
                                  href={`/dashboard/lessons/${course.course.id}`}
                                >
                                  {course.course.title || "No course title"}
                                </Link>
                              </span>
                              <p className="text-[#828282] text-[9px]">
                                {course.course.description?.slice(0, 100) +
                                  "..." || "No course description"}
                              </p>
                              <ProgressBar />
                              <div className="flex items-center gap-2 text-[10px] mt-1">
                                <img
                                  src="svg/hourglass.svg"
                                  alt=""
                                  className="w-3 h-3"
                                />
                                <div className="">
                                  <span className="text-[#828282]">
                                    Countdown:
                                  </span>
                                  <span className="text-primary font-semibold">
                                    {" "}
                                    90 more days
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
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
                  {isNewUser ? (
                    <EmptyState
                      img="svg/empty2.svg"
                      text="You currently don't have an upcoming event, Enroll in a course"
                      cta={<EnrollBtn />}
                    />
                  ) : weekLoading ? (
                    <Loader />
                  ) : currentWeekData ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <img
                        src={user?.image || "/img/dp1.png"}
                        alt=""
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
                      img="svg/empty2.svg"
                      text="No upcoming events scheduled for this week"
                      cta={null}
                    />
                  )}
                </BorderedCard>
              </div>

              {/* Course Cards for New Users */}
              {isNewUser && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-6">
                  <CourseCard2
                    name="Data Analytics"
                    description="Master data fundamentals applicable to any industry and learn to make
                           data-driven decisions."
                    img={"img/home-img1.png"}
                    price={"250,000.00"}
                    link={""}
                    skills={[
                      "svg/logos/chatgpt.svg",
                      "svg/logos/excel.svg",
                      "svg/logos/power-bi.svg",
                      "svg/logos/tableau.svg",
                      "svg/logos/looker.svg",
                    ]}
                  />
                  <CourseCard2
                    name="Data Science"
                    description="Go from a newbie to a fully fledged Data Scientist using data to answer
                          critical business questions."
                    img={"img/home-img2.png"}
                    price={"250,000.00"}
                    link={""}
                    skills={[
                      "svg/logos/chatgpt.svg",
                      "svg/logos/excel.svg",
                      "svg/logos/python.svg",
                      "svg/logos/tableau.svg",
                      "svg/logos/sql.svg",
                    ]}
                  />
                  <CourseCard2
                    name="Business Analytics"
                    description="This program equips you with the skills to analyze and map out
                          business processes, identify inefficiencies."
                    img={"img/home-img3.png"}
                    price={"250,000.00"}
                    link={""}
                    skills={[
                      "svg/logos/chatgpt.svg",
                      "svg/logos/excel.svg",
                      "svg/logos/power-bi.svg",
                      "svg/logos/jira.svg",
                      "svg/logos/draw-io.svg",
                    ]}
                  />
                </div>
              )}

              {/* Learning Path */}
              <div className="mt-8">
                <h1 className="text-lg sm:text-[20px] font-bold mb-4">
                  My Learning Path
                </h1>
                {isNewUser ? (
                  <div className="bg-white p-2 rounded-[10px]">
                    <div className="bg-[#F7F8FA] border-[0.7px] border-[#ECECEC] rounded-[10px] p-3">
                      <EmptyState
                        img="svg/empty2.svg"
                        text="You currently don't have an upcoming event, Enroll in a course"
                        cta={<EnrollBtn />}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-x-auto text-[#333333] rounded-[10px]">
                    <table
                      className="bg-white w-full text-left rtl:text-right text-[12px] 
                                 rounded-[10px]"
                    >
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

                      <tbody className="">
                        <TableRow
                          img={"img/home-img1.png"}
                          title="Module 1: Introduction to Data Analytics"
                          lesson="4"
                          status="Ongoing"
                          level="Advanced"
                          trainer={"img/dp1.png"}
                        />
                        <TableRow
                          img={"img/home-img1.png"}
                          title="Module 1: Introduction to Data Analytics"
                          lesson="2"
                          status="Completed"
                          level="Beginner"
                          trainer={"img/dp1.png"}
                        />
                        <TableRow
                          img={"img/home-img1.png"}
                          title="Module 1: Introduction to Data Analytics"
                          lesson="1/4"
                          status="Next Lesson"
                          level="Expert"
                          trainer={"img/dp1.png"}
                        />
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
                  {isLoading ? (
                    <div className="flex justify-center p-2">
                      <Loader />
                    </div>
                  ) : error ? (
                    <div className="text-red-500 p-2 text-xs text-center">
                      Failed to load leaderboard
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <EmptyState
                      img="img/empty4.png"
                      text="You currently don't have a leader board record. Enroll in a course to activate"
                      cta={<EnrollBtn />}
                    />
                  ) : (
                    <div className="bg-white p-2 rounded-md">
                      <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                        {leaderboard.map((entry, index) => {
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
                              className={`py-2 ${
                                index !== leaderboard.length - 1
                                  ? "border-b border-gray-100"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div
                                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                                    entry.rank <= 3
                                      ? "text-white " +
                                        getRankBgStyle(entry.rank)
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {entry.rank}
                                </div>
                                <img
                                  src={entry.user?.image || "img/profile.png"}
                                  alt={entry.user?.name}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                                <span className="font-medium text-xs">
                                  {entry.user?.name || "Anonymous"}
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
                  {isNewUser ? (
                    <EmptyState
                      img="img/empty4.png"
                      text="You currently don't have any upcoming project Enroll in a course to activate"
                      cta={<EnrollBtn />}
                    />
                  ) : (
                    <>
                      <h2 className="text-[12px] text-[#828282] font-bold">
                        Upcoming project title
                      </h2>
                      <div className="flex flex-col gap-3 text-[#828282] text-[13px]">
                        <div className="flex items-center gap-2">
                          <img
                            src="svg/calendar3.svg"
                            alt=""
                            className="w-4 h-4"
                          />
                          <span>
                            <span>Submission Timeline:</span>
                            <span className="font-bold">Jun 13 - July 14</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="svg/users2.svg"
                            alt=""
                            className="w-4 h-4"
                          />
                          <span>Team Members</span>
                          <img src="img/people2.png" alt="" />
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="svg/hourglass.svg"
                            alt=""
                            className="w-4 h-4"
                          />
                          <span>Proficiency</span>
                          <ProgressBar />
                        </div>
                      </div>
                    </>
                  )}
                </Card>

                {/* This Week's Goals */}
                <Card heading="This Week's Goals">
                  {isNewUser ? (
                    <EmptyState
                      img="img/empty4.png"
                      text="You currently don't have any set goals. Enroll in a course to activate"
                      cta={<EnrollBtn />}
                    />
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
                        <div className="border-[0.4px] border-[#FA5252] rounded-[2px] text-[#FA5252] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircle className="text-primary text-lg" />
                        <span className="strike-through">
                          Meet your daily streak of 4 daily videos
                        </span>
                        <div className="border-[0.4px] border-[#FA5252] rounded-[2px] text-[#FA5252] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                        <span>Solve your project</span>
                        <div className="border-[0.4px] border-[#FA5252] rounded-[2px] text-[#FA5252] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoIosCheckmarkCircleOutline className="text-lg" />
                        <span>Join live session</span>
                        <div className="border-[0.4px] border-[#FA5252] rounded-[2px] text-[#FA5252] text-[8px] p-1">
                          +1XP
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Certification */}
                <Card heading="Certification">
                  <div className="flex flex-col items-center">
                    <img
                      src="svg/certificate4.svg"
                      alt=""
                      className="max-w-full"
                    />
                    <span className="text-[#6D6D6D] text-[13px] text-center font-bold mt-2">
                      You're 40% away from being certified.
                    </span>
                  </div>
                </Card>

                {/* Chat with a Training Advisor */}
                <Card heading="Chat with a Training Advisor">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
                    <div className="grid grid-cols-3 gap-3 flex-[0.8]">
                      <div className="bg-white flex justify-center items-center w-full rounded-[4px] p-2">
                        <div className="bg-[#FFF0F0] flex justify-center items-center h-[27px] w-[27px] rounded-[3px]">
                          <img src="svg/chat3.svg" alt="" className="h-4" />
                        </div>
                      </div>
                      <div className="bg-white flex justify-center items-center w-full rounded-[4px] p-2">
                        <div className="bg-[#FFF0F0] flex justify-center items-center h-[27px] w-[27px] rounded-[3px]">
                          <img src="svg/chat3.svg" alt="" className="h-4" />
                        </div>
                      </div>
                      <div className="bg-white flex justify-center items-center w-full rounded-[4px] p-2">
                        <div className="bg-[#FFF0F0] flex justify-center items-center h-[27px] w-[27px] rounded-[3px]">
                          <img src="svg/chat3.svg" alt="" className="h-4" />
                        </div>
                      </div>
                    </div>
                    <img
                      src="svg/calendar6.svg"
                      alt=""
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

export default ProtectedRoute(Dashboard);
