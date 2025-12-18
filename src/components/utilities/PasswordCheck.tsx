import { GiCheckMark } from "react-icons/gi";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";

interface Props {
  password: string;
}

const PasswordCheck = ({ password }: Props) => {
  const validatePassword = usePasswordValidation();
  const { checks } = validatePassword(password);
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 mb-2 italic text-[10px]">
      <div
        className={`flex gap-1 items-center px-3 py-2 rounded rounded-xs ${
          checks.length
            ? "bg-[#BEEDD9] text-[#14744C] border border-[#14744C]"
            : "bg-[#F0F0F0] text-[#A5A5A5]"
        }`}
      >
        <GiCheckMark />
        <span>8 Characters</span>
      </div>
      <div
        className={`flex gap-1 items-center px-3 py-2 rounded rounded-xs ${
          checks.uppercase
            ? "bg-[#BEEDD9] text-[#14744C] border border-[#14744C]"
            : "bg-[#F0F0F0] text-[#A5A5A5]"
        }`}
      >
        <GiCheckMark />
        <span>1 upper case</span>
      </div>
      <div
        className={`flex gap-1 items-center px-3 py-2 rounded rounded-xs ${
          checks.lowercase
            ? "bg-[#BEEDD9] text-[#14744C] border border-[#14744C]"
            : "bg-[#F0F0F0] text-[#A5A5A5]"
        }`}
      >
        <GiCheckMark />
        <span>1 lower case</span>
      </div>
      {/* <div
        className={`${
          checks.number ? "text-green-500" : "text-red-500"
        }`}
      >
        At least one number
      </div> */}
      <div
        className={`flex gap-1 items-center px-3 py-2 rounded rounded-xs ${
          checks.specialChar
            ? "bg-[#BEEDD9] text-[#14744C] border border-[#14744C]"
            : "bg-[#F0F0F0] text-[#A5A5A5]"
        }`}
      >
        <GiCheckMark /> <span>A special character</span>
      </div>
    </div>
  );
};
export default PasswordCheck;
