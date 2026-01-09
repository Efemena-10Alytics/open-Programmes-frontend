"use client";
import React, { useState, useEffect } from "react";

interface CardProps {
  number: number;
  text: string;
}

const Card: React.FC<CardProps> = ({ number, text }) => (
  <div className="bg-white flex flex-col justify-center items-center lg:w-[142px] h-[90px] lg:h-[133px] rounded-[24px] border-b-[3px] border-primary shadow-md">
    <span className="text-[30px] lg:text-[48px] font-bold">{number}</span>
    <span className="text-[14px] lg:text-[20px] font-light">{text}</span>
  </div>
);

const EventCountdown: React.FC = () => {
  const targetDate = new Date("2024-07-27T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 lg:flex  items-center gap-3">
      <Card number={timeLeft.days} text="Days" />
      <Card number={timeLeft.hours} text="Hours" />
      <Card number={timeLeft.minutes} text="Minutes" />
      <Card number={timeLeft.seconds} text="Seconds" />
    </div>
  );
};

export default EventCountdown;
