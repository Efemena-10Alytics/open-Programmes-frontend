import { useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import api from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import TextInput from "../components/utilities/TextInput";
import SelectInput from "../components/utilities/SelectInput";
import useCourses from "../hooks/api/useCourses";
import useCohorts from "../hooks/api/useCohorts";

interface ChangeRequestFormProps {
  type: "COURSE_CHANGE" | "DEFERMENT";
  currentItemId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const ChangeRequestForm = ({
  type,
  currentItemId,
  onSuccess,
  onCancel,
}: ChangeRequestFormProps) => {
  const { user } = useAuth();
  const { courses: allCourses, isLoading: coursesLoading } = useCourses();
  const { cohorts: allCohorts, isLoading: cohortsLoading } = useCohorts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [availableItems, setAvailableItems] = useState<any[]>([]);

  useEffect(() => {
    if (type === "COURSE_CHANGE") {
      // Filter available courses (all courses except the current one)
      setAvailableItems(allCourses?.filter((course) => course.id !== currentItemId) || []);
    } else {
      // For deferment, only show cohorts within the next 2 months for the same course
      const currentCohort = allCohorts?.find(c => c.id === currentItemId);
      if (currentCohort) {
        const currentCourseId = currentCohort.courseId;
        const twoMonthsFromNow = new Date();
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
        
        const availableCohorts = allCohorts?.filter((cohort) => 
          cohort.id !== currentItemId && 
          cohort.courseId === currentCourseId &&
          new Date(cohort.startDate) <= twoMonthsFromNow
        ) || [];
        
        setAvailableItems(availableCohorts);
      }
    }
  }, [type, currentItemId, allCourses, allCohorts]);

  const initialValues = {
    desiredItemId: "",
    reason: "",
  };

  const validationSchema = Yup.object({
    desiredItemId: Yup.string().required(`Please select a ${type === "COURSE_CHANGE" ? "course" : "cohort"}`),
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
        type,
        reason: values.reason,
        ...(type === "COURSE_CHANGE" 
          ? { currentCourseId: currentItemId, desiredCourseId: values.desiredItemId }
          : { currentCohortId: currentItemId, desiredCohortId: values.desiredItemId }
        )
      };

      const response = await api.post("/api/change-request", payload);

      if (response.data.status === "success") {
        setStatus({ type: "success", message: response.data.message });
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (error: any) {
      console.error("Error submitting request:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemName = (item: any) => {
    if (type === "COURSE_CHANGE") {
      return item.title;
    } else {
      return `${item.name} (${new Date(item.startDate).toLocaleDateString()})`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Request {type === "COURSE_CHANGE" ? "Course Change" : "Deferment"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label className="pb-1 text-[#6D6D6D] text-[12px] font-semibold">
                Select New {type === "COURSE_CHANGE" ? "Course" : "Cohort"}
              </label>
              {(type === "COURSE_CHANGE" ? coursesLoading : cohortsLoading) ? (
                <div className="text-gray-500">Loading...</div>
              ) : availableItems.length > 0 ? (
                <>
                  <Field
                    as="select"
                    name="desiredItemId"
                    className="bg-[#F7F7F7] border-2 border-[#0000001A] rounded-[10px] w-full text-[#6D6D6D] px-5 py-3 text-[13px]"
                  >
                    <option value="">Choose a {type === "COURSE_CHANGE" ? "course" : "cohort"}</option>
                    {availableItems.map((item) => (
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
                  {type === "DEFERMENT" && (
                    <p className="text-xs text-gray-500 mt-1">
                      You can only defer to cohorts within the next 2 months.
                    </p>
                  )}
                </>
              ) : (
                <div className="text-gray-500">
                  No {type === "COURSE_CHANGE" ? "courses" : "cohorts"} available to switch to.
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="reason" className="pb-1 text-[#6D6D6D] text-[12px] font-semibold">
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
                <div className="text-red-500 text-xs mt-1">
                  {errors.reason}
                </div>
              )}
            </div>

            {status && (
              <div
                className={`p-3 rounded ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || availableItems.length === 0}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeRequestForm;