"use client";
import React, { useEffect, useState } from "react";

type ViewState = {
  ncda: boolean;
  ncds: boolean;
  ncba: boolean;
};

type ViewKey = keyof ViewState;

const CertificationFlow = () => {
  const [activeView, setActiveView] = useState<ViewState>({
    ncda: true,
    ncds: false,
    ncba: false,
  });
  const viewOrder: ViewKey[] = ["ncda", "ncds", "ncba"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveView((prevActiveView) => {
        // Find the currently active view
        const currentView = viewOrder.find((view) => prevActiveView[view]);

        // Determine the index of the next view
        const currentIndex = viewOrder.indexOf(currentView!);
        const nextIndex = (currentIndex + 1) % viewOrder.length;

        // Construct the new active view state
        const newActiveView: ViewState = {
          ncda: false,
          ncds: false,
          ncba: false,
        };
        
        newActiveView[viewOrder[nextIndex]] = true;

        return newActiveView;
      });
    }, 6000); // 6 seconds interval

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <section className="bg-black text-[#828282]">
      <div
        className={`w-full flex justify-between gap-16 pt-[40px] pb-[60px] ${
          activeView.ncda || "pb-[40px]"
        }`}
      >
        <div className="lg:flex-[0.5] pl-[4%] pr-[2%] lg:pr-0">
          <h1 className="text-[37px] font-bold leading-[45px] text-white mb-5">
            Our Certification 
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.ncda ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.ncda ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.ncda ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Nebiant Certified Data Analyst (NCDA){" "}
                </h3>

                {activeView.ncda && (
                  <p className="leading-[21px] font-light">
                    Validate your proficiency in data analysis with this
                    certification, demonstrating your ability to gather,
                    analyze, and interpret data to drive informed
                    decision-making.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.ncds ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.ncds ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.ncds ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Nebiant Certified Data Scientist (NCDS)
                </h3>
                {activeView.ncds && (
                  <p>
                    Showcase your expertise in data science with this
                    certification, proving your capability to leverage advanced
                    algorithms and predictive modeling techniques to extract
                    actionable insights from complex datasets.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className={`w-[5px] flex-[0.01] ${
                  activeView.ncba ? "h-[120px]" : "h-auto"
                } bg-white`}
              >
                <div
                  className={` w-full h-full ${
                    activeView.ncba ? "animate-grow bg-primary" : ""
                  }`}
                ></div>
              </div>
              <div className="flex-[0.99]">
                <h3
                  className={`text-[24px] ${
                    activeView.ncba ? "text-white" : "text-[#828282]"
                  }  font-bold`}
                >
                  Nebiant Certified Business Analyst (NCBA)
                </h3>
                {activeView.ncba && (
                  <p>
                    Elevate your business analysis skills with this
                    certification, certifying your competency in analyzing
                    business processes, identifying opportunities for
                    improvement, and implementing effective solutions.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {activeView.ncda && (
          <img
            src="img/tab-preview6.png"
            className="hidden lg:inline-block lg:flex-[0.4] w-[300px]"
            alt=""
          />
        )}
        {activeView.ncds && (
          <img
            src="img/tab-preview8.png"
            className="hidden lg:inline-block lg:flex-[0.4] pr-[40px]  w-[250px]"
            alt=""
          />
        )}
        {activeView.ncba && (
          <img
            src="img/tab-preview7.png"
            className="hidden lg:inline-block lg:flex-[0.5]  pr-[40px]"
            alt=""
          />
        )}
      </div>
    </section>
  );
};

export default CertificationFlow;