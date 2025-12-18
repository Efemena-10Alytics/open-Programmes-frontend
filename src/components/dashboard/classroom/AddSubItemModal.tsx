import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";

interface AddSubItemModalProps {
  topicId: string;
  cohortCourseId: string;
  onClose: () => void;
  onSuccess: () => void;
}

type ItemType = "assignment" | "material" | "recording";

interface QuizQuestion {
  id: string;
  question: string;
  points: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

const AddSubItemModal: React.FC<AddSubItemModalProps> = ({
  topicId,
  cohortCourseId,
  onClose,
  onSuccess,
}) => {
  const [itemType, setItemType] = useState<ItemType>("assignment");
  const [isQuiz, setIsQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // Assignment specific
    instructions: "",
    dueDate: "",
    points: "",
    // Material specific
    fileUrl: "",
    fileType: "pdf",
    // Recording specific
    recordingUrl: "",
  });

  const queryClient = useQueryClient();

  const addSubItemMutation = useMutation({
    mutationFn: async () => {
      let dataToSend: any = {
        title: formData.title,
        description: formData.description,
      };

      if (itemType === "assignment" && isQuiz) {
      // For quiz assignments, use the same pattern but call the quiz endpoint
      const quizData = {
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        instructions: formData.instructions?.trim() || "",
        dueDate: formData.dueDate || null,
        points: formData.points ? parseInt(formData.points) : 100,
        classroomTopicId: topicId,
        questions: quizQuestions.map(q => ({
          question: q.question.trim(),
          points: q.points || 1,
          options: q.options.map(opt => ({
            text: opt.text.trim(),
            isCorrect: opt.isCorrect
          }))
        }))
      };

      console.log("Creating quiz with data:", quizData);
      const response = await api.post("/api/assignments/create-quiz", quizData);
      return response.data;
    }

      // Existing logic for other types
      switch (itemType) {
        case "assignment":
          dataToSend = {
            ...dataToSend,
            instructions: formData.instructions,
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
            points: formData.points ? parseInt(formData.points) : undefined,
          };
          break;
        case "material":
          dataToSend = {
            ...dataToSend,
            fileUrl: formData.fileUrl,
            fileType: formData.fileType,
          };
          break;
        case "recording":
          dataToSend = {
            ...dataToSend,
            recordingUrl: formData.recordingUrl,
          };
          break;
      }

      const response = await api.post("/api/classroom/items", {
        topicId,
        type: itemType,
        data: dataToSend,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manageTopics"] });
      queryClient.invalidateQueries({ queryKey: ["classroomTopics"] });
      onSuccess();
    },
  });

  // Quiz question management
  const addQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: Date.now().toString(),
        question: "",
        points: 1,
        options: [
          { id: Date.now().toString() + "-1", text: "", isCorrect: false },
          { id: Date.now().toString() + "-2", text: "", isCorrect: false },
          { id: Date.now().toString() + "-3", text: "", isCorrect: false },
          { id: Date.now().toString() + "-4", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuizQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, field: string, value: any) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value,
    };
    setQuizQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
    setQuizQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate quiz questions
    if (isQuiz) {
      if (quizQuestions.length === 0) {
        alert("Please add at least one question to the quiz");
        return;
      }

      for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        if (!question.question.trim()) {
          alert(`Question ${i + 1} is required`);
          return;
        }
        if (question.options.some(opt => !opt.text.trim())) {
          alert(`All options for question ${i + 1} are required`);
          return;
        }
        if (!question.options.some(opt => opt.isCorrect)) {
          alert(`Please select a correct answer for question ${i + 1}`);
          return;
        }
      }
    }

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    addSubItemMutation.mutate();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      instructions: "",
      dueDate: "",
      points: "",
      fileUrl: "",
      fileType: "pdf",
      recordingUrl: "",
    });
    setQuizQuestions([]);
    setIsQuiz(false);
  };

  const handleTypeChange = (newType: ItemType) => {
    setItemType(newType);
    resetForm();
  };

  const getItemTypeDisplay = (type: ItemType) => {
    switch (type) {
      case "assignment":
        return "📝 Assignment";
      case "material":
        return "📎 Material";
      case "recording":
        return "🎥 Recording";
      default:
        return type;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Item to Topic
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose the type of content you want to add
          </p>
        </div>

        {/* Item Type Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {(["assignment", "material", "recording"] as ItemType[]).map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    itemType === type
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {type === "assignment" && "📝"}
                    {type === "material" && "📎"}
                    {type === "recording" && "🎥"}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {getItemTypeDisplay(type)}
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Common Fields */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder={`Enter ${itemType} title...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add a description (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Quiz Toggle for Assignments */}
          {itemType === "assignment" && (
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="isQuiz"
                checked={isQuiz}
                onChange={(e) => setIsQuiz(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="isQuiz" className="text-sm font-medium text-gray-700">
                This is a quiz assignment
              </label>
              {isQuiz && (
                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  🧩 Quiz Mode
                </span>
              )}
            </div>
          )}

          {/* Type-Specific Fields */}
          {itemType === "assignment" && !isQuiz && (
            <>
              <div>
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  rows={3}
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder="Assignment instructions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="points"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    min="0"
                    value={formData.points}
                    onChange={(e) =>
                      setFormData({ ...formData, points: e.target.value })
                    }
                    placeholder="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Quiz Questions Section */}
          {itemType === "assignment" && isQuiz && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {quizQuestions.length} question{quizQuestions.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 flex items-center space-x-1"
                  >
                    <span>+</span>
                    <span>Add Question</span>
                  </button>
                </div>
              </div>

              {quizQuestions.map((question, questionIndex) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      Question {questionIndex + 1}
                    </h4>
                    {quizQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question Text *
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
                        placeholder="Enter the question..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Points
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={question.points}
                          onChange={(e) => updateQuestion(questionIndex, "points", parseInt(e.target.value) || 1)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options (Select the correct answer) *
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={option.id} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                            <input
                              type="radio"
                              name={`correct-answer-${questionIndex}`}
                              checked={option.isCorrect}
                              onChange={() => setCorrectAnswer(questionIndex, optionIndex)}
                              className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                              required
                            />
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => updateOption(questionIndex, optionIndex, "text", e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              required
                            />
                            {option.isCorrect && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {quizQuestions.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-4xl mb-4">🧩</div>
                  <p className="text-gray-500 mb-2">No questions added yet.</p>
                  <p className="text-sm text-gray-400 mb-4">Add questions to create your quiz</p>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium"
                  >
                    Add Your First Question
                  </button>
                </div>
              )}

              {/* Quiz Assignment Settings */}
              {quizQuestions.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Quiz Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="quizPoints"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Total Quiz Points
                      </label>
                      <input
                        type="number"
                        id="quizPoints"
                        min="0"
                        value={formData.points}
                        onChange={(e) =>
                          setFormData({ ...formData, points: e.target.value })
                        }
                        placeholder="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quizDueDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Due Date
                      </label>
                      <input
                        type="datetime-local"
                        id="quizDueDate"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, dueDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Existing material and recording fields */}
          {itemType === "material" && (
            <>
              <div>
                <label
                  htmlFor="fileUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File URL *
                </label>
                <input
                  type="url"
                  id="fileUrl"
                  required
                  value={formData.fileUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, fileUrl: e.target.value })
                  }
                  placeholder="https://example.com/document.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="fileType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Type
                </label>
                <select
                  id="fileType"
                  value={formData.fileType}
                  onChange={(e) =>
                    setFormData({ ...formData, fileType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Word Document</option>
                  <option value="docx">Word Document (DOCX)</option>
                  <option value="ppt">PowerPoint</option>
                  <option value="pptx">PowerPoint (PPTX)</option>
                  <option value="xls">Excel</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="zip">ZIP Archive</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {itemType === "recording" && (
            <div>
              <label
                htmlFor="recordingUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Recording URL *
              </label>
              <input
                type="url"
                id="recordingUrl"
                required
                value={formData.recordingUrl}
                onChange={(e) =>
                  setFormData({ ...formData, recordingUrl: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports YouTube, Vimeo, or any direct video link
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addSubItemMutation.isPending || !formData.title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addSubItemMutation.isPending
                ? "Adding..."
                : `Add ${isQuiz ? 'Quiz' : getItemTypeDisplay(itemType)}`}
            </button>
          </div>
        </form>

        {addSubItemMutation.isError && (
          <div className="px-6 pb-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">
                Error:{" "}
                {addSubItemMutation.error instanceof Error
                  ? addSubItemMutation.error.message
                  : "Failed to add item"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSubItemModal;