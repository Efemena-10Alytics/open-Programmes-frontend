import Link from "next/link";
import Card from "../../components/dashboard/Cards";
import ProgressBar from "../../components/utilities/ProgressBar";
import { ProtectedRoute } from "../../components/utilities/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";

const Lessons = () => {
  const { user } = useAuth();

  return (
    <main className="bg-[#F4F4F4] min-h-screen p-3 md:p-6">
      <section className="flex flex-col h-full">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Available Courses - Takes full width on mobile, 60% on desktop */}
            <div className="w-full lg:flex-[0.60] bg-white p-3 md:p-5 h-fit shadow-md rounded-[10px] mb-3 lg:mb-0">
              <h1 className="text-gray-500 font-semibold mb-4 text-base md:text-lg">
                Available courses
              </h1>
              {user?.course_purchased.map((course, i) => {
                return (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 pb-3 border-b border-gray-100 last:border-0" key={i}>
                    <img
                      src={course.course.imageUrl}
                      alt=""
                      className="w-full sm:w-[90px] h-[60px] object-cover rounded-[3px]"
                    />
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-[#333333] text-xs md:text-sm font-bold">
                        <Link href={`/dashboard/lessons/${course.courseId}`}>
                          {course.course.title}
                        </Link>
                      </span>
                      <p className="text-[#828282] text-[9px] md:text-xs">
                        {course.course.description}
                      </p>
                      <ProgressBar />
                      <div className="flex items-center gap-2 text-[10px] md:text-xs">
                        <img src="svg/hourglass.svg" alt="" className="w-4 h-4" />
                        {/* Countdown info can be added back here */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Training Advisor - Takes full width on mobile, 40% on desktop */}
            <div className="w-full lg:flex-[0.40] mb-6">
              <Card heading="Chat with a Training Advisor">
                <div className="flex flex-col sm:flex-row gap-4 p-3">
                  <div className="flex items-center gap-1">
                    <img
                      src="img/dp1.png"
                      alt=""
                      className="rounded-full object-cover w-10 h-10"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base font-bold">
                        Elijah Ebulue
                      </span>
                      <span className="text-xs md:text-sm font-light">
                        Training Advisor
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-light flex flex-col sm:flex-row justify-between w-full gap-3 sm:border-l sm:pl-4 mt-2 sm:mt-0">
                    <div className="flex flex-col">
                      <span>Available - 24/7</span>
                      <span>Mon - Sat</span>
                    </div>
                    <button className="bg-[#FFB5B436] text-primary text-xs border-[0.5px] rounded-[4px] px-3 py-1 border-primary mt-2 sm:mt-0">
                      Chat Now
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProtectedRoute(Lessons);