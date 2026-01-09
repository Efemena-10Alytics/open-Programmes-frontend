"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import CoursesSection from "../CoursesSection";
import FAQsSection from "../FAQsSection";
import HomeSection from "../HomeSection";
import FAQCard from "../static/FAQCard";
import WordAnimation from "../Texter";
import AnimatedText from "../Typing";
import Button from "../utilities/Button";
import FloatingBtn from "../utilities/FloatingBtn";
import ScrollingLogos from "../ScrollingLogos";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import TestimonialSection from "../TestimonialSection";
import { TechElevatorHomeSection } from "../TechElevatorComponents";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FreeCourseData {
  name: string;
  email: string;
  phone: string;
}

const Popup = ({ isOpen, onClose }: PopupProps) => {
  const router = useRouter();
  const baseURL = config.url.API_URL;

  const applyForFreeCourse = async (
    payLoad: FreeCourseData
  ): Promise<Response> => {
    console.log("PD", payLoad);
    const response = await axios.post<Response>(
      `${baseURL}/api/free-course/apply`,
      payLoad
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (data: FreeCourseData) => applyForFreeCourse(data),
    onSuccess: () => {
      localStorage.setItem("hasFilledForm", "true");
      router.push("/free-courses");
    },
    onError: (error: AxiosError) => {
      console.error("Initiation failed:", error);
    },
  });

  const styles = {
    box: {
      backgroundImage: "linear-gradient(to right, #CA2421, #641210)",
    },
    button: {
      backgroundImage: "linear-gradient(to bottom, #2684FF, #174F99)",
    },
  };

  const inputClassNames =
    "bg-[#FFFFFF] py-3 px-5 w-full text-[#828282] text-[14px]  rounded-[4px] \
    placeholder:text-[#828282] placeholder:text-[13px] focusl:outline-green-200 outline-0";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            style={styles.box}
            className="text-white rounded-[24px] p-8  lg:w-[60%] m-4 z-[100]"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="z-50 text-gray-500 hover:text-gray-700"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4 relative">
              <div className="flex flex-col gap-3 lg:max-w-[45%]">
                <h2 className="text-[24px] font-bold leading-[31px]">
                  Unlock Your Free Crash Course in Data Science
                </h2>
                <p>
                  Kickstart your data career with our comprehensive crash
                  course.
                </p>
                <Formik
                  initialValues={{ name: "", email: "", phone: "" }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Name is required"),
                    phone: Yup.string().required("Phone number is required"),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    mutation.mutate(values);
                    // router.push("/free-courses");
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <div>
                          <Field
                            name="name"
                            type="text"
                            className={inputClassNames}
                            placeholder="Your Name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-xs text-[#FFFFFF] mb-1"
                          />
                        </div>
                        <div>
                          <Field
                            name="email"
                            type="email"
                            className={inputClassNames}
                            placeholder="Email Address"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-xs text-[#FFFFFF] mb-1"
                          />
                        </div>
                        <div>
                          <Field
                            name="phone"
                            type="text"
                            className={inputClassNames}
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-xs text-[#FFFFFF] mb-1"
                          />
                        </div>
                      </div>
                      <button
                        className="w-fit rounded-full text-[15px] font-bold px-6 py-3"
                        style={styles.button}
                        type="submit"
                      >
                        {isSubmitting ? "Please wait..." : "Unlock Course NOW"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <img
                src="img/popup-img.png"
                alt=""
                className="hidden lg:flex-[0.35] absolute -top-[170px] right-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Updated popup component for 10alytics announcement
const AnnouncementPopup = ({ isOpen, onClose }: PopupProps) => {
  const styles = {
    box: {
      backgroundImage: "linear-gradient(to right, #2684FF, #174F99)",
    },
    button: {
      backgroundImage: "linear-gradient(to bottom, #CA2421, #641210)",
    },
  };

  const handleVisitNewSite = () => {
    window.open("https://10alyticsbusiness.ca", "_blank");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div
            style={styles.box}
            className="text-white rounded-[24px] p-8 lg:w-[50%] m-4 z-[10000]"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="z-50 text-white hover:text-gray-300"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center text-center gap-6 mt-4">
              <div className="bg-white p-4 rounded-full">
                <img 
                  src="svg/announcement-icon.svg" 
                  alt="Announcement" 
                  className="h-12 w-12"
                  onError={(e) => {
                    // Fallback if icon doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              <h2 className="text-[28px] font-bold leading-[36px]">
                We're Evolving Together!
              </h2>
              
              <div className="flex flex-col gap-4">
                <p className="text-[18px] leading-[26px]">
                  <strong>Nebiant Analytics is now part of 10alytics Business!</strong>
                </p>
                <p className="text-[16px] leading-[24px]">
                  We're excited to share that our platform is transitioning to become part of the 
                  10alytics Business family. You'll find the same quality courses with enhanced programs 
                  and expanded learning opportunities on our new platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleVisitNewSite}
                  className="w-full sm:w-fit rounded-full text-[15px] font-bold px-8 py-3 hover:opacity-90 transition-opacity"
                  style={styles.button}
                >
                  Explore New Platform
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-fit rounded-full text-[15px] font-bold px-8 py-3 bg-gray-600 hover:bg-gray-700 transition-colors"
                >
                  Continue with Nebiant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true); // Always open by default

  useEffect(() => {
    const hasFilledForm = localStorage.getItem("hasFilledForm");

    // Only show the form popup if needed, announcement popup is always shown
    if (!hasFilledForm) {
      const formTimer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 5000);

      return () => clearTimeout(formTimer);
    }
  }, []);

  const handleAnnouncementClose = () => {
    setIsAnnouncementOpen(false);
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="mx-auto pt-[20px] lg:pt-[70px] pb-[60px]">
          <div className="flex flex-col lg:flex-row gap-20 justify-between pl-[4%] pr-[3%] lg:pr-0">
            <div className="flex flex-col gap-3 lg:gap-6 lg:flex-[0.5]">
              <h1 className="text-dark text-[30px] lg:text-[45px] font-bold leading-[40px] lg:leading-[60px]">
                Become Employable in This 5th Industrial Revolution with Data &
                AI Skills:{" "}
                <span className="text-primary" style={{ display: "inline" }}>
                  <WordAnimation />
                </span>
              </h1>
              <p className="text-dark lg:text-[20px] leading-[24px] lg:leading-[26px]">
                From Data Analytics to AI, our Certification Programs get you
                hired after course completion. Explore our courses, start
                learning, become certified and GET HIRED
              </p>

              <Link href="/courses">
                <Button
                  text="Explore Courses"
                  classNames="w-fit lg:w-[172px]"
                />
              </Link>
            </div>
            <div className="relative w-full lg:flex-[0.5] pr-[2%]">
              <AnimatedText />
              <img
                src="svg/dashed-circle.svg"
                alt=""
                className="rotating-svg absolute left-[38px] lg:left-[30px] -top-[33px] lg:-top-[55px] -z-10 w-[60%] lg:w-auto"
              />
              <img
                src="svg/dashed-box.svg"
                alt=""
                className="absolute left-[50px] lg:left-[60px] top-[40px] lg:top-[65px] -z-10  w-[70%] lg:w-auto"
              />
              <img
                src="img/hero-img.png"
                alt=""
                className="z-50 w-[90%] lg:w-auto mx-auto lg:mx-0"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#FFF4F4] py-20">
          <div className=" w-11/12 mx-auto flex flex-col lg:flex-row gap-10">
            <div className="flex-[0.35]">
              <h1 className="text-[22px] lg:text-[37px] font-bold leading-[28px] lg:leading-[45px]">
                Learn High Income Skills at{" "}
                <span className="text-primary"> nebiant</span> to Increase Your
                Earning Powers
              </h1>
            </div>
            <div className="flex flex-col items-start gap-4 flex-[0.65]">
              <div className="flex gap-4">
                <img src="svg/arrow.svg" alt="" className="flex-[0.02]" />
                <p className="flex-[0.98]">
                  Nebiant analytics is dedicated to empowering professionals
                  with career defining skills by providing best-in-class Data
                  and AI skills.
                </p>
              </div>
              <div className="flex gap-4">
                <img src="svg/arrow.svg" alt="" className="flex-[0.02]" />
                <p className="flex-[0.98]">
                  You learn the skills to land the best jobs across the globe as
                  a Data Analyst, Business Analyst and Data Scientist
                </p>
              </div>
              <div className="flex gap-4 mb-6">
                <img src="svg/arrow.svg" alt="" className="flex-[0.02]" />
                <p className="flex-[0.98]">
                  Get your career journey on track to securing a 6-figure tech
                </p>
              </div>
              <Link href="/courses">
                <Button text="Learn More" />
              </Link>
            </div>
          </div>
        </section>
        <TechElevatorHomeSection />
        <HomeSection />

        <CoursesSection />

        <section
          style={{
            backgroundImage: "url('svg/home-img4.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
          className="h-[700px] lg:h-[1000px] pt-[26px]  mt-[80px]"
        >
          <h1 className="w-[90%] lg:w-[44%] mx-auto mt-[60px] lg:mt-0 text-[22px] lg:text-[37px] font-bold leading-[28px] lg:leading-[45px] text-center text-dark mb-3 lg:mb-8">
            Share Your Success On{" "}
            <span className="text-primary"> LINKEDIN.</span> Attract Employers
          </h1>
          <p className="w-[90%] lg:w-[55%] mx-auto text-[18px] lg:text-[24px] text-center text-[#828282] leading-[28px] lg:leading-[30px] mb-10">
            Share your certification of completion on LinkedIn, Twitter, and
            Instagram. Don&apos;t let your achievement go unnoticed!
          </p>
          <div className="text-[#828282] text-[14px] lg:text-[20px] w-11/12 lg:w-full mx-auto lg:mx-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-4 bg-white w-max p-3 rounded-[10px]">
                  <img src="svg/magnet.svg" alt="" className="h-6 lg:h-10" />
                  <span>Attract Employers</span>
                </div>
                <div className="flex items-center gap-4 bg-white w-max p-3 rounded-[10px]">
                  <img
                    src="svg/certificate.svg"
                    alt=""
                    className="h-5 lg:h-8"
                  />
                  <span>
                    Establish expertise in the industry by showcasing your
                    certification
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="flex items-center gap-4 bg-white w-max p-3 rounded-[10px]">
                  <img src="svg/position.svg" alt="" className="h-5 lg:h-10" />
                  <span>Position yourself as a skilled professional</span>
                </div>
                <div className="flex items-center gap-4 bg-white w-max p-3 rounded-[10px]">
                  <img src="svg/chat2.svg" alt="" className="h-5 lg:h-10" />
                  <span>
                    Now you have an edge over other candidates, talk about it
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black text-white mb-[70px] py-[80px] -mt-[10px]">
          <div className="w-11/12 mx-auto">
            <h1 className="lg:w-[74%] mx-auto text-left lg:text-center text-[34px] lg:text-[60px] font-bold leading-[40px] lg:leading-[80px] mb-8">
              Why Nebiant Is The Best Training Program For You.
            </h1>
            <div className=" flex flex-wrap justify-between gap-10 lg:gap-24">
              <div className="flex flex-col gap-6 lg:flex-[0.45]">
                <div>
                  <div className="flex gap-7 items-start">
                    <img
                      src="svg/book.svg"
                      alt=""
                      className="bg-white p-2 rounded-[10px]"
                    />
                    <div>
                      <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] mb-2 lg:mb-4">
                        Expert-Curated, High-Quality Curriculum
                      </h3>
                      <span className="leading-[20px]">
                        You learn with our carefully crafted curriculum designed
                        by the best in the industry
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-7 items-start">
                  <img
                    src="svg/book.svg"
                    alt=""
                    className="bg-white p-2 rounded-[10px]"
                  />
                  <div>
                    <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] mb-2 lg:mb-4">
                      Expert Guidance from Industry Leaders
                    </h3>
                    <span className="leading-[20px]">
                      We are committed to your success, which is showcased in
                      the wealth of knowledge and industry experience of your
                      trainers.
                    </span>
                    <div className="bg-[#8282825E] rounded-[10px] p-4 mt-9">
                      <h3 className="text-[20px] font-bold leading-[30px] mb-1">
                        Outstanding Credentials
                      </h3>
                      <p>
                        Each instructor&apos;s qualifications are thoroughly
                        vetted to ensure they meet high standards of expertise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <img
                src="img/chattyping.png"
                alt=""
                className="lg:flex-[0.4] lg:w-[200px]"
              />
              {/* <video src=""></video> */}
            </div>
          </div>
        </section>

        <section
          style={{
            backgroundImage: "url('img/home-img8.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
          className="flex flex-col lg:items-center h-[500px] lg:h-[700px] pt-[100px] lg:pt-[150px] mt-[70px] lg:mt-0"
        >
          <h1 className="lg:w-[70%] w-11/12 mx-auto text-[22px] lg:text-[36px] font-semibold lg:font-bold leading-[28px] lg:leading-[45px] lg:text-center text-dark mb-4 lg:mb-8">
            <span> Employers</span> are looking for you. Get the skills, gain
            practical project experience, get mentored by <span> nebiant</span>{" "}
            and land the job
          </h1>
          <p className="w-11/12 lg:w-[67%] mx-auto text-[#667085] lg:text-center text-[16px] lg:text-[24px] font-light lg:leading-[30px] mb-5 lg:mb-10">
            The average salary for a Data Scientist, according to the Bureau of
            Labor Statistics, is $100,000. According to the Bureau of Labor
            Statistics, by 2026, about 11.5 million jobs would be created for
            data science. 
          </p>

          {/* <div className="w-11/12 lg:w-full mx-auto"> */}
          <Link href="/courses" className="pl-[5%] lg:pl-0">
            <Button text="Start Learning" />
          </Link>
          {/* </div> */}
        </section>

        <section className="bg-[#FFEEEE] w-full lg:w-11/12 flex flex-wrap items-center justify-between mx-auto py-8 px-6 lg:rounded-[24px]">
          <ScrollingLogos />
        </section>

        <TestimonialSection />

        <section className="flex flex-col lg:flex-row justify-between gap-10 pl-[4%] my-[80px]">
          <div className="flex-[0.4] flex flex-col gap-3">
            <h2 className="text-[22px] lg:text-[37px] font-bold leading-[28px] lg:leading-[45px] text-dark">
              All courses have{" "}
              <span className="text-primary">real world projects </span>designed
              for you.
            </h2>
            <h3 className="text-[16px] lg:text-[24px] text-dark font-semibold lg:leading-[30px]">
              Develop the practical skills you need to do the job on day ONE
              when hired.
            </h3>
            <div className="text-[#828282] leading-[23px]">
              <p className="text-[14px] lg:text-[18px] font-light leading-[22px]">
                Data Jobs are anticipated to be in high demand, with 97 million
                specialists needed in the Tech industry by 2025.
              </p>
              <p className="text-[14px] lg:text-[18px] font-light leading-[22px]">
                According to the Bureau of Labour Statistics, the average salary
                for a Data Scientist is $121,263.
              </p>
            </div>
            <Link href="/courses">
              <Button text="Start Learning" classNames="w-fit lg:w-[172px]" />
            </Link>
          </div>
          <img src="svg/home-img5.svg" alt="" className="flex-[0.6]" />
        </section>

        <FloatingBtn />
        <FAQsSection>
          <FAQCard
            question="What is the first step to start learning in your programs?"
            answer="The first step is to register for any of the programs by clicking HERE,
             where you'll learn the fundamentals necessary to advance in data analytics, business 
             analysis, or data science."
          />
          <FAQCard
            question="Will I need to buy any software or tools to participate in the courses?"
            answer="No, all necessary software or tools and how to get them installed for the
             courses are included in your starter pack after you register, and we will make this 
             available to you when you register."
          />
          <FAQCard
            question="How will I learn with nebiant, what is a virtual Instructor-Led class like?"
            answer="Our online classes involve live sessions with instructors, interactive discussions with
             classmates, and practical assignments to apply what you've learned."
          />{" "}
          <FAQCard
            question="How much time per week should I dedicate to a course?"
            answer="Apart from your classes on Saturdays, we recommend dedicating at
             least 1 hour everyday to revise, practice, and complete assignments to 
             get the most out of your course."
          />
        </FAQsSection>

        {isPopupOpen && (
          <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        )}

        {/* Announcement popup is always shown until user closes it */}
        <AnnouncementPopup 
          isOpen={isAnnouncementOpen} 
          onClose={handleAnnouncementClose} 
        />
      </main>
    </>
  );
};

export default Home;