import useCourses from "../../hooks/api/useCourses";
import CourseCard from "../../components/utilities/CourseCard";
import { TabList, Tab, TabPanel, Tabs } from "react-tabs";
import TutorCard from "../../components/dashboard/TutorCard";
import { useState } from "react";
import { Loader } from "lucide-react";

const Catalog = () => {
  const { courses, isLoading, isError } = useCourses();
  const [activeTab, setActiveTab] = useState(0);

  // Filter out courses with title "Tech Elevator"
  const filteredCourses = courses?.filter(course => course.title !== "Tech Elevator") || [];

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 max-w-7xl mx-auto">
      <Tabs 
        className="dashboard" 
        selectedIndex={activeTab}
        onSelect={index => setActiveTab(index)}
      >
        {/* Tab Navigation */}
        <TabList className="h-auto min-h-[45px] w-full bg-white rounded-lg shadow-sm flex text-xs sm:text-sm md:text-base p-1 mb-4 overflow-hidden">
          <div className="flex w-full sm:w-[400px] md:w-[500px] mx-auto">
            <Tab 
              className={`flex-1 py-2 flex items-center justify-center outline-none cursor-pointer transition-colors duration-200 ${
                activeTab === 0 
                  ? 'bg-primary/10 text-primary font-medium rounded-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>Course Catalogue</span>
            </Tab>
            <Tab 
              className={`flex-1 py-2 flex items-center justify-center outline-none cursor-pointer transition-colors duration-200 ${
                activeTab === 1 
                  ? 'bg-primary/10 text-primary font-medium rounded-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>Trainers</span>
            </Tab>
          </div>
        </TabList>

        {/* Courses Tab Panel */}
        <TabPanel>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 text-primary animate-spin" />
                <p className="mt-2 text-sm text-gray-600">Loading courses...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-red-600">Failed to load courses. Please try again later.</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">No courses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {filteredCourses.map((course, i) => (
                <CourseCard
                  key={i}
                  name={course.title}
                  description={course.description}
                  img={course.imageUrl}
                  price={course.price}
                  link={course.id}
                  skills={[
                    "/svg/logos/chatgpt.svg",
                    "/svg/logos/excel.svg",
                    "/svg/logos/power-bi.svg",
                    "/svg/logos/tableau.svg",
                    "/svg/logos/looker.svg",
                  ]}
                />
              ))}
            </div>
          )}
        </TabPanel>

        {/* Trainers Tab Panel */}
        <TabPanel>
          <div className="bg-white p-3 sm:p-4 md:p-5 shadow-md rounded-lg mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
              Trainers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <TutorCard
                name="Ayobami Yusuf"
                role="Data Analytics Instructor"
              />
              <TutorCard 
                name="Dafe Samuel" 
                role="Data Science Instructor" 
              />
              <TutorCard
                name="Akorede Toluwani"
                role="Business Analysis Instructor"
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Catalog;