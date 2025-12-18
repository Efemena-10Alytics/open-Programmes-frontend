// Updated RegistrationForm.tsx
import React, { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import api from "../lib/api";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  hearAbout: string[];
  otherSource: string;
  programType: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  programType: string; 
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
  programType,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    hearAbout: [],
    otherSource: "",
    programType: programType,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hearAboutOptions = [
    "Nebiant Analytics Instagram",
    "Nebiant Analytics Facebook",
    "LinkedIn",
    "Friend/Family/Colleague",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      hearAbout: prev.hearAbout.includes(option)
        ? prev.hearAbout.filter((item) => item !== option)
        : [...prev.hearAbout, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.gender || !formData.phoneNumber || formData.hearAbout.length === 0) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post("/api/program-leads", {
        ...formData,
        programType, 
      });

      // Store submission in localStorage
      const submittedEmails = JSON.parse(localStorage.getItem("submittedEmails") || "[]");
      submittedEmails.push(formData.email);
      localStorage.setItem("submittedEmails", JSON.stringify(submittedEmails));
      
      // Close modal
      onClose();
      
      // Redirect based on program type
      if (programType.includes("tech-elevator") && !programType.includes("tech-elevator-sales")) {
        window.location.href = "https://chat.whatsapp.com/JTuv7XAWtEe9vfntIMAMVO?mode=ac_t";
      } else if (programType.includes("tech-elevator-sales")) {
        window.location.href = "/tech-elevator-webinar";
      } else {
        window.location.href = "https://chat.whatsapp.com/JQwuHed8CZKB30NYFW7CfM?mode=ems_copy_c";
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit form. Please try again or contact support.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailAlreadySubmitted = () => {
    if (typeof window === "undefined") return false;
    const submittedEmails = JSON.parse(
      localStorage.getItem("submittedEmails") || "[]"
    );
    return submittedEmails.includes(formData.email);
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Registration Form
            </h2>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Already Submitted Warning */}
          {isEmailAlreadySubmitted() && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              This email has already been used for registration. Please use a
              different email if needed.
            </div>
          )}

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              >
                <option className="text-black" value="">
                  Select Gender
                </option>
                <option className="text-black" value="male">
                  Male
                </option>
                <option className="text-black" value="female">
                  Female
                </option>
                <option className="text-black" value="other">
                  Other
                </option>
                <option className="text-black" value="prefer-not-to-say">
                  Prefer not to say
                </option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about this Free Webinar? *
              </label>
              <div className="space-y-2">
                {hearAboutOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hearAbout.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      disabled={isSubmitting}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Other source input */}
            {formData.hearAbout.includes("Other") && (
              <div>
                <label
                  htmlFor="otherSource"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Please specify:
                </label>
                <input
                  type="text"
                  id="otherSource"
                  name="otherSource"
                  value={formData.otherSource}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                  placeholder="Please specify how you heard about us"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isEmailAlreadySubmitted()}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Registration"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;