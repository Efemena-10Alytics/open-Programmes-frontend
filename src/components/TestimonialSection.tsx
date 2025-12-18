import AutoScrollingBoxes from "./AutoScrollingBoxes";

interface ImgCardProps {
  img: string;
  name?: string;
  role?: string;
}

interface TextCardProps {
  text: string;
  name: string;
  role: string;
  img: string;
}

const ImgCard = ({ img, name, role }: ImgCardProps) => {
  return (
    <div className="relative h-[274px] w-[274px] shrink-0 rounded-[24px] ml-5">
      <img
        src={img}
        alt=""
        className="border-2 border-white rounded-[24px] h-full w-full object-cover"
      />
      <div className="flex flex-col absolute bottom-2 left-3 text-white">
        <span className="font-semibold text-[14px]">{name}</span>
        <span className="font-light text-[12px]">{role}</span>
      </div>
    </div>
  );
};

const TextCard = ({ text, img, name, role }: TextCardProps) => {
  return (
    <div className="relative bg-[#272727] h-[274px] w-[274px] shrink-0 rounded-[24px] p-5 ml-5">
      <p className="text-white text-[13px] font-light leading-4 mb-4">{text}</p>
      <div className="absolute bottom-2 left-3 flex gap-2 items-center">
        <img src={img} alt="" />
        <div className="flex flex-col text-white">
          <span className="font-semibold text-[14px]">{name}</span>
          <span className="font-light text-[12px]">{role}</span>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  // Generate array of testimonial image numbers (1-13 based on your folder)
  const testimonialImages = Array.from({ length: 13 }, (_, i) => i + 1);
  
  // Optional: Add testimonial data if you want names and roles
  const testimonialData = [
    { name: "Hakim Lyon", role: "Data Scientist" },
    { name: "Jenifer Igwe", role: "Data Analyst" },
    { name: "Michael Johnson", role: "ML Engineer" },
    { name: "Sarah Chen", role: "Data Scientist" },
    { name: "David Kumar", role: "Business Analyst" },
    { name: "Emma Wilson", role: "Data Engineer" },
    { name: "James Rodriguez", role: "AI Researcher" },
    { name: "Lisa Thompson", role: "Data Scientist" },
    { name: "Alex Morgan", role: "Analytics Manager" },
    { name: "Rachel Davis", role: "Data Analyst" },
    { name: "Thomas Lee", role: "ML Engineer" },
    { name: "Nina Patel", role: "Data Scientist" },
    { name: "Chris Anderson", role: "Business Intelligence" },
  ];

  return (
    <section className="bg-black flex flex-col gap-8 py-12 lg:p-12 mt-[100px]">
      <h1 className="text-white text-center text-[40px] lg:text-[64px] font-bold leading-[58px] lg:leading-[80px]">
        Hear From Our Past Students
      </h1>
      
      <AutoScrollingBoxes duplicateCount={20} direction="left" speed={80}>
        {testimonialImages.map((imageNumber) => (
          <ImgCard
            key={imageNumber}
            img={`/testimonials/${imageNumber}.jpg`}
    
          />
        ))}
      </AutoScrollingBoxes>

      {/* Optional: Second row with different direction */}
      {/* <AutoScrollingBoxes duplicateCount={20} direction="right" speed={30}>
        {testimonialImages.slice(6).map((imageNumber) => (
          <ImgCard
            key={`row2-${imageNumber}`}
            img={`/img/testimonials/${imageNumber}.jpeg`}
            name={testimonialData[imageNumber - 1]?.name}
            role={testimonialData[imageNumber - 1]?.role}
          />
        ))}
      </AutoScrollingBoxes> */}
    </section>
  );
};

export default TestimonialSection;