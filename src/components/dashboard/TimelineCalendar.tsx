import React, { useState } from "react";

interface LabelData {
  [date: string]: string;
}

interface TimelineCalendarProps {
  courseId: string; // Define the courseId prop
}

const TimelineCalendar: React.FC<TimelineCalendarProps> = ({ courseId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mocked label data
  const labelData: LabelData = {
    "2024-06-23": "Data Analytics Lesson",
    "2024-06-24": "Data Analytics Mentorship Session",
    "2024-06-25": "Data Analytics Quiz",
    "2024-06-26": "Data Analytics Lesson",
    "2024-07-04": "Data Analytics Break",
    "2024-07-05": "Data Analytics Live Class",
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1)
    );
  };

  return (
    <div className="custom-calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Previous Month</button>
        <h2>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={() => changeMonth(1)}>Next Month</button>
      </div>
      <div className="calendar-body">
        {getDaysInMonth(currentMonth).map((date) => (
          <div key={date.toString()} className="calendar-row">
            <div className="date-column">
              <span className="date">{date.getDate()}</span>
              <span className="day-name">{getDayName(date)}</span>
            </div>
            <span className="label">{labelData[formatDate(date)] || ""}</span>
          </div>
        ))}
      </div>
      <div className="course-id-display">
        <strong>Course ID:</strong> {courseId}
      </div>
    </div>
  );
};

export default TimelineCalendar;