interface Props {
  title: string;
  duration: string;
}
const CourseItem = ({ title, duration }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="svg/cam3.svg" alt="" />
        <span className="font-light text-[#828282]">{title}</span>
      </div>

      <div className="flex items-center gap-1">
        <img src="svg/timer2.svg" alt="" />
        <span className="text-[#A39FAB] text-[14px] font-light">30 Min</span>
        <img src="svg/lock2.svg" alt="" />
      </div>
    </div>
  );
};

export default CourseItem;
