interface Props {
  img: string;
  title: string;
  text: string;
}
const FreeVideoCard = ({ img, title, text }: Props) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <img src={img} alt="" className="rounded-t-[32px]" />
        <h4 className="font-bold text-[20px] text-[#A3A3A3] leading-[22px]">
          {title}
        </h4>
        <p className="text-[#A3A3A3]">{text}</p>
      </div>
    </div>
  );
};

export default FreeVideoCard;
