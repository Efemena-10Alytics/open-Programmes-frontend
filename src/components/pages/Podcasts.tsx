import { FaArrowRight } from "react-icons/fa";
import PodCastsLayout from "../podcasts/PodCastsLayout";
import DynamicBanner from "../layout/DynamicBanner";

interface PodcastCardProps {
  img: string;
  title: string;
  episodecCount: string;
  date: string;
  author: string;
}

const PodcastCard = ({
  img,
  title,
  date,
  episodecCount,
  author,
}: PodcastCardProps) => {
  return (
    <div className="flex items-center gap-2  border-2 border[#0000001A] rounded-[24px] p-4">
      <img src={img} alt="" className="w-[130px] h-[121px] rounded-[8px]" />
      <div className="flex flex-col gap-2">
        <h5 className="text-[#6D6D6D] text-[14px] font-bold">{title}</h5>
        <div className="flex  items-center gap-3 text-[#6D6D6D] text-[12px] border-b border-[#E4E4E4] pb-2">
          <div className="flex items-center gap-1">
            <img src="/svg/podcast-icon4.svg" alt="" />
            <span>Episode {episodecCount}</span>
          </div>{" "}
          <div className="flex items-center gap-1">
            <img src="/svg/calendar4.svg" alt="" />
            <span> {date}</span>
          </div>
        </div>
        <div className="flex justify-between text-[#6D6D6D] text-[12px]">
          <div className="flex items-center gap-1">
            <img src="/svg/podcast-icon3.svg" alt="" />
            <span>By {author}</span>
          </div>
          <img src="/svg/play4.svg" alt="" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Podcasts = () => {
  return (
    <div className="w-11/12 mx-auto">
      <DynamicBanner
        img="svg/podimg.svg"
        header="Podcast"
        links={[
          { text: "Home", to: "/" },
          { text: "Podcast", to: "/podcasts" },
        ]}
      />
      <PodCastsLayout>
        <div className="flex justify-between items-center border-2 border-[#0000001A] rounded-[10px] text-[12px] text-[#6D6D6D] font-light p-4 mb-6">
          <span>Showing 1-10 of 50 Results</span>
          <div className="flex items-center gap-2 border border-[#DDDDDD] lg:w-[230px] rounded-[10px] p-2 cursor-pointer">
            <img src="/svg/filter2.svg" alt="" />
            <span>Default Sorting</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5 mb-12">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <PodcastCard
                img="/img/blog-img.png"
                title={`Unveiling the magic of data science Ep ${index + 1}`}
                author="Linda Clarke"
                date="27 June, 2024"
                episodecCount="18"
                key={index}
              />
            ))}
        </div>

        <div className="w-full lg:w-[682px] flex items-center justify-center gap-2 mb-6">
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            1
          </span>
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            2
          </span>
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            3
          </span>

          <span className="bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#FFFFFF] font-light cursor-pointer">
            <FaArrowRight />
          </span>
        </div>
      </PodCastsLayout>
    </div>
  );
};

export default Podcasts;
