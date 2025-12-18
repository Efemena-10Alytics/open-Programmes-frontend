// @ts-nocheck

import React, { useEffect, useState } from "react";

const HomeSection = () => {
  const [activeView, setActiveView] = useState({
    learn: true,
    experience: false,
    skills: false,
    apply: false,
    getJob: false,
  });
  const viewOrder = ["learn", "experience", "skills", "apply", "getJob"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveView((prevActiveView) => {
        // Find the currently active view
        const currentView = viewOrder.find((view) => prevActiveView[view]);

        // Determine the index of the next view
        const currentIndex = viewOrder.indexOf(currentView!);
        const nextIndex = (currentIndex + 1) % viewOrder.length;

        // Construct the new active view state
        const newActiveView = viewOrder.reduce((acc, view, index) => {
          acc[view] = index === nextIndex;
          return acc;
        }, {} as Record<string, boolean>);

        return newActiveView;
      });
    }, 6000); // 5 seconds interval

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);
  return (
    <section className="bg-black text-[#828282]">
      <div className="w-full flex justify-between gap-16 py-[40px]">
        <div className="lg:flex-[0.4] pl-[4%] pr-[2%] lg:pr-0">
          <h1 className="text-[37px] font-bold leading-[45px] text-white mb-5">
            Fast-track your career with{" "}
            <span className="text-primary">nebiant analytics.</span>
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.learn ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.learn ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.learn ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Learn
                </h3>

                {activeView.learn && (
                  <p className="leading-[21px] font-light">
                    Begin your journey at Nebiant analytics with comprehensive
                    training courses designed to equip you with skills in Data
                    Analytics, Data Science, Business Analysis.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.experience ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.experience ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.experience ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Practical Hands-On Experience
                </h3>
                {activeView.experience && (
                  <p>
                    Begin your journey at Nebiant analytics with comprehensive
                    training courses designed to equip you with skills in Data
                    Analytics, Data Science, Business Analysis.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.skills ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.skills ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.skills ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Employability Skills{" "}
                </h3>
                {activeView.skills && (
                  <p>
                    Begin your journey at Nebiant analytics with comprehensive
                    training courses designed to equip you with skills in Data
                    Analytics, Data Science, Business Analysis.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.apply ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.apply ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.apply ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Apply Skills on Real-World End-to-End Projects
                </h3>
                {activeView.apply && (
                  <p>
                    Begin your journey at Nebiant analytics with comprehensive
                    training courses designed to equip you with skills in Data
                    Analytics, Data Science, Business Analysis.
                  </p>
                )}
              </div>{" "}
            </div>{" "}
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.getJob ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.getJob ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.getJob ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Get the Job
                </h3>
                {activeView.getJob && (
                  <p>
                    Begin your journey at Nebiant analytics with comprehensive
                    training courses designed to equip you with skills in Data
                    Analytics, Data Science, Business Analysis.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {activeView.learn && (
          <img
            src="/img/tab-preview.png"
            className="hidden lg:inline-block lg:flex-[0.6]"
            alt=""
          />
        )}
        {activeView.experience && (
          <img
            src="/img/tab-preview2.png"
            className="hidden lg:inline-block lg:flex-[0.6]"
            alt=""
          />
        )}
        {activeView.skills && (
          <img
            src="/img/tab-preview3.png"
            className="hidden lg:inline-block lg:flex-[0.6]"
            alt=""
          />
        )}
        {activeView.apply && (
          <img
            src="/img/tab-preview4.png"
            className="hidden lg:inline-block lg:flex-[0.6]"
            alt=""
          />
        )}
        {activeView.getJob && (
          <img
            src="/img/tab-preview5.png"
            className="hidden lg:inline-block lg:flex-[0.6]"
            alt=""
          />
        )}
      </div>
    </section>
  );
};

export default HomeSection;
