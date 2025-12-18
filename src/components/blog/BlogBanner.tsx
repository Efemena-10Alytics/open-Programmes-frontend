import Link from "next/link";

interface Props {
  heading: string;
}

const BlogBanner = ({ heading }: Props) => {
  return (
    <div className="relative h-[200px] lg:h-[250px]">
      <div className="absolute text-white flex flex-col justify-center items-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
        <h1 className="text-[20px] lg:text-[32px] text-center lg:w-[55%] font-bold leading-7 lg:leading-10">
          {heading}
        </h1>
        <div className="flex items-center gap-1 text-[14px] lg:text-[20px]">
          <span>
            <Link href="/" className="font-light">
              Home
            </Link>
          </span>
          <span className="text-[18px]">{">"}</span>
          <span>
            <Link href="/blog" className="font-semibold">
              Blog
            </Link>
          </span>
        </div>
      </div>
      <img
        src="/img/blog-header.png"
        alt=""
        className="w-full h-[200px] lg:h-[250px] object-cover absolute top-0 right-0 rounded-[18px]"
      />
      <div className="bg-[#00000099] h-full w-full absolute top-0 right-0 z-40 rounded-[18px]"></div>
    </div>
  );
};
export default BlogBanner;
