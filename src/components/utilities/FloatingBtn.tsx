import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

const FloatingBtn = () => {
  return (
    <Link
      href="https://wa.link/svf2wi"
      className="fixed right-[90px] lg:right-28  bottom-20 flex flex-col"
      target="_blank"
    >
      <div className="bg-[#25D366] flex items-center justify-center text-white text-[28px] self-end h-[50px] w-[50px] relative rounded-full -right-16 top-9">
        <BsWhatsapp className=" " />
      </div>
    </Link>
  );
};

export default FloatingBtn;
