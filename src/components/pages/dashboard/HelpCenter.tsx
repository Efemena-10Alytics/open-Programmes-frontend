import React from "react";

interface CardProps {
  img: string;
  text: string;
  labels: string[];
}
const Card = ({ img, text, labels }: CardProps) => {
  return (
    <div className="bg-white border flex flex-col gap-2 border-[#D8D8D8] rounded-[10px] p-5 text-[#333333]">
      <div className="bg-[#FFCAC9] h-[40px] w-[40px] flex justify-center items-center rounded-full mb-2">
        <img src={img} alt="" />
      </div>
      <h2 className="font-bold">{text}</h2>
      <div className="flex items-center gap-2">
        {labels.map((label, i) => {
          return (
            <div key={i} className="bg-[#E4E4E4] text-[10px] px-2 py-1">
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HelpCenter = () => {
  return (
    <div>
      <section className="bg-black flex justify-between items-center mx-auto mt-2 mb-[30px] text-white rounded-[14px]">
        <div className="flex flex-col gap-4 pt-[40px] pl-[40px]">
          <h1 className="text-[32px] font-bold leading-[40px]">Help Center</h1>
          <p className="text-[20px] font-light leading-[25px]">
            Advice and answers from the 10Alytics Business team.
          </p>
          <button
            className={
              "w-[172px] bg-white rounded-[10px] text-black font-bold p-3"
            }
          >
            Chat With Support
          </button>
        </div>
        <img src="/img/random3.png" alt="" className="pt-[15px] pr-[15px]" />
      </section>

      <section className="mb-24">
        <div className="grid grid-cols-4 gap-y-5 gap-x-2">
          <Card
            img="/svg/mail.svg"
            text="Send us a Mail"
            labels={["Cohort", "Inquiries", "Enrollment"]}
          />
          <Card
            img="/svg/youtube.svg"
            text="Free Online Resources"
            labels={["How-to", "Masterclass", "Guides"]}
          />
          <Card
            img="/svg/users3.svg"
            text="Join Community"
            labels={["Share", "Discussion", "Network"]}
          />
          <Card
            img="/svg/user.svg"
            text="Training Advisory"
            labels={["Cohort", "Lessons", "Assignment"]}
          />
          <Card
            img="/svg/card.svg"
            text="Payment Concerns"
            labels={["Fee", "Payment Error", "Installment"]}
          />
          <Card
            img="/svg/note3.svg"
            text="Guides"
            labels={["Ebook", "Cheat sheet", "Resources"]}
          />
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
