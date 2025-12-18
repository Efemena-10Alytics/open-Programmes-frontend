import { useState, useEffect } from "react";
import api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import { Quiz } from "../../types";
import { Modal } from "../ui/Modal";
import QuizForm from "./QuizForm";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

interface WeekQuizzesProps {
  isCourseAdmin: boolean;
  weekId: string;
}

interface QuizResult {
  quizId: string;
  selectedAnswerId: string;
  isCorrect: boolean;
}

export default function WeekQuizzes({ isCourseAdmin, weekId }: WeekQuizzesProps) {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [weekScore, setWeekScore] = useState({ correct: 0, total: 0 });
  const [submittingQuiz, setSubmittingQuiz] = useState<string | null>(null);
  const [showSparkAnimation, setShowSparkAnimation] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get(`/api/quiz/week/${weekId}`);
        setQuizzes(response.data?.data || []);
        setError("");
      } catch (err) {
        setError("Failed to load quizzes");
        console.error(err);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchUserAnswers = async () => {
      if (user) {
        try {
          const response = await api.get("/api/quiz/answers/user");
          const answersMap: Record<string, boolean> = {};
          const resultsMap: Record<string, QuizResult> = {};
          const userAnswers = response.data?.data || [];
          
          userAnswers.forEach((answer: any) => {
            if (answer?.quizAnswer?.quizId) {
              answersMap[answer.quizAnswer.quizId] = true;
              resultsMap[answer.quizAnswer.quizId] = {
                quizId: answer.quizAnswer.quizId,
                selectedAnswerId: answer.quizAnswerId,
                isCorrect: answer.quizAnswer.isCorrect
              };
            }
          });
          
          setSubmittedAnswers(answersMap);
          setQuizResults(resultsMap);
        } catch (err) {
          console.error("Failed to fetch user answers", err);
          setSubmittedAnswers({});
          setQuizResults({});
        }
      }
    };

    fetchQuizzes();
    fetchUserAnswers();
  }, [weekId, user]);

  // Check if all quizzes are completed and calculate score
  useEffect(() => {
    if (quizzes.length > 0 && Object.keys(submittedAnswers).length > 0) {
      const completedQuizzes = quizzes.filter(quiz => submittedAnswers[quiz.id]);
      
      if (completedQuizzes.length === quizzes.length) {
        const correctAnswers = completedQuizzes.filter(quiz => 
          quizResults[quiz.id]?.isCorrect
        ).length;
        
        setWeekScore({ correct: correctAnswers, total: quizzes.length });
        
        // Show animation after a brief delay
        setTimeout(() => {
          setShowScoreAnimation(true);
        }, 500);
      }
    }
  }, [quizzes, submittedAnswers, quizResults]);

  const handleAnswerSelect = (quizId: string, answerId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [quizId]: answerId,
    }));
  };

  const handleSubmitAnswer = async (quizId: string) => {
    if (!userAnswers[quizId]) {
      return;
    }

    setSubmittingQuiz(quizId);

    try {
      const response = await api.post("/api/quiz/submit", {
        quizId,
        answerId: userAnswers[quizId],
      });

      // Find the selected answer to check if it's correct
      const selectedQuiz = quizzes.find(q => q.id === quizId);
      const selectedAnswer = selectedQuiz?.answers.find(a => a.id === userAnswers[quizId]);
      
      setSubmittedAnswers((prev) => ({
        ...prev,
        [quizId]: true,
      }));

      setQuizResults((prev) => ({
        ...prev,
        [quizId]: {
          quizId,
          selectedAnswerId: userAnswers[quizId],
          isCorrect: selectedAnswer?.isCorrect || false
        }
      }));

      // Show spark animation
      setShowSparkAnimation(quizId);
      setTimeout(() => {
        setShowSparkAnimation(null);
      }, 2000);

    } catch (err) {
      console.error("Failed to submit answer", err);
    } finally {
      setSubmittingQuiz(null);
    }
  };

  const handleCreateQuiz = () => {
    setSelectedQuiz(null);
    setShowQuizModal(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizModal(true);
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteModal(true);
  };

  const confirmDeleteQuiz = async () => {
    if (!quizToDelete) return;

    try {
      await api.delete(`/api/quiz/${quizToDelete}`);
      setQuizzes((prev) => prev.filter((q) => q.id !== quizToDelete));
      setShowDeleteModal(false);
      setQuizToDelete(null);
    } catch (err) {
      console.error("Failed to delete quiz", err);
      alert("Failed to delete quiz");
    }
  };

  const handleQuizSave = async (quizData: { 
    question: string; 
    answers: { name: string; isCorrect: boolean }[] 
  }) => {
    try {
      if (selectedQuiz) {
        // Update existing quiz
        const response = await api.patch(`/api/quiz/${selectedQuiz.id}`, {
          question: quizData.question,
          answers: quizData.answers
        });
        setQuizzes(prev => prev.map(q => q.id === selectedQuiz.id ? response.data.data : q));
      } else {
        // Create new quiz - more robust module handling
        let moduleId = "";
        
        try {
          const modulesResponse = await api.get(`/api/module/week/${weekId}`);
          if (modulesResponse.data?.data?.length > 0) {
            moduleId = modulesResponse.data.data[0].id;
          } else {
            // Option 2: Create a new module if none exists
            const newModule = await api.post("/api/module", {
              title: "Quiz Module",
              courseWeekId: weekId,
              description: "Module for quizzes"
            });
            moduleId = newModule.data.id;
          }
        } catch (err) {
          console.error("Failed to handle modules", err);
          alert("Failed to setup module for quiz");
          return;
        }
  
        try {
          const response = await api.post("/api/quiz", {
            ...quizData,
            moduleId
          });
          setQuizzes(prev => [...prev, response.data.data]);
        } catch (err) {
          console.error("Failed to create quiz", err);
          alert("Failed to create quiz");
        }
      }
      setShowQuizModal(false);
    } catch (err) {
      console.error("Failed to save quiz", err);
      alert("Failed to save quiz");
    }
  };

  const closeScoreAnimation = () => {
    setShowScoreAnimation(false);
  };

  const getScoreColor = () => {
    const percentage = (weekScore.correct / weekScore.total) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = () => {
    const percentage = (weekScore.correct / weekScore.total) * 100;
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Practicing! 💪";
  };

  if (loading) return <div className="text-[#828282] text-sm py-4">Loading quizzes...</div>;
  if (error) return <div className="text-[#FA5252] text-sm py-4">{error}</div>;

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes spark-0 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(0deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(0deg) translateY(-40px) scale(0); } }
        @keyframes spark-1 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(30deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(30deg) translateY(-40px) scale(0); } }
        @keyframes spark-2 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(60deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(60deg) translateY(-40px) scale(0); } }
        @keyframes spark-3 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(90deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(90deg) translateY(-40px) scale(0); } }
        @keyframes spark-4 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(120deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(120deg) translateY(-40px) scale(0); } }
        @keyframes spark-5 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(150deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(150deg) translateY(-40px) scale(0); } }
        @keyframes spark-6 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(180deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(180deg) translateY(-40px) scale(0); } }
        @keyframes spark-7 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(210deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(210deg) translateY(-40px) scale(0); } }
        @keyframes spark-8 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(240deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(240deg) translateY(-40px) scale(0); } }
        @keyframes spark-9 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(270deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(270deg) translateY(-40px) scale(0); } }
        @keyframes spark-10 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(300deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(300deg) translateY(-40px) scale(0); } }
        @keyframes spark-11 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(330deg) translateY(-20px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(330deg) translateY(-40px) scale(0); } }
        @keyframes spark-small-0 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(15deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(15deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-1 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(60deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(60deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-2 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(105deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(105deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-3 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(150deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(150deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-4 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(195deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(195deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-5 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(240deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(240deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-6 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(285deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(285deg) translateY(-30px) scale(0); } }
        @keyframes spark-small-7 { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(330deg) translateY(-15px) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(330deg) translateY(-30px) scale(0); } }
      `}</style>
      {isCourseAdmin && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleCreateQuiz}
            className="text-primary text-[10px] py-2 px-4 rounded-full border border-primary cursor-pointer hover:bg-[#FFB5B41A]"
          >
            Add New Quiz
          </button>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="bg-[#F7F8FA] border-[0.7px] border-[#ECECEC] rounded-[10px] p-6 text-center text-[#828282]">
          <img src="svg/empty2.svg" alt="" className="w-16 h-16 mx-auto mb-2" />
          <p>No quizzes available for this week</p>
        </div>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white border border-[#EDEDED] rounded-[10px] p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[#333333] text-[14px] font-bold">{quiz.question}</h3>
              {isCourseAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditQuiz(quiz)}
                    className="text-[#2684FF] text-[10px] py-1 px-3 rounded-full border border-[#2684FF] cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="text-[#FA5252] text-[10px] py-1 px-3 rounded-full border border-[#FA5252] cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 text-[12px] pl-1">
              {quiz.answers.map((answer) => {
                const isSubmitted = submittedAnswers[quiz.id];
                const selectedAnswerId = quizResults[quiz.id]?.selectedAnswerId;
                const isSelected = userAnswers[quiz.id] === answer.id || selectedAnswerId === answer.id;
                const isCorrect = answer.isCorrect;
                const isWrongSelection = isSubmitted && isSelected && !isCorrect;
                
                return (
                  <div key={answer.id} className="flex items-center py-1">
                    <input
                      type="radio"
                      id={`answer-${answer.id}`}
                      name={`quiz-${quiz.id}`}
                      value={answer.id}
                      checked={userAnswers[quiz.id] === answer.id}
                      onChange={() => handleAnswerSelect(quiz.id, answer.id)}
                      disabled={submittedAnswers[quiz.id]}
                      className="mr-2"
                    />
                    <label 
                      htmlFor={`answer-${answer.id}`} 
                      className={`flex items-center ${
                        isWrongSelection ? 'text-red-500 line-through' : 'text-[#828282]'
                      }`}
                    >
                      {answer.name}
                      {isSubmitted && (
                        <>
                          {isCorrect && (
                            <span className="ml-2 text-green-500">
                              <IoIosCheckmarkCircle className="text-green-500" />
                            </span>
                          )}
                          {isWrongSelection && (
                            <span className="ml-2 text-red-500">
                              <IoIosCloseCircle className="text-red-500" />
                            </span>
                          )}
                        </>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>

            {!submittedAnswers[quiz.id] ? (
              <div className="relative">
                <button
                  onClick={() => handleSubmitAnswer(quiz.id)}
                  disabled={!userAnswers[quiz.id] || submittingQuiz === quiz.id}
                  className={`mt-4 text-[10px] py-2 px-4 rounded-full border relative overflow-hidden ${
                    userAnswers[quiz.id] && submittingQuiz !== quiz.id
                      ? "bg-primary text-white border-primary" 
                      : "border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed"
                  }`}
                >
                  {submittingQuiz === quiz.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Answer"
                  )}
                </button>
                
                {/* Fireworks Spark Animation */}
                {showSparkAnimation === quiz.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-20px)`,
                          animation: `spark-${i} 2s ease-out forwards`,
                        }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`spark-${i}`}
                        className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45 + 15}deg) translateY(-15px)`,
                          animation: `spark-small-${i} 2s ease-out forwards`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 text-[10px] flex items-center">
                {quizResults[quiz.id]?.isCorrect ? (
                  <div className="text-green-500 flex items-center">
                    <IoIosCheckmarkCircle className="mr-1" />
                    Correct! Well done!
                  </div>
                ) : (
                  <div className="text-red-500 flex items-center">
                    <IoIosCloseCircle className="mr-1" />
                    Incorrect. Check the correct answer above.
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {/* Quiz Form Modal */}
      <Modal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        title={selectedQuiz ? "Edit Quiz" : "Create New Quiz"}
      >
        <QuizForm
          quiz={selectedQuiz}
          onSave={handleQuizSave}
          onCancel={() => setShowQuizModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-[#828282] text-[12px]">Are you sure you want to delete this quiz?</p>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="text-[#828282] text-[10px] py-2 px-4 rounded-full border border-[#EDEDED]"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDeleteQuiz}
              className="text-[#FA5252] text-[10px] py-2 px-4 rounded-full border border-[#FA5252]"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Score Animation Modal */}
      <Modal
        isOpen={showScoreAnimation}
        onClose={closeScoreAnimation}
        title="Week Quiz Results"
      >
        <div className="text-center py-8 space-y-6">
          <div className="animate-bounce">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {weekScore.correct}/{weekScore.total}
            </div>
            <div className="text-[#828282] text-[14px] mt-2">
              {Math.round((weekScore.correct / weekScore.total) * 100)}% Score
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-[18px] font-bold text-[#333333]">
              {getScoreMessage()}
            </div>
            <div className="text-[#828282] text-[12px]">
              You answered {weekScore.correct} out of {weekScore.total} questions correctly
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                (weekScore.correct / weekScore.total) * 100 >= 80 ? 'bg-green-500' :
                (weekScore.correct / weekScore.total) * 100 >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(weekScore.correct / weekScore.total) * 100}%` }}
            ></div>
          </div>

          <button
            onClick={closeScoreAnimation}
            className="mt-6 bg-primary text-white text-[12px] py-2 px-6 rounded-full hover:bg-primary/90 transition-colors"
          >
            Continue Learning
          </button>
        </div>
      </Modal>
    </div>
  );
}