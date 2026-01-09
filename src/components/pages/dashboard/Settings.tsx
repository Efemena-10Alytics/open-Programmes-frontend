"use client";

import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import PasswordCheck from "../../utilities/PasswordCheck";
import TextInput from "../../utilities/TextInput";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";
import { useCloudinaryUpload } from "../../../hooks/useCloudinaryUpload";
import { cloudinaryConfig } from "../../../config/cloudinary";
import useCourses from "../../../hooks/api/useCourses";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Settings = () => {
  const router = useRouter();
  const { user, login: authLogin } = useAuth();
  const { courses: allCourses, isLoading: coursesLoading } = useCourses();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Log cloudinary config to debug if environment variables are loaded
  console.log("Cloudinary Config:", {
    cloudName: cloudinaryConfig.cloudName,
    uploadPreset: cloudinaryConfig.uploadPreset,
  });

  const {
    uploadImage,
    isUploading,
    error: uploadError,
    progress: uploadProgress,
    cancelUpload,
  } = useCloudinaryUpload(
    cloudinaryConfig.uploadPreset,
    cloudinaryConfig.cloudName,
    {
      timeout: 60000, // 60 seconds timeout
      maxRetries: 2, // Retry failed uploads twice
      maxFileSizeMB: 15,
      compressBeforeUpload: true,
      onProgress: (progress) => {
        setUploadStatus(`Uploading: ${progress}%`);
      },
    }
  );

  // Set initial form values from user context
  const initialValues = {
    first_name: user?.name?.split(" ")[0] || "",
    last_name: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    password: "",
    re_password: "",
  };

  // Set profile image preview from user context
  useEffect(() => {
    if (user?.image) {
      setImagePreview(user.image);
    }
  }, [user]);

  // Show upload errors in UI
  useEffect(() => {
    if (uploadError) {
      setUploadStatus(`Upload error: ${uploadError}`);
    }
  }, [uploadError]);

  const containerClassNames =
    "bg-[#F7F7F7] flex gap-2 items-center border-2 border-[#0000001A] rounded-[10px] w-full text-[#6D6D6D] px-5";
  const inputClassNames =
    "bg-[#F7F7F7] py-3 w-full text-[#6D6D6D] text-[13px] rounded-[10px] \
    placeholder:text-[#6D6D6D] placeholder:text-[13px] focusl:outline-green-200 outline-0";
  const labelClassNames = "pb-1 text-[#6D6D6D] text-[12px] font-semibold";
  const validatePassword = usePasswordValidation();

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setUploadStatus(`Selected file: ${file.name}`);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Delete profile image
  const handleDeleteImage = async () => {
    if (!user?.id) {
      setUploadStatus("User ID not found");
      return;
    }

    setUploadStatus("Deleting image...");
    try {
      await api.patch(`/api/users/${user.id}/update-image`, {
        image: null,
      });
      setImagePreview(null);
      setImageFile(null);
      setUploadStatus("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting profile image:", error);
      setUploadStatus("Error deleting image");
    }
  };

  return (
    <div className="bg-white p-4 rounded-[10px]">
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="flex items-center gap-2">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={94}
                height={94}
                className="h-[94px] w-[94px] rounded-full object-cover"
              />
            ) : (
              <div className="h-[94px] w-[94px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="flex flex-col text-[14px] text-[#333333]">
              <span className="font-semibold">Profile picture</span>
              <span>PNG, JPEG under 15MB</span>
              {uploadStatus && (
                <span
                  className={`text-xs mt-1 ${
                    uploadError ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {uploadStatus}
                </span>
              )}
              {isUploading && (
                <div className="w-full mt-1">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-1 text-blue-500">
                    Uploading... {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#6D6D6D] font-semibold">
          <label className="border border-[#D1D0D0] rounded-[4px] p-2 cursor-pointer">
            Upload new picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button
            className="bg-[#F1F1F3] border border-[#D1D0D0] rounded-[4px] p-2"
            onClick={handleDeleteImage}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          first_name: Yup.string().required("First Name is required"),
          last_name: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().test(
            "password-validation",
            "Password does not meet requirements",
            function (value) {
              // Skip validation if password field is empty (no password change)
              if (!value) return true;
              return validatePassword(value).isValid;
            }
          ),
          re_password: Yup.string().test(
            "passwords-match",
            "Passwords must match",
            function (value) {
              // Only validate if password is being changed
              return !this.parent.password || value === this.parent.password;
            }
          ),
        })}
        onSubmit={async (
          values,
          { setSubmitting, setFieldError, setStatus }
        ) => {
          try {
            if (!user?.id) {
              throw new Error("User ID not found");
            }

            // Data to update
            const updateData: any = {
              name: `${values.first_name} ${values.last_name}`,
              email: values.email,
            };

            // Handle image upload if there's a new image
            if (imageFile) {
              setUploadStatus("Preparing to upload image...");
              try {
                const imageUrl = await uploadImage(imageFile);
                console.log("Image uploaded successfully:", imageUrl);
                updateData.image = imageUrl;
                setUploadStatus("Image uploaded successfully");
              } catch (err) {
                // Don't stop the form submission, but log the error
                console.error("Failed to upload image:", err);
                setUploadStatus(
                  `Failed to upload image: ${err instanceof Error ? err.message : String(err)}`
                );
                if (
                  values.first_name === user?.name?.split(" ")[0] &&
                  values.last_name === user?.name?.split(" ")[1] &&
                  values.email === user?.email &&
                  !values.password
                ) {
                  // If nothing else is changing, stop submission
                  setSubmitting(false);
                  return;
                }
                // Otherwise continue with other updates
              }
            }

            // Handle password update if provided
            if (values.password) {
              updateData.password = values.password;
            }

            console.log("Updating user with data:", updateData);

            // Update user data
            const response = await api.patch(
              `/api/users/${user.id}`,
              updateData
            );

            // Update auth context with new user data
            if (response.data && response.data.data) {
              authLogin(response.data.data);
              setStatus({ success: "Profile updated successfully" });
            }
          } catch (error) {
            console.error("Profile update error:", error);

            if (axios.isAxiosError(error) && error.response) {
              const { status, data } = error.response;
              const errorMessage =
                data?.message || "An unexpected error occurred";

              switch (status) {
                case 403:
                  setFieldError("email", "This email is already registered");
                  break;
                default:
                  setStatus({
                    error: `An error occurred. Please try again later. (${status}: ${errorMessage})`,
                  });
              }

              console.error(`API Error: ${status} - ${errorMessage}`);
            } else {
              console.error("Unexpected error:", error);
              setStatus({
                error: `An unexpected error occurred. Please try again. ${
                  error instanceof Error ? error.message : ""
                }`,
              });
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, status }) => (
          <Form className="flex flex-col gap-1">
            {status && status.success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {status.success}
              </div>
            )}

            {status && status.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {status.error}
              </div>
            )}

            <div className="text-[14px] text-[#333333] font-semibold mb-2">
              Full name
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col flex-[0.5]">
                <TextInput
                  name="first_name"
                  type="text"
                  label="First name"
                  placeholder="First name"
                  inputClassNames={inputClassNames}
                  containerClassNames={containerClassNames}
                  labelClassNames={labelClassNames}
                />
              </div>
              <div className="flex flex-col flex-[0.5]">
                <TextInput
                  name="last_name"
                  type="text"
                  label="Last name"
                  placeholder="Last name"
                  inputClassNames={inputClassNames}
                  containerClassNames={containerClassNames}
                  labelClassNames={labelClassNames}
                />
              </div>
            </div>
            <div className="text-[14px] text-[#333333] font-semibold mb-1">
              Contact email
            </div>
            <span className="flex text-[14px] text-[#6D6D6D] font-semibold mb-4">
              Manage your accounts email address for the invoices.
            </span>
            <div className="grid grid-cols-2 justify-between items-start gap-4">
              <div className="flex flex-col">
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  inputClassNames={inputClassNames}
                  containerClassNames={containerClassNames}
                  placeholder="Email Address"
                  icon="/svg/email.svg"
                  labelClassNames={labelClassNames}
                />
              </div>
              <button
                type="button"
                className="w-fit justify-self-end flex gap-2 items-center text-[#2E6A51] text-[12px] border border-[#2E6A51] rounded-[4px] px-4 py-2"
              >
                <IoAddCircleOutline />
                <span>Add another email</span>
              </button>
            </div>

            <div className="text-[14px] text-[#333333] font-semibold mb-1 mt-3">
              Password
            </div>
            <span className="flex text-[14px] text-[#6D6D6D] font-semibold mb-1">
              Modify your current password.
            </span>
            <div className="grid grid-cols-2 justify-between items-start gap-4">
              <div className="flex flex-col">
                <TextInput
                  name="password"
                  type="password"
                  label="Current password"
                  inputClassNames={inputClassNames}
                  containerClassNames={containerClassNames}
                  labelClassNames={labelClassNames}
                  placeholder="Password"
                  icon="/svg/password.svg"
                  showPasswordToggle={true}
                />
              </div>
              <div className="flex flex-col">
                <TextInput
                  name="re_password"
                  type="password"
                  label="New password"
                  inputClassNames={inputClassNames}
                  containerClassNames={containerClassNames}
                  labelClassNames={labelClassNames}
                  placeholder="Confirm Password"
                  icon="/svg/password.svg"
                  showPasswordToggle={true}
                />
              </div>
            </div>

            {values.password && <PasswordCheck password={values.password} />}

            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-primary w-fit flex justify-center items-center text-white border-2 border-[#FFFFFF3D] rounded-[10px] py-2 px-7 text-[14px] font-bold mt-4"
            >
              {isSubmitting || isUploading ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Change Requests Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Change Requests</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-gray-600 mb-4">
            Manage your course changes and cohort deferments in one place.
          </p>
          <button
            onClick={() => router.push("/dashboard/change-requests")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Go to Change Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;