import { useState } from "react";
import { Quiz } from "../../types";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

interface QuizFormProps {
  quiz?: Quiz | null;
  onSave: (data: { question: string; answers: { name: string; isCorrect: boolean }[] }) => void;
  onCancel: () => void;
}

export default function QuizForm({ quiz, onSave, onCancel }: QuizFormProps) {
  const [question, setQuestion] = useState(quiz?.question || "");
  const [answers, setAnswers] = useState<{ id?: string; name: string; isCorrect: boolean }[]>(
    quiz?.answers.map((a: { id: any; name: any; isCorrect: any; }) => ({ id: a.id, name: a.name, isCorrect: a.isCorrect })) || [
      { name: "", isCorrect: false },
      { name: "", isCorrect: false }
    ]
  );

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].name = value;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index
    }));
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { name: "", isCorrect: false }]);
  };

  const removeAnswer = (index: number) => {
    if (answers.length <= 2) return;
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      alert("Question is required");
      return;
    }

    if (answers.some(a => !a.name.trim())) {
      alert("All answers must have text");
      return;
    }

    if (!answers.some(a => a.isCorrect)) {
      alert("At least one correct answer is required");
      return;
    }

    onSave({
      question,
      answers
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="question" className="text-[#333333] text-[12px] font-medium block mb-2">
          Question
        </label>
        <input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
          required
          className="w-full border border-[#EDEDED] rounded-[5px] p-2 text-[12px] focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-[#333333] text-[12px] font-medium block mb-2">Answers</label>
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                value={answer.name}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
                required
                className="flex-1 border border-[#EDEDED] rounded-[5px] p-2 text-[12px] focus:outline-none focus:border-primary"
              />
              <div className="flex items-center">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={answer.isCorrect}
                  onChange={() => handleCorrectAnswerChange(index)}
                  className="h-4 w-4 text-primary border-primary focus:ring-primary"
                />
                <span className="text-[10px] text-[#828282] ml-1">Correct</span>
              </div>
              {answers.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeAnswer(index)}
                  className="text-[#FA5252] text-[10px] flex items-center"
                >
                  <IoIosRemove /> Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAnswer}
          className="mt-3 text-primary text-[10px] py-1 px-3 rounded-full border border-primary flex items-center w-fit"
        >
          <IoIosAdd className="mr-1" /> Add Answer
        </button>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button 
          type="button" 
          onClick={onCancel}
          className="text-[#828282] text-[10px] py-2 px-4 rounded-full border border-[#EDEDED]"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="bg-primary text-white text-[10px] py-2 px-4 rounded-full border border-primary"
        >
          Save
        </button>
      </div>
    </form>
  );
}