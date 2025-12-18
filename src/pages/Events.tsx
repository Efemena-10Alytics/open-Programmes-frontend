import { MdLocationOn } from "react-icons/md";
import Button from "../components/utilities/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import EventCountdown from "../components/EventCountdown";
import EventPanelists from "../components/EventPanelists";
import Link from "next/link";

interface FigureProps {
  text: string;
  number: number | string;
}

const Figure = ({ text, number }: FigureProps) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center lg:items-center gap-2 relative w-[180px] lg:w-[226px]">
      <span className="text-[68px] lg:text-[96px] font-bold leading-[80px] lg:leading-[150px]">
        {number}
      </span>
      <span className="lg:text-[20px] font-light">{text}</span>
      <span className="flex absolute top-0 right-0 bg-[#FFCAC9] h-[31px] w-[31px]"></span>
    </div>
  );
};

const Events = () => {
  const styles = {
    button1: {
      backgroundImage: "linear-gradient(to right,  #eb605e, #CA2421)",
    },
    button2: {
      backgroundImage: "linear-gradient(to right,  #242020, #000000)",
    },
  };

  return (
    <div className="w-11/12 mx-auto mt-[40px] lg:mt-0">
      <div className="relative h-[340px] mb-[120px]">
        <div className="absolute text-white flex flex-col gap-5 justify-center items-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <div className="lg:w-[45%]">
            <h1 className="text-[28px] lg:text-[32px] text-center  font-bold">
              Unlock Your Potential:
            </h1>
            <p className="text-[14px] lg:text-[24px] lg:leading-8 text-center w-[97%] ">
              Become a Tech Talent by Harnessing the Power of Analytics and AI
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 text-[14px] w-[95%] lg:full">
            <img src="svg/calendar5.svg" alt="" />
            <span>27th July Saturday</span>
            <div className="flex flex-wrap justify-center items-center">
              <MdLocationOn className="text-primary text-lg" />
              <span className="">
                Pistis Annex, 3 Remi Olowude St, Lekki Phase I, Lekki 105102,
                Lagos
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1 lg:mt-6">
            <Link href="https://chat.whatsapp.com/HalU11DqhAxJ9dLLfUCOUd">
              <button
                style={styles.button1}
                className="text-[14px] font-bold w-[172px] py-3 rounded-[10px]"
              >
                Register for FREE
              </button>
            </Link>
            <a href="#countdown">
              <button
                style={styles.button2}
                className="text-[14px] font-bold w-[172px] py-3 rounded-[10px]"
              >
                View Details
              </button>
            </a>
          </div>
        </div>
        <img
          src="/img/blog-header.png"
          alt=""
          className="w-full h-[340px] object-cover absolute top-0 right-0 rounded-[18px]"
        />
        <div className="bg-[#00000099] h-full w-full absolute top-0 right-0 z-40 rounded-[18px]"></div>
      </div>

      <div className="relative lg:h-[340px] flex flex-wrap lg:flex-nowrap gap-10 lg:gap-0 items-center justify-between lg:mt-[340px] mb-[60px] lg:pr-[3%]">
        <img
          src="img/img2.png"
          alt=""
          className="lg:relative -top-[140px] lg:flex-[0.3] h-[400px] lg:h-auto order-2 lg:order-1"
        />
        <div id="countdown" className="lg:flex-[0.3] order-1 lg:order-2">
          <div className="flex items-center justify-between gap-2 lg:mb-5">
            <h2 className="text-[#333333] text-[32px] lg:text-[32px] leading-[40px] lg:leading-[45px] font-semibold lg:font-bold lg:w-[65%]">
              Count Every Second Until The Event.
            </h2>
            <Link href="https://chat.whatsapp.com/HalU11DqhAxJ9dLLfUCOUd">
              <Button
                text="Register for FREE"
                classNames="font-bold lg:text-[12px] px-5 hidden lg:flex"
              />
            </Link>
          </div>

          <EventCountdown />
          <Button
            text="Register for FREE"
            classNames="font-bold text-[14px] px-5 block lg:hidden mt-4"
          />
          <img
            src="/img/bg1.png"
            alt=""
            className="w-full h-[340px] object-cover absolute lg:top-0 top-[332px] right-0 rounded-[18px] -z-10"
          />
        </div>
      </div>

      <section className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-16 mb-[100px]">
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="text-primary font-light">Introduction</span>
            <div className="h-1 border-b border-primary w-[132px]"></div>
          </div>
          <h1 className="text-[32px] text-[#333333] font-semibold leading-[40px] mb-4">
            Becoming a Tech Talent by Harnessing the Power of Analytics and AI
          </h1>
          <p className="text-[#828282] font-light leading-[20px] mb-4">
            Are you ready to dive into the exciting world of technology,
            analytics, and artificial intelligence? Join us for an exclusive
            event where industry experts will guide you on your journey to
            becoming a tech talent. Whether you're a seasoned professional or
            just starting, this event is designed to equip you with the skills
            and knowledge needed to excel in the tech industry.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#828282] mb-2">
            <div className="flex items-center gap-2">
              <img src="svg/calendar5.svg" alt="" />
              <span>27th July Saturday</span>
            </div>
            <div className="flex lg:items-center gap-2">
              <MdLocationOn className="text-primary text-lg" />
              <span className="">
                Pistis Annex, 3 Remi Olowude St, Lekki Phase I, Lekki 105102,
                Lagos
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#828282]">
            <img src="svg/timer3.svg" alt="" />
            <span>1:00 AM to 1:00 PM (2 Hours Session)</span>
            <div className="flex items-center gap-2">
              <img src="svg/ticket.svg" alt="" className="h-3" />
              <span className="">Free (Registration is Compulsory)</span>
            </div>
          </div>
          <a href="#panelist">
            <Button
              text="Discover More"
              classNames="mt-7 lg:text-[14px] font-bold"
            />
          </a>
        </div>
        <img src="img/speaker.png" alt="" className="lg:h-[600px]" />
      </section>

      <div className="lg:flex grid grid-cols-2 gap-5 lg:gap-0 flex-wrap items-center justify-between text-[#333333] mb-[80px]">
        <Figure text="Expert Speakers" number={5} />
        <Figure text="Technology Sessions" number={3} />
        {/* <Figure text="Golden Sponsors" number={50} /> */}
        <Figure text="Events Attendees" number={"3k"} />
      </div>

      <EventPanelists />

      <section className="flex justify-between items-center gap-10 mb-[80px]">
        <div className="flex flex-col lg:flex-[0.35] gap-3">
          <div className="flex items-center gap-1 mb-4">
            <span className="text-primary font-light">What to Expect</span>
            <div className="h-1 border-b border-primary w-[132px]"></div>
          </div>
          <div className="flex  gap-3 items-center">
            <div className="w-[4px] h-[350px] bg-[#D9D9D9]">
              <div className="w-[4px] h-[76px] bg-primary"></div>
            </div>
            <div className="flex flex-col gap-7">
              <div>
                <h4 className="text-[#333333] font-semibold mb-1">
                  In-Depth Sessions:
                </h4>
                <p className="text-[#828282] text-[14px] font-light leading-[18px]">
                  Engage in insightful discussions and presentations on the
                  latest trends in analytics and AI.
                </p>
              </div>
              <div>
                <h4 className="text-[#333333] font-semibold mb-1">
                  Expert Speakers
                </h4>
                <p className="text-[#828282] text-[14px] font-light leading-[18px]">
                  Engage in insightful discussions and presentations on the
                  latest trends in analytics and AI.
                </p>
              </div>
              <div>
                <h4 className="text-[#333333] font-semibold mb-1">
                  Networking Opportunities
                </h4>
                <p className="text-[#828282] text-[14px] font-light leading-[18px]">
                  Connect with like-minded individuals and expand your
                  professional network.
                </p>
              </div>
              <div>
                <h4 className="text-[#333333] font-semibold mb-1">
                  Interactive Q&A
                </h4>
                <p className="text-[#828282] text-[14px] font-light leading-[18px]">
                  Get your questions answered by experts during dedicated Q&A
                  sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="img/img4.png"
          alt=""
          className="flex-[0.65] cursor-pointer hidden lg:inline-block"
        />
      </section>

      <div className="relative h-[300px] mb-[100px]">
        <div className="absolute text-white flex flex-col gap-5 justify-center items-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <div className="w-[95%] lg:w-[45%]">
            <h1 className="text-[28px] lg:text-[32px] text-center font-bold mb-2">
              Are You Ready To Join?
            </h1>
            <p className="text-[14px] lg:text-[12px] leading-[16px] text-center">
              Some workshops or special sessions may have an additional fee.
              Check the detailed session descriptions on our website or contact
              our registration team for specific information.{" "}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Link href="https://chat.whatsapp.com/HalU11DqhAxJ9dLLfUCOUd">
              <button
                style={styles.button1}
                className="text-[14px] font-bold w-[172px] py-3 rounded-[10px]"
              >
                Register for FREE
              </button>
            </Link>
          </div>
        </div>
        <img
          src="/img/blog-header.png"
          alt=""
          className="w-full h-[300px] object-cover absolute top-0 right-0 rounded-[18px]"
        />
        <div className="bg-[#00000099] h-full w-full absolute top-0 right-0 z-40 rounded-[18px]"></div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap items-end gap-6 mb-[100px]">
        <div className="grid grid-cols-2 gap-10 items-center lg:flex-[0.55]">
          <Link href="https://chat.whatsapp.com/HalU11DqhAxJ9dLLfUCOUd">
            <img src="img/ticket1.png" alt="" />
          </Link>

          <Link href="https://chat.whatsapp.com/HalU11DqhAxJ9dLLfUCOUd">
            <img src="img/ticket2.png" alt="" />
          </Link>
        </div>
        <img
          src="img/img3.png"
          alt=""
          className="lg:flex-[0.45] h-[380px] lg:h-auto"
        />
      </div>
    </div>
  );
};

export default Events;
