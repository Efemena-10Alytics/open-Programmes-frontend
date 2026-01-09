'use client' 

import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
// CHANGED: React Router imports replaced with Next.js imports
import { useParams } from "next/navigation"; 
import Link from "next/link"; // CHANGED: Next.js Link
import CourseBenefitCard from "../utilities/CourseBenefitCard";
import CourseWeekPanel from "../utilities/CourseWeekPanel";
import Loader from "../utilities/Loader";
import TagLabel from "../utilities/TagLabel";
import VideoPopup from "../utilities/VideoPopup";
import api from "../../lib/api";
import CourseModel from "../../models/Course";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { extractFileIdFromGoogleLink } from "../../utils/extractFileIdFromGoogleLink";
import DownloadButton from "../utilities/DownloadButton";
import { getYouTubeEmbedUrl } from "../../utils/getYoutubeEmbedUrl";
import { useAuth } from "../../contexts/AuthContext";

const CourseDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // CHANGED: Next.js useParams returns an object, need to extract courseID
  const params = useParams() as any;
  const courseID = params.courseID as string || "";
  
  const { user, userID } = useAuth();

  const fetchCourse = async (): Promise<CourseModel> => {
    const response = await api.get(`/api/courses/${courseID}/no-auth`);
    return response.data.data;
  };

  const {
    data: course,
    error,
    isLoading,
  } = useQuery<CourseModel, Error>({
    queryKey: ["course", courseID],
    queryFn: fetchCourse,
  });

  const videoId = course?.course_preview_video.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  console.log("user", user);
  console.log("course", course);
  
  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!course) return <div>No course found</div>;
  
  return (
    <main>
      <section className="bg-black rounded-[24px] w-11/12 mx-auto px-6 py-10 text-white mt-6">
        <h1 className="text-[32px] lg:text-[40px]">Course</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 justify-between items-center">
          <div className="flex flex-col gap-5">
            <div className="bg-[#FEE6E6] flex items-center gap-1 py-1 px-2 h-[32px] w-max rounded-full border border-[#CA24211F]">
              <img src="/svg/badge.svg" alt="" />
              <span className="text-[12px] text-[#454545]">
                Certification Course
              </span>
            </div>
            <div>
              <h1 className="text-[40px] lg:text-[48px] font-bold">
                {course?.title}
              </h1>
              <p className="lg:text-[20px] font-light leading-6 mb-4">
                {course?.description}
              </p>
              <div className="lg:w-[70%] flex items-center flex-wrap gap-2 mb-3">
                {course?.catalog_header_tags?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-[#1C1C1C] w-fit rounded-full p-2 font-light flex items-center gap-2 text-[12px]"
                    >
                      <img src={item.imageUrl} alt="" />
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-[#FFFFFF] w-[315px] flex items-center justify-between border-[2px] border-[#FFB5B4] rounded-[86px] p-1">
              <img src="/svg/43.svg" alt="" />

              <div>
                <img src="/img/students.png" alt="" />
              </div>
              {/* CHANGED: Link uses href instead of to */}
              <Link
                href={`/payments/${courseID}`}
                className="flex justify-center bg-primary w-[130px] px-3 py-2 rounded-full"
              >
                Join Class
              </Link>
            </div>
          </div>
          <img src={course?.catalog_header_image} alt="" className="" />
        </div>
      </section>

      <section className="w-11/12 mx-auto py-[60px]">
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col w-full justify-between gap-4 lg:flex-[0.31]">
            <div
              className="relative w-full cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={course?.imageUrl} alt="" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/svg/play2.svg" alt="Play" className="w-16 h-16" />
              </div>
            </div>
            <div className="flex items-center gap-3 font-bold">
              <DownloadButton
                fileId={extractFileIdFromGoogleLink(course?.brochureUrl)}
                label="Download Brochure"
                downloadingLabel="Downloading..."
              />

              {/* CHANGED: Link uses href instead of to */}
              <Link
                href={`/payments/${courseID}`}
                className="flex-[0.4] w-full flex justify-center items-center py-3 px-4 rounded-[10px] border border-primary text-primary"
              >
                Enroll Now
              </Link>
            </div>
          </div>
          <div className="lg:flex-[0.66] text-[#333333]">
            <h2 className="text-[36px] font-bold">Course Description</h2>
            <p className="text-[14px] font-light leading-[20px] mb-7">
              {course?.description}
            </p>
            <div className="flex gap-8 items-center border justify-center border-[#828282] rounded-[10px] p-5">
              <div className="flex flex-col gap-3">
                <span className="text-[18px] text-[#828282] font-semibold">
                  NGN
                </span>
                <span className="text-[48px] font-extrabold leading-[52px]">
                  250k
                </span>
                <div className="flex items-center text-[#FFD705] text-[22px]">
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                </div>
              </div>

              <div className="flex flex-wrap gap-12 text-[12px]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <img src="/svg/tv.svg" alt="" />
                    <span>Virtual Instructor-Led (LMS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/svg/time.svg" alt="" />
                    <span>{course?.course_duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/svg/certificate2.svg" alt="" className="h-4" />
                    <span>Accredited Certificate</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <img src="/svg/cam2.svg" alt="" />
                    <span>Course Level: Beginner-Friendly</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src="/svg/cam.svg" alt="" />
                    <span>1 Month Internship</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img src="/svg/user.svg" alt="" />
                    <span>{course?.course_instructor_name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-11/12 flex flex-wrap justify-between gap-12 mx-auto py-[60px]">
        <div className="lg:flex-[0.7] flex flex-col gap-4">
          {course?.course_weeks?.map((week, i) => {
            return <CourseWeekPanel week={week} key={i} />;
          })}
          <div className="rounded-[10px] border border-[#EEEEEE]  px-1 py-3 mt-16 text-[#828282] font-light">
            <span className="text-[#6c3d3d] text-[20px] font-bold">
              Learning Outcomes
            </span>
            <div className=" bg-[#F9FAFB] flex flex-col gap-3 p-2 mt-2">
              {course?.learning_Outcomes?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex gap-2 leading-[20px] p-2"
                  >
                    <FaRegCircleCheck className="text-primary shrink-0" />
                    <span>{item.content}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:flex-[0.3] flex flex-col gap-12">
          <div className="rounded-[10px] border border-[#EEEEEE]  px-1 py-3 text-[#828282] font-light">
            <span className="text-[#333333] text-[24px] font-bold">
              Prerequisites
            </span>
            <div className=" bg-[#F9FAFB] flex flex-col gap-3 p-2 mt-2">
              {course?.prerequisites?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex gap-2 leading-[20px] p-2"
                  >
                    <FaRegCircleCheck className="text-primary shrink-0" />
                    <span>{item.content}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[#F9FAFB] border border-[#EEEEEE] p-2 rounded-[10px]">
            <span className="text-[#333333] text-[24px] font-bold">
              Certification
            </span>
            <img src="/img/certificate.png" alt="" className="mt-2 w-full" />
          </div>
          <div className="border border-[#EEEEEE] p-2 rounded-[10px]">
            <span className="text-[#333333] text-[24px] font-bold uppercase">
              Tags
            </span>

            <div className="flex gap-1 flex-wrap">
              {course?.tags?.map((item, i) => {
                return (
                  <div key={i} className="flex gap-1 flex-wrap">
                    <TagLabel text={item.content} bgColor="#F9FAFB" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-[#333333] py-[60px]">
        <div className="bg-white w-11/12 rounded-[24px] mx-auto p-8">
          <h2 className="text-[24px] font-bold mb-4">
            Skills You'll Gain Proficiency In
          </h2>
          <p className="font-light lg:w-[65%]">
            Gain a comprehensive set of skills that will help you secure a
            high-paying job and perform excellently in today's workforce along
            with developing critical problem-solving and communication skills to
            effectively present data insights. Data Collection and Cleaning.
          </p>

          {courseID === "clycxjxdz00025a7isah5z5yb" ? (
            <img src="/svg/ds.svg" alt="Data science" />
          ) : courseID === "clycxjlec00015a7iycm2cbdn" ? (
            <img src="/svg/da.svg" alt="Data analytics" />
          ) : courseID === "clycxiomd00005a7ifv6t8r5o" ? (
            <img src="/svg/ba.svg" alt="Business analysis" />
          ) : null}
        </div>
      </section>

      <section className="bg-[#FFB5B447] flex justify-center py-[70px]">
        <img src="/img/alumni.png" alt="" />
        <h1 className="absolute w-[40%] text-[40px] lg:text-[128px] font-bold text-center mt-[120px]">
          Meet Our Alumni
        </h1>
      </section>

      <section className="bg-black text-white py-[60px]">
        <div className="w-11/12 mx-auto">
          <h2 className="text-[24px] font-bold mb-16">Course Benefits</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-around">
            <CourseBenefitCard
              heading="Land Your Dream Role Faster with Our Data Science Portfolio Projects"
              details="Hiring managers and data scientists that interview you will look through
              it in order to gauge your skills, experience, and interests."
            />
            <CourseBenefitCard
              heading="Earn Industry-Recognized Certification"
              details="Earn accredited certifications upon course completion, enhancing your credibility and marketability in the job market."
            />
            <CourseBenefitCard
              heading="Mentorship Program"
              details="Receive guidance and mentorship from industry experts, accelerating your learning curve and helping you navigate the complexities of the data and AI landscape."
            />
            <CourseBenefitCard
              heading="Free Access to Data & AI Con"
              details="Gain exclusive access to top-tier data and AI conferences, providing invaluable networking opportunities and exposure to the latest trends and innovations in the field."
            />
            <CourseBenefitCard
              heading="Career Support Services"
              details="Benefit from our career support services, including resume reviews, mock interviews, and job placement assistance, to maximize your job search success."
            />
            <CourseBenefitCard
              heading="Alumni Community & Network"
              details="Join a thriving community of Nebiant alumni, fostering connections, collaboration, and ongoing learning opportunities beyond the duration of your course."
            />
            <CourseBenefitCard
              heading="Lifelong Access to Learning Resources"
              details="Access ongoing learning resources and professional development opportunities to stay updated with the rapidly evolving technologies and industry trends."
            />
          </div>
        </div>
      </section>

      <section className="w-11/12 mx-auto py-[100px]">
        <div className="flex flex-col gap-7 border border-[#e08a8a] rounded-[24px] p-10">
          <h2 className="text-[#333333] text-[24px] font-bold">
            About the Instructor
          </h2>

          <div className="flex items-center justify-between gap-2  border-t border-b border-[#E6E6E6] py-6">
            <div className="flex items-center">
              <div className="flex gap-2">
                <img
                  src={course?.course_instructor_image}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">
                    {course?.course_instructor_name}
                  </span>
                  <span className="text-[12px] font-light">
                    {course?.course_instructor_title}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#FFD705] text-[18px]">
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarFullOutline className="text-[#F0F0F0]" />
              </div>
              <span className="text-[#333333] text-[12px] font-light">
                4.5 Instructor Rating
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between text-[#828282BA] text-[12px] font-light">
            <div className="flex items-center justify-between gap-2 lg:gap-0">
              <div className="flex flex-wrap items-center gap-3">
                <img src="/svg/play.svg" alt="" />
                <span>5 Courses</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <img src="/svg/book2.svg" alt="" />
                <span>1000+ Lessons</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <img src="/svg/timer.svg" alt="" />
                <span>800hrs 30mins</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <img src="/svg/users.svg" alt="" />
                <span>18000+ Students Trained</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[#828282BA] text-[14px] font-light">
            {course?.course_instructor_description &&
            typeof course.course_instructor_description === "string"
              ? parse(course.course_instructor_description)
              : "No instructor description available."}
          </div>
        </div>
      </section>

      {/* Modal for Video */}
      {isModalOpen && (
        <VideoPopup
          videoSrc={getYouTubeEmbedUrl(course.course_preview_video) || ""}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default CourseDetails;