import Link from "next/link";
import Button from "../components/utilities/Button";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import CourseCard from "../components/utilities/CourseCard";
import { useState } from "react";
import RegistrationForm from "../components/Form";

interface CardProps {
  img: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  mode: string;
}

const Card = ({ img, title, description, date, duration, mode }: CardProps) => {
  return (
    <div className="relative flex flex-col justify-between border border-[#DDDDDD] rounded-[24px] p-[10px]">
      <div className="absolute right-6 top-6 bg-[#FA5252] w-fit flex justify-center items-center text-white text-[12px] lg:text-[14px] px-5 py-[10px] rounded-[48px]">
        Masterclass
      </div>
      <img src={img} alt="" className="h-[267px] object-cover rounded-[24px]" />
      <div className="flex items-center text-[12px] text-[#333333] gap-2 my-4 pb-4 border-b border-[#DCDCDC]">
        <img src="/svg/timer3.svg" alt="" />
        <span>{duration}</span>
        <img src="/svg/calendar5.svg" alt="" />
        <span>{date}</span>
        <img src="/svg/play3.svg" alt="" />
        <span> {mode}</span>
      </div>
      <div>
        <h3 className="text-[#020202] text-[20px] font-bold mt-2">{title}</h3>
        <p className="text-[14px] text-[#5F5B5B] font-light leading-5 mb-4">
          {description}
        </p>

        <Link href="#">
          <Button
            text="Register"
            classNames="w-fit lg:w-[126px] lg:text-[12px]"
          />
        </Link>
      </div>

      <div></div>
    </div>
  );
};

const TechXplore = () => {
  const styles = {
    button: {
      backgroundImage: "linear-gradient(to right,  #eb605e, #CA2421)",
    },
  };

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
   window.location.replace('https://docs.google.com/forms/d/1Tzwoj7IOHlIT8uwQe1Snfxwdmvsut0L-xcERfNy7qpQ/viewform');
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="w-11/12 mx-auto mt-[40px] lg:mt-0">
      <div className="relative h-[410px] mb-[120px]">
        <div className="absolute text-white flex flex-col gap-3 justify-center items-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <h1 className="text-[38px] lg:text-[45px] text-center lg:w-[55%] font-bold">
            Tech Xplore
          </h1>
          <p className="leading-[21px] text-[14px] lg:text-[16px] text-center w-[97%] lg:w-[60%]">
            Our TechXplore session is designed to equiop you with the knownledge
            and skills needed to thrive in today’s competive landscape.
          </p>
          <button
            style={styles.button}
            className="text-[14px] font-bold px-10 py-3 rounded-[10px]"
            onClick={()=> {window.location.replace('https://docs.google.com/forms/d/1Tzwoj7IOHlIT8uwQe1Snfxwdmvsut0L-xcERfNy7qpQ/viewform');}}
          >
            Join Now
          </button>
          <img src="/svg/stars.svg" alt="" />

          <span className="text-[14px] lg:text-[16px]">
            4.5 ratings (Over 1000+ students)
          </span>
          <img src="img/people.png" alt="" className="h-8 lg:h-auto" />
        </div>
        <img
          src="/img/blog-header.png"
          alt=""
          className="w-full h-[410px] object-cover absolute top-0 right-0 rounded-[18px]"
        />
        <div className="bg-[#00000099] h-full w-full absolute top-0 right-0 z-40 rounded-[18px]"></div>
      </div>

      <section className="mb-[120px]">
        <Tabs className="xplore relative">
          <TabList className="h-[45px] w-[370px] absolute lg:right-0 -top-[60px] lg:-top-[20px] bg-[#FFEFEF] rounded-[10px] flex justify-end text-[12px] p-1">
            <div className="flex gap-4 w-[500px]">
              <Tab className="flex flex-[0.5] items-center justify-center  outline-none text-[#454545] cursor-pointer">
                <span>Tech Xplore</span>
              </Tab>
              <Tab className="flex flex-[0.5] items-center justify-center  outline-none text-[#454545] cursor-pointer">
                <span>Masterclass</span>
              </Tab>
            </div>
          </TabList>
          <TabPanel>
            <h1 className="text-[24px] text-[#020202] font-bold mb-3">
              Our Popular Online Courses
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card
                img="img/home-img1.png"
                title="Data Analytics"
                description="Master data fundamentals applicable to any industry and learn to make data-driven decisions. From collecting and analyzing data to modeling business scenarios. "
                duration="01 hr 40min"
                date="12 July, 2024"
                mode="Live Class"
              />{" "}
              <Card
                img="img/home-img1.png"
                title="Data Analytics"
                description="Master data fundamentals applicable to any industry and learn to make data-driven decisions. From collecting and analyzing data to modeling business scenarios. "
                duration="01 hr 40min"
                date="12 July, 2024"
                mode="Live Class"
              />{" "}
              <Card
                img="img/home-img1.png"
                title="Data Analytics"
                description="Master data fundamentals applicable to any industry and learn to make data-driven decisions. From collecting and analyzing data to modeling business scenarios. "
                duration="01 hr 40min"
                date="12 July, 2024"
                mode="Live Class"
              />
            </div>
          </TabPanel>

          <TabPanel className="lg:mt-5 mt-2">
            <div className=" grid grid-cols-4 gap-4">Masterclass</div>
          </TabPanel>
        </Tabs>
      </section>
      <RegistrationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        programType="techxplore"
      />
    </div>
  );
};

export default TechXplore;
