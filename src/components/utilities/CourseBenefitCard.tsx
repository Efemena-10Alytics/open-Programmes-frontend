interface Props {
  heading: string;
  details: string;
}

const CourseBenefitCard = ({ heading, details }: Props) => {
  return (
    <div className="flex flex-col items-start lg:w-[275px] gap-7 border border-[#333333] rounded-[8px] py-5 px-3">
      <div className="flex justify-center w-[64px] h-[64px] items-center p-3 border border-[#FFFFFF] rounded-full">
        <img src="/svg/certificate2.svg" alt="" />
      </div>
      <h3 className="text-[20px] font-bold leading-[30px]">{heading}</h3>
      <p className="text-[14px] font-light">{details}</p>
    </div>
  );
};

export default CourseBenefitCard;
