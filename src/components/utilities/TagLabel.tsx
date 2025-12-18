interface Props {
  text: string;
  bgColor: string;
}
const TagLabel = ({ text, bgColor }: Props) => {
  return (
    <div
      className={`bg-[${bgColor}] w-fit flex  justify-center items-center px-3 py-2 text-[#828282] text-[14px] font-light`}
    >
      {text}
    </div>
  );
};

export default TagLabel;
