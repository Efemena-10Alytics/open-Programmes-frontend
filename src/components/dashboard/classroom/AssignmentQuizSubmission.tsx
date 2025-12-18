import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";
import Loader from "../../utilities/Loader";

interface AssignmentQuizSubmissionProps {
  assignment: any;
  onSubmissionComplete: (result: any) => void;
}

const AssignmentQuizSubmission: React.FC<AssignmentQuizSubmissionProps> = ({
  assignment,
  onSubmissionComplete,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const submitQuizMutation = useMutation({
    mutationFn: async (quizAnswers: any[]) => {
      const response = await api.post(`/api/assignments/${assignment.id}/submit`, {
        quizAnswers,
      });
      return response.data;
    },
    onSuccess: (data) => {
      onSubmissionComplete(data);
      queryClient.invalidateQueries({ queryKey: ["assignment", assignment.id] });
    },
  });

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assignment.assignmentQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const quizAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId,
    }));

    if (quizAnswers.length !== assignment.assignmentQuizQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    if (confirm("Are you sure you want to submit the quiz? You cannot change your answers after submission.")) {
      submitQuizMutation.mutate(quizAnswers);
    }
  };

  const currentQ = assignment.assignmentQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assignment.assignmentQuizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === assignment.assignmentQuizQuestions.length - 1;
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = assignment.assignmentQuizQuestions.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Take Quiz: {assignment.title}</h2>
          <span className="text-sm text-gray-600">
            {answeredQuestions}/{totalQuestions} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Question {currentQuestion + 1} of {totalQuestions}
          </h3>
          <span className="text-sm text-gray-500">
            {currentQ.points} point{currentQ.points !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-800 font-medium">{currentQ.question}</p>
        </div>

        <div className="space-y-3">
          {currentQ.assignmentQuizOptions.map((option: any) => (
            <div
              key={option.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                answers[currentQ.id] === option.id
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleAnswerSelect(currentQ.id, option.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers[currentQ.id] === option.id
                    ? "border-red-500 bg-red-500"
                    : "border-gray-300"
                }`}>
                  {answers[currentQ.id] === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-800">{option.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center space-x-3">
          {!isLastQuestion ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Question
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitQuizMutation.isPending || answeredQuestions !== totalQuestions}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitQuizMutation.isPending ? (
                <>
                  <Loader />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>📤</span>
                  <span>Submit Quiz</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Question Navigation</h4>
        <div className="grid grid-cols-5 gap-2">
          {assignment.assignmentQuizQuestions.map((question: any, index: number) => (
            <button
              key={question.id}
              type="button"
              onClick={() => setCurrentQuestion(index)}
              className={`p-2 rounded-md text-sm font-medium ${
                currentQuestion === index
                  ? "bg-red-600 text-white"
                  : answers[question.id]
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Quiz Instructions</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Answer all questions before submitting</li>
          <li>• You can navigate between questions using the navigation buttons</li>
          <li>• Once submitted, you cannot change your answers</li>
          <li>• Your score will be shown immediately after submission</li>
        </ul>
      </div>
    </div>
  );
};

export default AssignmentQuizSubmission;