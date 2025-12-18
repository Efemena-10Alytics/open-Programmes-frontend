import CourseCard from "./utilities/CourseCard";
import useCourses from "../hooks/api/useCourses";
import Loader from "./utilities/Loader";

interface Props {
  rightText?: string;
}
const CoursesSection = ({ rightText }: Props) => {
  const { courses, isLoading, isError } = useCourses();

  // console.log("courses", courses);

  return (
    <section className="w-11/12 mx-auto py-[40px]">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-[0.4]">
          <div className=" bg-[#FFEFEF] w-fit lg:w-[182px] mb-4 px-4 py-2 lg:p-3 text-[12px] lg:text-[14px] text-primary flex justify-center items-center rounded-full">
            Our Course Catalog
          </div>
          <h2 className="text-[22px] lg:text-[37px] font-bold leading-[28px] lg:leading-[45px] text-dark lg:mb-8">
            Learn Skills That Employers Are Hiring For
          </h2>
        </div>
        <p className="text-[#828282] flex-[0.6]">
          {rightText
            ? rightText
            : "Each course integrates the latest industry trends and tools, ensuring \
          that you are well prepared to compete for the best jobs globally."}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {isLoading ? (
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        ) : (
          <>
            {courses?.map((course, i) => {
              return (
                <CourseCard
                  name={course.title}
                  description={course.description}
                  img={course.imageUrl}
                  price={course.price}
                  link={course.id}
                  skills={course.skills_you_will_learn.map(
                    (skill) => skill.iconUrl
                  )}
                  key={i}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
