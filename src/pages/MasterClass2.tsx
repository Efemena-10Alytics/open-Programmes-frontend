import { config } from "../config";
import { useEffect, useState } from "react";

const MasterClass2 = () => {
  const baseURL = config.url.API_URL;

  const styles = {
    box: {
      backgroundImage: "linear-gradient(to bottom, #CA2421, #641210)",
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
      <section className="bg-black text-white flex flex-col lg:flex-row items-center gap-16 pb-4">
        <div className="flex flex-col items-start gap-6 p-6 lg:pl-12">
          <h1 className="text-[33px] lg:text-[44px] font-bold">
            Your Pathway To Remote/High-Paying Jobs With Zero Tech Experience
          </h1>
          <a
            href="#form"
            className="bg-primary py-3 px-10 rounded-full lg:text-[20px] font-bold"
          >
            Register for Free
          </a>
        </div>
        <img
          src="img/img-fr2.png"
          alt=""
          className="relative right-10 lg:right-0"
        />
      </section>

      <section className="w-[95%] mx-auto grid grid-1-cols lg:grid-cols-2 gap-6 lg:gap-16 py-12 lg:py-24">
        <div
          className="flex items-center justify-center rounded-[10px] px-6 lg:px-10 py-8 lg:py-16 text-[18px] lg:text-[24px] text-white"
          style={styles.box}
        >
          Not everyone should do Tech. But If you're looking to upskill, switch
          careers, or a stay-at-home parent looking to land a high-paying job
          remotely? Tech Is Your Best Option To Get Started and Nebiant
          Analytics is here to guide you every step of the way.
        </div>
        <div className="bg-[#FFEFEE] flex items-center justify-center rounded-[10px] px-6 lg:px-10 py-8 lg:py-16   text-[18px] lg:text-[24px] text-[#333333]">
          Get equipped with in-demand tech skills like Data Analytics, Business
          Analysis, and Data Science—all designed to help you succeed and get a
          job even if you do not have a computer related degree or past tech
          experience.
        </div>
      </section>

      <section className="bg-black flex pl-[20px] lg:pt-0 pt-[40px] lg:pt-[20px]">
        <div className="relative w-[95%] mx-auto flex flex-col lg:flex-row items-center">
          <div className="flex flex-col lg:flex-[0.5]">
            <span className="inline-flex lg:w-[40%] text-[20px] lg:text-[24px] text-white">
              Trusted by People all across the World
            </span>
            <img
              src="img/img-fr5.png"
              alt=""
              className="w-[700px] relative -left-[23px]"
            />
            <span className="inline-flex lg:w-[70%] text-[25px] lg:text-[48px] text-white font-semibold">
              Satisfied Students Over The Globe!
            </span>
          </div>
          <img
            src="img/img-fr3.png"
            alt=" "
            className="lg:w-[40%] lg:flex-[0.5] z-50 relative lg:top-[80px]"
          />
          <img
            src="img/img-fr4.png"
            alt=" "
            className="absolute bottom-0 right-[150px] z-30"
          />
        </div>
      </section>

      <section className="bg-[#FFEFEE] py-16" id="form">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-[95%] mx-auto">
          <img
            src="img/img-fr1.png"
            alt=""
            className="lg:w-[10%] lg:flex-[0.5] order-2 lg:order-1"
          />

          <div
            className="lg:flex-[0.4] px-6 lg:px-12 py-8 lg:py-14 rounded-[32px] text-white order-1 lg:order-2"
            style={styles.box}
            id="form"
          >
            <h2 className="text-[31px] leading-[40px] font-bold mb-4">
              Kick-start your career in Tech with our mentorship training{" "}
            </h2>
            <p className="text-[21px] mb-6">
              {" "}
              Fill in the following details to join our community{" "}
            </p>

            <div className="flex flex-col gap-4 justify-center">
              {/* Google Form Link */}
              {/*
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf9bWBYGFnouAQ5k4ah0sB7Y5nJpyOmF5uo6BuaqSDCJLgQrw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-full text-[15px] font-bold px-6 py-3"
                style={styles.button}
              >
                Click Here to Register
              </a>
             */}
              <a
                href="https://docs.google.com/forms/d/18Z0MFh_uf8hBdownOd4yR2Xi-xVfDn0GS-RbHLdaK0U/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-full text-[15px] font-bold px-6 py-3"
                style={styles.button}
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterClass2;
