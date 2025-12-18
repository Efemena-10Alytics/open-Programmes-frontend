interface Props {
  img: string;
  title: string;
}
const BlogPostCard = ({ img, title }: Props) => {
  return (
    <div className="w-full lg:w-[282px]">
      <div className="flex flex-col gap-3">
        <img src={img} alt="" className="rounded-t-[32px]" />
        <h4 className="text-[18px] text-[#A3A3A3] leading-[22px]">{title}</h4>
      </div>
    </div>
  );
};

export default BlogPostCard;
