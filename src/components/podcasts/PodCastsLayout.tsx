import { IoSearch } from "react-icons/io5";
import TagLabel from "../utilities/TagLabel";
import Card from "../blog/Card";

export default function PodCastsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-7 mt-[60px]">
      <div className="lg:flex-[0.65]">{children}</div>
      <div className="lg:flex-[0.35] flex flex-col gap-8 mb-10 lg:mb-0">
        <Card heading="Search">
          <div className="bg-white flex gap-3 items-center border-2 border-[#0000001A] px-3 h-[56px] rounded-full">
            <IoSearch className="text-[#6D6D6D]" />
            <input
              type="text"
              placeholder="Enter key word"
              className="w-full h-full outline-none rounded-full bg-transparent placeholder:text-[12px]"
            />
          </div>
        </Card>
        <Card heading="Categories">
          <div className="flex flex-col gap-3">
            <div className="bg-white flex gap-1 items-center text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <img src="/svg/podcast-icon1.svg" alt="" />
              <span className="text-[#6D6D6D]">Data analytics Podcast (1)</span>
            </div>
            <div className="bg-white flex gap-3 items-center text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <img src="/svg/podcast-icon1.svg" alt="" />
              <span className="text-[#6D6D6D]">Data analytics Podcast (1)</span>
            </div>
            <div className="bg-white flex gap-3 items-center text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <img src="/svg/podcast-icon1.svg" alt="" />
              <span className="text-[#6D6D6D]">Data analytics Podcast (1)</span>
            </div>
            <div className="bg-white flex gap-3 items-center text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <img src="/svg/podcast-icon1.svg" alt="" />
              <span className="text-[#6D6D6D]">Data analytics Podcast (1)</span>
            </div>
            <div className="bg-white flex gap-3 items-center text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <img src="/svg/podcast-icon1.svg" alt="" />
              <span className="text-[#6D6D6D]">Data analytics Podcast (1)</span>
            </div>
          </div>
        </Card>
        <Card heading="Recent Posts">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <img
                      src="/img/blog-img.png"
                      alt=""
                      className="w-[130px] h-[89px] object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col gap-2 text-[12px] text-[#6D6D6D]">
                      <h3 className="text-[14px] font-bold">
                        Unveiling the magic of data science
                      </h3>
                      <div className="flex  items-center gap-3 border-b border-[#E4E4E4] pb-2">
                        <div className="flex items-center gap-1">
                          <img src="/svg/podcast-icon4.svg" alt="" />
                          <span>Episode 18</span>
                        </div>{" "}
                        <div className="flex items-center gap-1">
                          <img src="/svg/calendar4.svg" alt="" />
                          <span>27 June, 2024</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src="/svg/podcast-icon3.svg" alt="" />
                        <span>By Linda Clarke</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
