// components/assignments/AssignmentSubmissions.tsx (Updated for Next.js App Router)
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";
import Loader from "../../utilities/Loader";

interface Submission {
  id: string;
  content?: string;
  fileUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: {
    id: string;
    name: string;
    email: string;
  };
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface QuizSubmission {
  id: string;
  totalScore: number;
  maxScore: number;
  submittedAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  assignmentQuizAnswers: any[];
}

interface AssignmentSubmissionsProps {
  assignmentId: string;
}

const AssignmentSubmissions = ({ assignmentId }: AssignmentSubmissionsProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [selectedQuizSubmission, setSelectedQuizSubmission] = useState<QuizSubmission | null>(null);
  const [gradingData, setGradingData] = useState<{ [key: string]: { grade: string; feedback: string } }>({});

  // Fetch assignment details
  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      const response = await api.get(`/api/assignments/${assignmentId}`);
      return response.data.assignment;
    },
    enabled: !!assignmentId,
  });

  // Fetch all submissions for this assignment
  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ["assignmentSubmissions", assignmentId],
    queryFn: async () => {
      const response = await api.get(`/api/assignments/${assignmentId}/submissions`);
      return response.data.submissions;
    },
    enabled: !!assignmentId && assignment?.type !== "QUIZ",
  });

  // Fetch quiz submissions if it's a quiz assignment
  const { data: quizSubmissions, isLoading: quizSubmissionsLoading } = useQuery({
    queryKey: ["assignmentQuizSubmissions", assignmentId],
    queryFn: async () => {
      const response = await api.get(`/api/assignments/${assignmentId}/quiz-submissions`);
      return response.data.quizSubmissions;
    },
    enabled: !!assignmentId && assignment?.type === "QUIZ",
  });

  // Grade submission mutation
  const gradeSubmissionMutation = useMutation({
    mutationFn: async ({ submissionId, grade, feedback }: { submissionId: string; grade: number; feedback: string }) => {
      const response = await api.post(`/api/assignments/submissions/${submissionId}/grade`, {
        grade,
        feedback,
        gradedById: user?.id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignmentSubmissions", assignmentId] });
      setSelectedSubmission(null);
    },
  });

  const isQuizAssignment = assignment?.type === "QUIZ";
  const isLoading = assignmentLoading || (isQuizAssignment ? quizSubmissionsLoading : submissionsLoading);
  const displaySubmissions = isQuizAssignment ? quizSubmissions : submissions;

  if (isLoading) {
    return <Loader />;
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assignment Not Found</h1>
          <p className="text-gray-600 mb-4">The assignment you're looking for doesn't exist.</p>
          <Link
            href="/dashboard/assignments"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/dashboard/assignments/${assignmentId}`}
                className="inline-flex items-center text-red-600 hover:text-red-800 mb-4"
              >
                ← Back to Assignment
              </Link>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Submissions for: {assignment.title}
                </h1>
                {isQuizAssignment && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    🧩 Quiz
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-lg text-gray-600">
                  {displaySubmissions?.length || 0} submission{displaySubmissions?.length !== 1 ? 's' : ''}
                </span>
                {assignment.points && (
                  <span className="text-lg font-medium text-gray-600">
                    {assignment.points} points
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => router.push(`/dashboard/assignments/${assignmentId}`)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              View Assignment
            </button>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{displaySubmissions?.length || 0}</div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </div>
          
          {isQuizAssignment ? (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {quizSubmissions?.filter((s: QuizSubmission) => s.totalScore > 0).length || 0}
                </div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {quizSubmissions?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {submissions?.filter((s: Submission) => s.grade !== undefined && s.grade !== null).length || 0}
                </div>
                <div className="text-sm text-gray-600">Graded</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {submissions?.filter((s: Submission) => s.grade === undefined || s.grade === null).length || 0}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {assignment.points || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Max Points</div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {displaySubmissions?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">
                {isQuizAssignment ? "🧩" : "📭"}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {isQuizAssignment ? 'Quiz ' : ''}Submissions Yet
              </h3>
              <p className="text-gray-600">
                {isQuizAssignment ? 'Students haven\'t taken the quiz yet.' : 'Students haven\'t submitted any work for this assignment yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {isQuizAssignment ? "Quiz Score" : "Submission"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    {isQuizAssignment ? (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Feedback
                        </th>
                      </>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displaySubmissions?.map((submission: any) => (
                    <SubmissionRow 
                      key={submission.id} 
                      submission={submission} 
                      isQuiz={isQuizAssignment}
                      assignment={assignment}
                      onView={(sub: Submission | QuizSubmission) => isQuizAssignment ? setSelectedQuizSubmission(sub as QuizSubmission) : setSelectedSubmission(sub as Submission)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Submission Detail Modals */}
      {selectedSubmission && (
        <SubmissionDetailModal 
          submission={selectedSubmission}
          isQuiz={false}
          onClose={() => setSelectedSubmission(null)}
        />
      )}

      {selectedQuizSubmission && (
        <QuizSubmissionDetailModal 
          submission={selectedQuizSubmission}
          onClose={() => setSelectedQuizSubmission(null)}
        />
      )}
    </div>
  );
};

// Helper component for submission row
const SubmissionRow = ({ submission, isQuiz, assignment, onView }: any) => {
  if (isQuiz) {
    return <QuizSubmissionRow submission={submission} onView={onView} />;
  }
  return <RegularSubmissionRow submission={submission} assignment={assignment} onView={onView} />;
};

// Regular submission row
const RegularSubmissionRow = ({ submission, assignment, onView }: any) => {
  const status = getSubmissionStatus(submission);
  
  return (
    <tr className="hover:bg-gray-50">
      <StudentInfoCell student={submission.student} />
      <SubmissionContentCell submission={submission} />
      <SubmissionDateCell submittedAt={submission.submittedAt} />
      <GradeCell submission={submission} assignment={assignment} />
      <FeedbackCell submission={submission} />
      <StatusCell status={status} />
      <ActionsCell submission={submission} onView={onView} />
    </tr>
  );
};

// Quiz submission row
const QuizSubmissionRow = ({ submission, onView }: any) => {
  const percentage = Math.round((submission.totalScore / submission.maxScore) * 100);
  const status = percentage >= 60 ? "text-green-600" : "text-red-600";
  
  return (
    <tr className="hover:bg-gray-50">
      <StudentInfoCell student={submission.student} />
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          <div className="font-medium">Quiz Completed</div>
          <div className="text-gray-500">{submission.assignmentQuizAnswers?.length || 0} questions answered</div>
        </div>
      </td>
      <SubmissionDateCell submittedAt={submission.submittedAt} />
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          <span className={`font-bold ${status}`}>
            {submission.totalScore}/{submission.maxScore}
          </span>
          <span className="text-gray-500 ml-1">({percentage}%)</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          percentage >= 60 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {percentage >= 60 ? "Passed" : "Failed"}
        </span>
      </td>
      <ActionsCell submission={submission} onView={onView} isQuiz={true} />
    </tr>
  );
};

// Reusable cell components
const StudentInfoCell = ({ student }: any) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
      <img
        src={student.image || "/default-avatar.png"}
        alt={student.name}
        className="w-8 h-8 rounded-full mr-3"
        width={32}
        height={32}
      />
      <div>
        <div className="text-sm font-medium text-gray-900">
          {student.name}
        </div>
        <div className="text-sm text-gray-500">
          {student.email}
        </div>
      </div>
    </div>
  </td>
);

const SubmissionContentCell = ({ submission }: any) => (
  <td className="px-6 py-4">
    <div className="text-sm text-gray-900 max-w-xs">
      {submission.content && (
        <p className="truncate">{submission.content.substring(0, 100)}...</p>
      )}
      {submission.fileUrl && (
        <Link
          href={submission.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800"
        >
          <span>📎</span>
          <span>View File</span>
        </Link>
      )}
    </div>
  </td>
);

const SubmissionDateCell = ({ submittedAt }: any) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {new Date(submittedAt).toLocaleDateString()}
  </td>
);

const GradeCell = ({ submission, assignment }: any) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {submission.grade !== undefined && submission.grade !== null ? (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900">
          {submission.grade}/{assignment.points}
        </span>
        <span className="text-sm text-gray-500">
          ({Math.round((submission.grade / assignment.points) * 100)}%)
        </span>
      </div>
    ) : (
      <span className="text-sm text-gray-500">Not graded</span>
    )}
  </td>
);

const FeedbackCell = ({ submission }: any) => (
  <td className="px-6 py-4">
    <div className="text-sm text-gray-900 max-w-xs">
      {submission.feedback ? (
        <p className="truncate">{submission.feedback}</p>
      ) : (
        <span className="text-gray-500">No feedback</span>
      )}
    </div>
  </td>
);

const StatusCell = ({ status }: any) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
      {status.text}
    </span>
  </td>
);

const ActionsCell = ({ submission, onView, isQuiz }: any) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    <button
      onClick={() => onView(submission)}
      className="text-red-600 hover:text-red-900 mr-3"
    >
      👁️ View
    </button>
    {!isQuiz && (
      <button
        onClick={() => {/* Add grade action */}}
        className="text-green-600 hover:text-green-900"
      >
        📝 Grade
      </button>
    )}
  </td>
);

// Helper function
const getSubmissionStatus = (submission: any) => {
  if (submission.grade !== undefined && submission.grade !== null) {
    return { text: "Graded", color: "text-green-600", bg: "bg-green-100" };
  }
  return { text: "Pending", color: "text-yellow-600", bg: "bg-yellow-100" };
};

// Modal components
const SubmissionDetailModal = ({ submission, onClose }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Submission by {submission.student.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Submitted Content</h3>
          {submission.content && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">{submission.content}</p>
            </div>
          )}
          {submission.fileUrl && (
            <div className="mt-4">
              <Link
                href={submission.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-800"
              >
                <span>📎</span>
                <span>Download attached file</span>
              </Link>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Grading</h3>
          {submission.grade !== undefined && submission.grade !== null ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-900">Grade</h4>
                    <div className="text-2xl font-bold text-green-800">
                      {submission.grade}
                      {submission.gradedBy && (
                        <span className="text-sm font-normal text-green-700 ml-2">
                          (Graded by {submission.gradedBy.name})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-700">
                      Graded on {submission.gradedAt ? new Date(submission.gradedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
              
              {submission.feedback && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Feedback</h4>
                  <p className="text-blue-800">{submission.feedback}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">This submission hasn't been graded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const QuizSubmissionDetailModal = ({ submission, onClose }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Quiz Submission by {submission.student.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-green-900">Quiz Score</h3>
              <div className="text-2xl font-bold text-green-800">
                {submission.totalScore}/{submission.maxScore}
                <span className="text-lg ml-2">
                  ({Math.round((submission.totalScore / submission.maxScore) * 100)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700">
                Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-4">Question Details</h3>
        <div className="space-y-4">
          {submission.assignmentQuizAnswers?.map((answer: any, index: number) => (
            <div key={answer.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  Question {index + 1}: {answer.assignmentQuizQuestion?.question}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  answer.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Selected Answer:</strong> {answer.selectedAssignmentQuizOption?.text}</p>
                {!answer.isCorrect && (
                  <p><strong>Correct Answer:</strong> {
                    answer.assignmentQuizQuestion?.assignmentQuizOptions?.find((opt: any) => opt.isCorrect)?.text
                  }</p>
                )}
                <p><strong>Points:</strong> {answer.pointsEarned}/{answer.assignmentQuizQuestion?.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AssignmentSubmissions;