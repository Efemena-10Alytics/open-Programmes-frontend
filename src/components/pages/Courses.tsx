"use client";
import Link from "next/link";
import CertificationFlow from "../CertificationFlow";
import CoursesSection from "../CoursesSection";
import FAQsSection from "../FAQsSection";
import FAQCard from "../static/FAQCard";
import FloatingBtn from "../utilities/FloatingBtn";
import Button from "../utilities/Button";

const Courses = () => {
  return (
    <>
      <main>
        <section
          className=""
          style={{
            backgroundImage: "url('svg/course-hero-bg.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          <div className="w-11/12 mx-auto flex flex-wrap pt-[50px] lg:pt-0">
            <div className="flex flex-col justify-center gap-7 flex-wrap lg:flex-[0.5]">
              <h1 className="text-dark text-[30px] lg:text-[36px] font-bold leading-[35px] lg:leading-[45px]">
                Each course has hands-on projects designed to help you develop
                the skills you need to gain experience.
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 py-1 px-2 h-[32px] w-max rounded-full border border-[#7C3AED1F]">
                  <img src="svg/badge.svg" alt="" />
                  <span className="text-[12px] text-[#454545]">
                    Data Analytics
                  </span>
                </div>{" "}
                <div className="flex items-center gap-1 py-1 px-2 h-[32px] w-max rounded-full border border-[#7C3AED1F]">
                  <img src="svg/badge.svg" alt="" />
                  <span className="text-[12px] text-[#454545]">
                    Data Science
                  </span>
                </div>{" "}
                <div className="flex items-center gap-1 py-1 px-2 h-[32px] w-max rounded-full border border-[#7C3AED1F]">
                  <img src="svg/badge.svg" alt="" />
                  <span className="text-[12px] text-[#454545]">
                    Business Analytics
                  </span>
                </div>
              </div>
            </div>
            <img
              src="img/courses-hero.png"
              alt=""
              className="lg:h-[357px]  lg:flex-[0.5]"
            />
          </div>
        </section>

        <div className="mb-24">
          <CoursesSection
            rightText="At 10Alytics Business, we offer a selection of standout
         courses and resources designed to meet the specific needs of the Nigerian market.
          Each course integrates the latest industry trends and tools, ensuring our students
          are well-prepared for the challenges of the data-driven world."
          />

          <CertificationFlow />
        </div>

        <section className="">
          <div className="">
            <h1 className="lg:w-[74%] w-11/12 mx-auto text-[28px] lg:text-[37px] font-extrabold lg:leading-[45px] lg:text-center text-dark mb-20">
              Learn The <span className="text-primary"> Best Way</span>, In The
              <span className="text-primary">Best Environment, </span> From The
              Best Instructors, With Like Minds At Your{" "}
              <span className="text-primary">Own Pace.</span>
            </h1>

            <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between gap-10 pb-20">
              <img src="img/course-img3.png" alt="" className="" />
              <div className="">
                <h2 className="text-[37px] font-bold leading-[45px] text-dark mb-8">
                  Watch <span className="text-primary"> Course Videos</span> at
                  Your Pace and Track Your Progress
                </h2>
                <p className="text-[#828282] leading-[25px] mb-9">
                  With 10Alytics Business, you can enjoy the flexibility of
                  watching course videos at your own pace, allowing you to fit
                  your learning around your schedule. Pause, replay, and review
                  high-quality content to fully grasp each topic. As you
                  progress, our platform enables you to track your achievements
                  in real-time. Detailed progress reports and performance
                  analytics provide insights into your learning journey.
                </p>
                <Link href="/signup">
                  <Button text="Start Learning" />
                </Link>
              </div>
            </div>

            <div className="bg-[#FAF5FF]">
              <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2  justify-between gap-10 py-20">
                <div>
                  <h2 className="text-[37px] font-bold leading-[45px] text-dark mb-8">
                    Learn from{" "}
                    <span className="text-primary"> Expert Instructors</span>
                  </h2>
                  <p className="text-[#828282] leading-[25px] mb-9">
                    With 10Alytics Business, you&apos;ll have the opportunity to
                    learn from industry-leading experts who bring a wealth of
                    knowledge and experience to the table. Our instructors are
                    seasoned professionals in their respective fields, with
                    proven credentials and a passion for teaching. They provide
                    personalized guidance, mentorship, and support throughout
                    your learning journey, ensuring you receive the highest
                    quality education.
                  </p>
                  <Link href="/signup">
                    <Button text="Enroll Now" />
                  </Link>
                </div>
                <img src="img/course-img1.png" alt="" />
              </div>
            </div>

            <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between gap-10 py-20">
              <img src="img/course-img2.png" alt="" />
              <div>
                <h2 className="text-[37px] font-bold leading-[45px] text-dark mb-8">
                  Earn an{" "}
                  <span className="text-primary"> Accredited Certificate</span>
                </h2>
                <p className="text-[#828282] leading-[25px] mb-9">
                  Upon successful completion of your courses with 10alytics Business,
                  you will receive an accredited certificate
                  recognized by industry professionals. This certificate
                  validates your proficiency in the respective field of study,
                  enhancing your credibility and marketability in the job
                  market. Our rigorous assessment process ensures that you have
                  acquired the necessary skills and knowledge to excel in your
                  chosen career path.
                </p>
                <Link href="/signup">
                  <Button text="Enroll Now" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-[80px]">
          <div className="w-11/12 mx-auto">
            <h1 className="lg:w-[74%] mx-auto text-[37px] font-extrabold leading-[45px] lg:text-center text-white mb-20">
              Why get certified from{" "}
              <span className="text-primary">10Alytics Business? </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
              <div className="dark-card flex flex-col gap-3 items-start h-[215px] text-white rounded-[20px] p-4">
                <img src="svg/note.svg" alt="" />
                <h3 className="text-[24px] font-bold">Validation</h3>
                <span>
                  10alytics Business certifications authenticate your expertise, giving
                  employers confidence in your skills.
                </span>
              </div>
              <div className="dark-card flex flex-col gap-3 items-start h-[215px] text-white rounded-[20px] p-4">
                <img src="svg/career.svg" alt="" />
                <h3 className="text-[24px] font-bold">Career Advancement</h3>
                <span>
                  Certification from 10alytics Business opens doors to new opportunities
                  and higher-level roles in the data-driven industry.
                </span>
              </div>{" "}
              <div className="dark-card flex flex-col gap-3 items-start h-[215px] text-white rounded-[20px] p-4">
                <img src="svg/skill.svg" alt="" />
                <h3 className="text-[24px] font-bold">Skill Enhancement</h3>
                <span>
                  Our certification programs provide practical, real-world
                  experience, honing your abilities and boosting your
                  marketability.
                </span>
              </div>{" "}
              <div className="dark-card flex flex-col gap-3 items-start h-[215px] text-white rounded-[20px] p-4">
                <img src="svg/skill.svg" alt="" />
                <h3 className="text-[24px] font-bold">
                  Accredited Certification
                </h3>
                <span>
                  Earn a certification that is recognized and respected by
                  industry professionals
                </span>
              </div>
            </div>
          </div>
        </section>

        <FAQsSection>
          <FAQCard
            question="I'm not very good with computers; can I still enroll?"
            answer="Absolutely! Our beginner courses start with the basics,
             we also understand your needs and have tailored your training 
             sessions to cater for your needs."
          />{" "}
          <FAQCard
            question="What happens if I miss a live online class?"
            answer="All live sessions are recorded, so you can catch up at your 
            convenience. With this, you never miss a class. However, attending live
             sessions is beneficial for immediate feedback and interaction."
          />{" "}
          <FAQCard
            question="How do I communicate with my instructor or peers?"
            answer="Communication is facilitated through the Bespoke 10alytics Business LMS
             & WhatsApp group where you can message, discuss, and share resources 
             with your instructor and peers."
          />
          <FAQCard
            question="What are the payment options available?"
            answer="We accept a variety of payment options, including online payment
             with your debit card, or a direct transfer to our corporate bank account.
            Payment can also be made in two instalments.
"
          />
        </FAQsSection>
        <FloatingBtn />
      </main>
    </>
  );
};

export default Courses;
