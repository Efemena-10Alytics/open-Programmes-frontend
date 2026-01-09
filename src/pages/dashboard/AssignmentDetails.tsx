// components/assignments/AssignmentDetails.tsx (Updated for Next.js App Router)
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../lib/api";
import Loader from "../../components/utilities/Loader";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";
import { cloudinaryConfig } from "../../config/cloudinary";
import AssignmentQuizSubmission from "../../components/dashboard/classroom/AssignmentQuizSubmission";

interface AssignmentDetailsProps {
  assignmentId: string;
}

const AssignmentDetails = ({ assignmentId }: AssignmentDetailsProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Function to convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    if (!text) return null;
    
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-words"
          >
            {part}
          </Link>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Cloudinary upload hook
  const {
    uploadImage,
    isUploading: isCloudinaryUploading,
    error: cloudinaryError,
    progress: cloudinaryProgress,
  } = useCloudinaryUpload(
    cloudinaryConfig.uploadPreset,
    cloudinaryConfig.cloudName,
    {
      maxFileSizeMB: 10,
      compressBeforeUpload: true,
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
      },
    }
  );

  // Fetch assignment details
  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      const response = await api.get(`/api/assignments/${assignmentId}`);
      return response.data.assignment;
    },
    enabled: !!assignmentId,
  });

  // Fetch user's submission for this assignment
  const { data: userSubmission, isLoading: submissionLoading } = useQuery({
    queryKey: ["assignmentSubmission", assignmentId, user?.id],
    queryFn: async () => {
      const response = await api.get(
        `/api/assignments/${assignmentId}/submission`,
        {
          params: { studentId: user?.id },
        }
      );
      return response.data.submission;
    },
    enabled: !!assignmentId && !!user?.id,
  });

  // Fetch quiz results if it's a quiz assignment
  const { data: quizSubmission } = useQuery({
    queryKey: ["assignmentQuizResults", assignmentId, user?.id],
    queryFn: async () => {
      const response = await api.get(
        `/api/assignments/${assignmentId}/quiz-results`,
        {
          params: { studentId: user?.id },
        }
      );
      return response.data.assignmentQuizSubmission;
    },
    enabled: !!assignmentId && !!user?.id && assignment?.type === "QUIZ",
  });

  // Handle quiz submission completion
  const handleQuizSubmissionComplete = (result: any) => {
    setQuizResult(result);
    queryClient.invalidateQueries({ queryKey: ["assignmentQuizResults", assignmentId, user?.id] });
  };

  // Regular assignment submission mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: async (submissionData: {
      content: string;
      fileUrl?: string;
    }) => {
      const response = await api.post(
        `/api/assignments/${assignmentId}/submit`,
        submissionData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignmentSubmission", assignmentId, user?.id],
      });
      setSubmissionText("");
      setSubmissionFile(null);
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!submissionText.trim() && !submissionFile) {
      alert("Please provide either text submission or upload a file.");
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = undefined;

      if (submissionFile) {
        try {
          fileUrl = await uploadImage(submissionFile);
          console.log("File uploaded to Cloudinary:", fileUrl);
        } catch (uploadError) {
          console.error("Cloudinary upload failed:", uploadError);
          alert("File upload failed. Please try again or submit with text only.");
          setIsSubmitting(false);
          return;
        }
      }

      const submissionData = {
        content: submissionText.trim() || "",
        ...(fileUrl ? { fileUrl } : {}),
      };

      submitAssignmentMutation.mutate(submissionData);
    } catch (error) {
      console.error("Submission process failed:", error);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/zip",
        "image/jpeg",
        "image/png",
        "image/gif",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert(
          "Please select a valid file type (PDF, Word, ZIP, Images, or Text files)"
        );
        e.target.value = "";
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        e.target.value = "";
        return;
      }
    }

    setSubmissionFile(file);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (dueDate: string, submission: any, quizSub: any) => {
    const now = new Date();
    const due = new Date(dueDate);

    if (quizSub) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          ✅ Quiz Completed
        </span>
      );
    }

    if (submission) {
      if (submission.grade !== undefined && submission.grade !== null) {
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✅ Graded
          </span>
        );
      }
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          📤 Submitted
        </span>
      );
    } else if (now > due) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          ⏰ Overdue
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          📝 Pending
        </span>
      );
    }
  };

  const getFileTypeIcon = (fileUrl: string) => {
    if (fileUrl.includes(".pdf")) return "📕";
    if (fileUrl.includes(".doc") || fileUrl.includes(".docx")) return "📄";
    if (fileUrl.includes(".zip") || fileUrl.includes(".rar")) return "📦";
    if (
      fileUrl.includes(".jpg") ||
      fileUrl.includes(".jpeg") ||
      fileUrl.includes(".png")
    )
      return "🖼️";
    return "📎";
  };

  const calculateGradePercentage = (grade: number, maxPoints: number) => {
    if (!maxPoints) return 0;
    return Math.round((grade / maxPoints) * 100);
  };

  const getGradeColor = (grade: number, maxPoints: number) => {
    const percentage = calculateGradePercentage(grade, maxPoints);
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  if (assignmentLoading) {
    return <Loader />;
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Assignment Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The assignment you're looking for doesn't exist.
          </p>
          <Link
            href="/dashboard/classroom"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Back to Classroom
          </Link>
        </div>
      </div>
    );
  }

  const isQuizAssignment = assignment.type === "QUIZ";
  const hasQuizSubmission = !!quizSubmission;
  const isGraded = userSubmission?.grade !== undefined && userSubmission?.grade !== null;
  const isUploading = isCloudinaryUploading || isSubmitting;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/classroom"
            className="inline-flex items-center text-red-600 hover:text-red-800 mb-4"
          >
            ← Back to Classroom
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {assignment.title}
                </h1>
                {isQuizAssignment && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    🧩 Quiz
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {getStatusBadge(assignment.dueDate, userSubmission, quizSubmission)}
                {assignment.points && (
                  <span className="text-lg font-medium text-gray-600">
                    {assignment.points} points
                  </span>
                )}
                {/* Show quiz score if available */}
                {hasQuizSubmission && (
                  <div className="text-lg font-bold text-green-600">
                    Quiz Score: {quizSubmission.totalScore}/{quizSubmission.maxScore}
                    ({Math.round((quizSubmission.totalScore / quizSubmission.maxScore) * 100)}%)
                  </div>
                )}
                {/* Show regular assignment grade if graded */}
                {isGraded && (
                  <div className={`text-lg font-bold ${getGradeColor(userSubmission.grade, assignment.points)}`}>
                    Grade: {userSubmission.grade}/{assignment.points}
                    ({calculateGradePercentage(userSubmission.grade, assignment.points)}%)
                  </div>
                )}
              </div>
            </div>
            {user?.role === "ADMIN" || user?.role === "COURSE_ADMIN" ? (
              <button
                onClick={() =>
                  router.push(`/dashboard/assignments/${assignmentId}/submissions`)
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                View Submissions
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {isQuizAssignment ? "Quiz Details" : "Assignment Details"}
              </h2>

              {assignment.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {renderTextWithLinks(assignment.description)}
                  </p>
                </div>
              )}

              {assignment.instructions && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Instructions
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {renderTextWithLinks(assignment.instructions)}
                    </p>
                  </div>
                </div>
              )}

              {/* Quiz Info */}
              {isQuizAssignment && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Quiz Information
                  </h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-purple-900">Number of Questions:</span>
                        <span className="ml-2 text-purple-700">
                          {assignment.assignmentQuizQuestions?.length || 0}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-purple-900">Total Points:</span>
                        <span className="ml-2 text-purple-700">
                          {assignment.points}
                        </span>
                      </div>
                    </div>
                    {hasQuizSubmission && (
                      <div className="mt-3 p-3 bg-white rounded border border-purple-100">
                        <h4 className="font-medium text-purple-900 mb-2">Your Quiz Result</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-green-600">
                              {quizSubmission.totalScore}/{quizSubmission.maxScore}
                            </div>
                            <div className="text-sm text-purple-600">
                              {Math.round((quizSubmission.totalScore / quizSubmission.maxScore) * 100)}% Correct
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-purple-600">
                              Submitted on {new Date(quizSubmission.submittedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {assignment.attachments.map((attachment: any) => (
                      <Link
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-red-600">📎</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Click to download
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Submission Component */}
            {isQuizAssignment && !hasQuizSubmission && (
              <AssignmentQuizSubmission
                assignment={assignment}
                onSubmissionComplete={handleQuizSubmissionComplete}
              />
            )}

            {/* Regular Assignment Submission Section */}
            {!isQuizAssignment && (user?.role === "USER" || !user?.role) && !userSubmission && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Submit Assignment
                </h2>

                {/* Cloudinary Upload Progress */}
                {isCloudinaryUploading && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-900">
                        Uploading file...
                      </span>
                      <span className="text-sm text-red-700">
                        {cloudinaryProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${cloudinaryProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Cloudinary Error */}
                {cloudinaryError && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-700 text-sm">{cloudinaryError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmitAssignment} className="space-y-4">
                  <div>
                    <label
                      htmlFor="submissionText"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Submission (Text)
                    </label>
                    <textarea
                      id="submissionText"
                      rows={6}
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Type your assignment submission here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      disabled={isUploading}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Optional: You can also upload a file below
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="submissionFile"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Or Upload File
                    </label>
                    <input
                      type="file"
                      id="submissionFile"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                      accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.gif,.txt"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: PDF, Word, ZIP, Images, Text (Max: 10MB)
                    </p>
                    {submissionFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {submissionFile.name} (
                        {(submissionFile.size / 1024 / 1024).toFixed(2)}MB)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {assignment.dueDate && (
                        <p>Due: {formatDate(assignment.dueDate)}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={
                        isUploading ||
                        (!submissionText.trim() && !submissionFile)
                      }
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Assignment</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Submission Status - For students who have submitted */}
            {(userSubmission || hasQuizSubmission) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Submission
                </h2>

                <div className={`border rounded-lg p-4 mb-4 ${
                  hasQuizSubmission ? "bg-green-50 border-green-200" :
                  isGraded ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}>
                  <div className={`flex items-center space-x-2 ${
                    hasQuizSubmission ? "text-green-800" :
                    isGraded ? "text-green-800" : "text-red-800"
                  }`}>
                    <span>{hasQuizSubmission || isGraded ? "✅" : "📤"}</span>
                    <span className="font-medium">
                      {hasQuizSubmission ? "Quiz Completed" : 
                       isGraded ? "Graded" : "Submitted"} on{" "}
                      {formatDate(hasQuizSubmission ? quizSubmission.submittedAt : userSubmission.submittedAt)}
                    </span>
                  </div>

                  {/* Quiz Score Display */}
                  {hasQuizSubmission && (
                    <div className="mt-3 p-3 bg-white rounded border border-green-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Your Quiz Score</h4>
                          <div className="text-2xl font-bold text-green-600">
                            {quizSubmission.totalScore}/{quizSubmission.maxScore}
                            <span className="text-lg ml-2">
                              ({Math.round((quizSubmission.totalScore / quizSubmission.maxScore) * 100)}%)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Maximum Score</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {quizSubmission.maxScore}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Regular Assignment Grade Display */}
                  {isGraded && (
                    <div className="mt-3 p-3 bg-white rounded border border-green-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Your Grade</h4>
                          <div className={`text-2xl font-bold ${getGradeColor(userSubmission.grade, assignment.points)}`}>
                            {userSubmission.grade}/{assignment.points}
                            <span className="text-lg ml-2">
                              ({calculateGradePercentage(userSubmission.grade, assignment.points)}%)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Maximum Points</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {assignment.points}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {userSubmission?.content && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Text Submission
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {userSubmission.content}
                      </p>
                    </div>
                  </div>
                )}

                {userSubmission?.fileUrl && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Uploaded File
                    </h3>
                    <Link
                      href={userSubmission.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-lg">
                        {getFileTypeIcon(userSubmission.fileUrl)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          View Submitted File
                        </p>
                        <p className="text-sm text-gray-500">
                          Click to open in new tab
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Feedback Section */}
                {isGraded && userSubmission.feedback && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Instructor Feedback
                    </h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {userSubmission.feedback}
                      </p>
                      {userSubmission.gradedBy && (
                        <p className="text-sm text-gray-600 mt-2">
                          — {userSubmission.gradedBy.name}
                          {userSubmission.gradedAt &&
                            ` on ${formatDate(userSubmission.gradedAt)}`}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Due Date Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Due Date
              </h3>
              {assignment.dueDate ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {formatDate(assignment.dueDate)}
                  </div>
                  {new Date() > new Date(assignment.dueDate) ? (
                    <p className="text-red-600 font-medium">
                      This assignment is overdue
                    </p>
                  ) : (
                    <p className="text-green-600 font-medium">
                      Still accepting submissions
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center">No due date set</p>
              )}
            </div>

            {/* Assignment Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isQuizAssignment ? "Quiz Information" : "Assignment Information"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">
                    {isQuizAssignment ? "Quiz" : "Regular Assignment"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-medium text-gray-900">
                    {assignment.points || "Not specified"}
                  </span>
                </div>
                {isQuizAssignment && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium text-gray-900">
                      {assignment.assignmentQuizQuestions?.length || 0}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(assignment.createdAt)}
                  </span>
                </div>
                {assignment.cohortCourse && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium text-gray-900">
                      {assignment.cohortCourse.title}
                    </span>
                  </div>
                )}
                {/* Show quiz score if available */}
                {hasQuizSubmission && (
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">Your Score:</span>
                    <span className="font-bold text-green-600">
                      {quizSubmission.totalScore}/{quizSubmission.maxScore}
                    </span>
                  </div>
                )}
                {/* Show regular assignment grade if graded */}
                {isGraded && (
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">Your Grade:</span>
                    <span className={`font-bold ${getGradeColor(userSubmission.grade, assignment.points)}`}>
                      {userSubmission.grade}/{assignment.points}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => window.print()}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  📄 Print Assignment
                </button>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🔗 Copy Link
                </button>
                <Link
                  href="/dashboard/classroom"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🏠 Back to Classroom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;