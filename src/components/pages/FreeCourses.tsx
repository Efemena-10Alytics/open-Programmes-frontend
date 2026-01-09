"use client";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import FreeVideoCard from "../static/FreeVideoCard";

const FreeCourses = () => {
  const styles = {
    box: {
      backgroundImage: "linear-gradient(to right, #CA2421, #641210)",
    },
    button: {
      backgroundImage: "linear-gradient(to bottom, #2684FF, #174F99)",
    },
    heading: {
      background: "-webkit-linear-gradient(#eee, #333)",
    },
  };

  return (
    <div>
      <div className="w-11/12 mx-auto bg-black">
        <div
          className="video-container"
          style={{
            width: "80%",
            margin: "0 auto",
            // aspectRatio: "16 / 9",
            maxHeight: "80vh",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/Vxw0nE1qfZc?si=9zmJ51Olor5YSJKj"
            title="YouTube video player"
            frameBorder="0"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <section className="w-11/12 flex flex-wrap lg:flex-nowrap gap-10 text-[#333333] my-[50px] mx-auto">
        <div className="flex flex-col gap-4 lg:flex-[0.6]">
          <h1 className="text-[32px] font-bold leading-10">
            Kick-start your Career in Data Science with Our Comprehensive Crash
            Course
          </h1>

          <p className="font-light left-5">
            This crash course provides a comprehensive introduction to data
            science. You will learn the fundamentals of data analysis, machine
            learning, and predictive analytics. By the end of the course, you
            will have a solid understanding of key concepts and practical
            applications in data science.
          </p>

          <div>
            <h3 className="free-courses-heading mb-3 font-semibold">
              What You Will Learn
            </h3>

            <div className="flex flex-col gap-2 font-light">
              <div className="flex items-center gap-2">
                <img src="svg/arrow.svg" alt="" />
                <p>Understanding data collection and processing techniques.</p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <img src="svg/arrow.svg" alt="" />
                <p>Basic statistical analysis and interpretation.</p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <img src="svg/arrow.svg" alt="" />
                <p>Introduction to machine learning algorithms.</p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <img src="svg/arrow.svg" alt="" />
                <p>Creating data visualizations to communicate insights.</p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <img src="svg/arrow.svg" alt="" />
                <p>
                  Applying data science techniques to solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-[0.4]">
          <div className="flex items-center gap-4">
            <h2 className="text-[17px] lg:text-[20px] font-bold">
              Share This Video
            </h2>
            <div className="bg-white flex items-center justify-center rounded-[10px] p-5 gap-2 lg:gap-4">
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaSquareXTwitter size={18} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaFacebookSquare size={18} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaSquareInstagram size={18} />
              </Link>
              <Link
                href=""
                className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[41px] w-[41px]"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>
          <div
            className="flex flex-col gap-4 rounded-[30px] text-white px-4 py-8"
            style={styles.box}
          >
            <h3 className="text-[20px] font-bold">
              Become Certified, Get 3 Months Internship
            </h3>
            <p className="font-light leading-5">
              Enroll in our advanced certificate data science training program
              to deepen your expertise and boost your career prospects. You also
              get to intern with our hiring partners at top organizations for 3
              months. Our advanced course covers in-depth machine learning, data
              mining, and advanced analytics techniques.
            </p>
            <Link
              href="/courses"
              className="w-fit px-4 py-2 font-bold rounded-[10px]"
              style={styles.button}
            >
              Get Certified NOW!!!
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#FFB5B447] flex justify-center py-[70px]">
        <img src="/img/alumni.png" alt="" />
        <h1 className="absolute w-[40%] text-[40px] lg:text-[128px] font-bold text-center mt-[120px]">
          Meet Our Alumni
        </h1>
      </section>

      <section className="w-11/12 mx-auto my-[70px]">
        <h2 className=" text-[#333333] text-[24px] font-semibold mb-4">
          Related Video
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
          <FreeVideoCard
            img="/img/thumbnail.png"
            title="Master data fundamentals applicable."
            text="Easily remove the background from any photo or image and isolate yo..."
          />{" "}
          <FreeVideoCard
            img="/img/thumbnail.png"
            title="Master data fundamentals applicable."
            text="Easily remove the background from any photo or image and isolate yo..."
          />{" "}
          <FreeVideoCard
            img="/img/thumbnail.png"
            title="Master data fundamentals applicable."
            text="Easily remove the background from any photo or image and isolate yo..."
          />
        </div>
      </section>
    </div>
  );
};

export default FreeCourses;
