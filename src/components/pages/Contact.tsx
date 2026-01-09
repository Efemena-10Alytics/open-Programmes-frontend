"use client";
import { Form, Formik } from "formik";
import { FaPhone, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import Link from "next/link";
import FAQsSection from "../FAQsSection";
import FAQCard from "../static/FAQCard";
import TextInput from "../utilities/TextInput";
import Button from "../utilities/Button";

const Contact = () => {
  const containerClassNames =
    "bg-[#FFFFFF] flex gap-2 items-center border border-[#0000001A] rounded-[10px] w-full px-5\
   ";
  const inputClassNames =
    "bg-[#FFFFFF] py-3 w-full text-[#828282] text-[14px]  rounded-[10px] \
    placeholder:text-[#828282] placeholder:text-[13px] focusl:outline-green-200 outline-0";

  return (
    <main>
      <section className="bg-black w-11/12 flex justify-between mx-auto mt-2 mb-[60px] text-white rounded-[14px]">
        <div className="flex flex-col gap-4 p-[20px] lg:pt-[40px] lg:pl-[40px]">
          <h1 className="text-[28px] lg:text-[32px] font-bold leading-[34px] lg:leading-[40px]">
            Get in Touch. Community support
          </h1>
          <p className="lg:text-[20px] font-light leading-[25px]">
            Get in touch with us for inquiries on enrollment, available course
            as well as next cohort start date.{" "}
          </p>
          <a
            href="free-masterclass"
            target="_blank"
            className={
              "w-fit lg:w-[172px] bg-white rounded-[10px] text-[14px] lg:text-[16px] text-black font-bold p-3"
            }
          >
            Join Community
          </a>
        </div>
        <img
          src="img/random2.png"
          alt=""
          className="hidden lg:inline-block pt-[15px] pr-[15px]"
        />
      </section>

      <section className="bg-[#F4F4F4] py-[60px]">
        <div className="w-11/12 mx-auto flex flex-wrap gap-10">
          <div className="flex flex-col gap-3 flex-1 lg:flex-[0.3]">
            <div className="bg-white flex items-center gap-3 rounded-[10px] p-5">
              <div className="bg-[#FFCAC9] h-[24px] w-[24px] p-1 rounded-full flex items-center justify-center">
                <FaPhone className=" text-[#CA2421] text-[13px]" />
              </div>
              <div className="flex flex-col text-[#333333]">
                <span className="font-bold">Phone Number</span>
                <span className="font-light">+23481234567890</span>
              </div>
            </div>
            <div className="bg-white flex items-center gap-3 rounded-[10px] p-5">
              <div className="bg-[#FFCAC9] h-[24px] w-[24px] p-1 rounded-full flex items-center justify-center">
                <MdMail className=" text-[#CA2421] text-[13px]" />
              </div>
              <div className="flex flex-col text-[#333333]">
                <span className="font-bold">Email Address</span>
                <span className="font-light">info@nebiant.com</span>
              </div>
            </div>
            <div className="bg-white flex items-center gap-3 rounded-[10px] p-5">
              <div className="bg-[#FFCAC9] h-[24px] w-[24px] p-1 rounded-full flex items-center justify-center">
                <IoLocationSharp className=" text-[#CA2421] text-[13px]" />
              </div>
              <div className="flex flex-col text-[#333333]">
                <span className="font-bold">Location</span>
                <span className="font-light">Lagos</span>
              </div>
            </div>
            <div className="bg-white flex items-center justify-center rounded-[10px] p-5 gap-4">
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaSquareXTwitter size={20} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaFacebookSquare size={20} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaSquareInstagram size={20} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="lg:flex-[0.7] bg-white flex flex-col gap-1 rounded-[10px] p-5">
            <span className="font-bold">Send Message</span>
            <p className="text-[#828282] font-light leading-5 mb-6">
              Do you have questions about enrollment or any of our courses? We
              reply in less than 12 hours, 24/7. Fill the form below and we will
              be in touch with you
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-3">
                  <div className="flex gap-4">
                    <TextInput
                      name="name"
                      type="text"
                      inputClassNames={inputClassNames}
                      containerClassNames={containerClassNames}
                      placeholder="Your Name"
                    />
                    <TextInput
                      name="email"
                      type="email"
                      inputClassNames={inputClassNames}
                      containerClassNames={containerClassNames}
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="flex gap-4">
                    <TextInput
                      name="phone"
                      type="text"
                      inputClassNames={inputClassNames}
                      containerClassNames={containerClassNames}
                      placeholder="Phone Number"
                    />
                    <TextInput
                      name="email"
                      type="email"
                      inputClassNames={inputClassNames}
                      containerClassNames={containerClassNames}
                      placeholder="Subject"
                    />
                  </div>
                  <textarea
                    className={
                      inputClassNames +
                      " border border-[#0000001A] rounded-[10px] w-full h-[196px] px-5"
                    }
                    placeholder="Message"
                  ></textarea>
                  <Button
                    text="Send Message"
                    type="submit"
                    classNames="w-fit lg:w-[172px] text-[12px] lg:text-[14px] font-bold"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
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
    </main>
  );
};

export default Contact;
