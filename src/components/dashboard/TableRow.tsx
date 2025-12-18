import React from "react";

interface Props {
  img: string;
  title: string;
  lesson: string;
  status: "Ongoing" | "Completed" | "Next Lesson";
  level: string;
  trainer: string;
}
const TableRow = ({ img, title, lesson, status, level, trainer }: Props) => {
  return (
    <tr className="bg-white">
      <th
        scope="row"
        className="flex items-center gap-2 px-6 py-1 whitespace-nowrap"
      >
        <img
          src={img}
          alt=""
          className="w-[40px] h-[40px] object-cover rounded-[3px]"
        />
        <span className="font-normal">{title}</span>
      </th>
      <td className="px-6 py-1">{lesson}</td>
      <td className="py-1">
        {" "}
        <div
          className={`${
            status === "Ongoing"
              ? "bg-[#2684FF2B] text-[#2684FF]"
              : status === "Completed"
              ? "bg-[#71FF652B] text-[#077626]"
              : status === "Next Lesson"
              ? "bg-[#FFE7E7]  text-[#CA2421]"
              : ""
          } flex justify-center items-center text-[9px] px-4 h-5 rounded-full`}
        >
          {status}
        </div>
      </td>
      <td className="px-6 py-1">{level}</td>
      <td className="px-6 py-1">
        <img
          src={trainer}
          alt=""
          className="w-[40px] h-[40px] object-cover rounded-full"
        />
      </td>
    </tr>
  );
};

export default TableRow;
