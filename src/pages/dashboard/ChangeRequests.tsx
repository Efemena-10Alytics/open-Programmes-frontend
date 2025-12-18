"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import useCourses from "../../hooks/api/useCourses";
import useCohorts from "../../hooks/api/useCohorts";
import CourseModel from "../../models/Course";
import { CohortModel } from "../../models/Course";

const ChangeRequests = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { courses: allCourses, isLoading: coursesLoading } = useCourses();
  const { cohorts: futureCohorts, isLoading: cohortsLoading } = useCohorts();
  const [activeTab, setActiveTab] = useState<"COURSE_CHANGE" | "DEFERMENT">(
    "COURSE_CHANGE"
  );
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [currentCohortId, setCurrentCohortId] = useState<string | null>(null);
  const [availableCourses, setAvailableCourses] = useState<CourseModel[]>([]);
  const [availableCohorts, setAvailableCohorts] = useState<CohortModel[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (user && allCourses && futureCohorts) {
      console.log("User data:", user);
      console.log("All courses:", allCourses);
      console.log("Future cohorts:", futureCohorts);
      
      // Get user's current course ID (first purchased course)
      if (user.course_purchased && user.course_purchased.length > 0) {
        const courseId = user.course_purchased[0]?.courseId;
        setCurrentCourseId(courseId);
        console.log("Current course ID:", courseId);
        
        // Try to find user's current cohort ID for this course
        if (user.cohorts && user.cohorts.length > 0) {
          const userCohortForCourse = user.cohorts.find((userCohort: any) => 
            userCohort.cohort && userCohort.cohort.courseId === courseId
          );
          
          if (userCohortForCourse && userCohortForCourse.cohort) {
            setCurrentCohortId(userCohortForCourse.cohort.id);
            console.log("Current cohort ID:", userCohortForCourse.cohort.id);
          }
        }
      }

      // Get available courses (all courses except current one)
      const currentCourseIds = user.course_purchased?.map((purchase: any) => purchase.courseId) || [];
      const available = allCourses.filter(course => 
        !currentCourseIds.includes(course.id)
      );
      setAvailableCourses(available);
      console.log("Available courses:", available);

      // Get available cohorts (future cohorts for same course except current one)
      if (currentCourseId) {
        const availableCohortsList = futureCohorts.filter(cohort => 
          cohort.courseId === currentCourseId && 
          cohort.id !== (currentCohortId || "")
        );
        setAvailableCohorts(availableCohortsList);
        console.log("Available cohorts:", availableCohortsList);
      }
    }
  }, [user, allCourses, futureCohorts, currentCourseId]);

  const initialValues = {
    desiredItemId: "",
    reason: "",
  };

  const validationSchema = Yup.object({
    desiredItemId: Yup.string().required("Please select your desired item"),
    reason: Yup.string()
      .required("Reason is required")
      .min(10, "Reason must be at least 10 characters")
      .max(500, "Reason cannot exceed 500 characters"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = {
        type: activeTab,
        reason: values.reason,
        ...(activeTab === "COURSE_CHANGE"
          ? {
              currentCourseId: currentCourseId,
              desiredCourseId: values.desiredItemId,
            }
          : {
              currentCohortId: currentCohortId,
              desiredCohortId: values.desiredItemId,
            }),
      };

      console.log("Submitting payload:", payload);
      
      const response = await api.post("/api/change-request", payload);

      if (response.data.status === "success") {
        setStatus({ type: "success", message: response.data.message });
        // Reset form on success
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
      window.location.reload();
    } catch (error: any) {
      console.error("Error submitting request:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemName = (item: CourseModel | CohortModel) => {
    if (activeTab === "COURSE_CHANGE") {
      return (item as CourseModel).title;
    } else {
      const cohort = item as CohortModel;
      const startDate = new Date(cohort.startDate);
      return `${cohort.name} (${startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })})`;
    }
  };

  // Show loading state while data is being fetched
  if (coursesLoading || cohortsLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Change Requests</h1>
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Settings
          </button>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Change Requests</h1>
        <button
          onClick={() => router.push("/dashboard/settings")}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Settings
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "COURSE_CHANGE"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("COURSE_CHANGE")}
        >
          Course Change
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "DEFERMENT"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("DEFERMENT")}
        >
          Cohort Deferment
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values }) => (
          <Form className="space-y-6">
            {/* Desired Item Selection */}
            <div className="flex flex-col">
              <label className="pb-1 text-[#6D6D6D] text-[12px] font-semibold">
                Select Desired {activeTab === "COURSE_CHANGE" ? "Course" : "Cohort"}
              </label>
              
              {(activeTab === "COURSE_CHANGE" ? availableCourses : availableCohorts).length === 0 ? (
                <div className="text-gray-500 p-3 bg-gray-50 rounded-md">
                  {activeTab === "COURSE_CHANGE" 
                    ? "No other courses available to switch to." 
                    : "No other cohorts available to defer to."}
                </div>
              ) : (
                <>
                  <Field
                    as="select"
                    name="desiredItemId"
                    className="bg-[#F7F7F7] border-2 border-[#0000001A] rounded-[10px] w-full text-[#6D6D6D] px-5 py-3 text-[13px]"
                  >
                    <option value="">
                      Choose desired {activeTab === "COURSE_CHANGE" ? "course" : "cohort"}
                    </option>
                    {(activeTab === "COURSE_CHANGE"
                      ? availableCourses
                      : availableCohorts
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {getItemName(item)}
                      </option>
                    ))}
                  </Field>
                  {errors.desiredItemId && touched.desiredItemId && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.desiredItemId}
                    </div>
                  )}
                  {activeTab === "DEFERMENT" && (
                    <p className="text-xs text-gray-500 mt-1">
                      You can only defer to cohorts within the next 2 months for the same course.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Reason Input */}
            <div className="flex flex-col">
              <label
                htmlFor="reason"
                className="pb-1 text-[#6D6D6D] text-[12px] font-semibold"
              >
                Reason for Change
              </label>
              <Field
                as="textarea"
                id="reason"
                name="reason"
                rows={4}
                placeholder="Please explain why you want to make this change (minimum 10 characters)..."
                className="w-full border-2 border-[#0000001A] rounded-[10px] px-4 py-2 text-[13px] bg-[#F7F7F7]"
              />
              {errors.reason && touched.reason && (
                <div className="text-red-500 text-xs mt-1">{errors.reason}</div>
              )}
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-3 rounded ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/settings")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting || 
                  !values.desiredItemId || 
                  !values.reason ||
                  (activeTab === "COURSE_CHANGE" && !currentCourseId) ||
                  (activeTab === "DEFERMENT" && !currentCohortId)
                }
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Information Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">
          Important Information
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • Course changes and deferments are free within the first 2 weeks of
            cohort start
          </li>
          <li>• After 2 weeks, a ₦50,000 fee applies for approved requests</li>
          <li>
            • Deferment is only available to cohorts within the next 2 months
          </li>
          <li>
            • All requests require admin approval (except changes within first 2
            weeks)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChangeRequests;