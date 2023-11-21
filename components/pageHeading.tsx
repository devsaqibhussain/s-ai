import { LucideIcon } from "lucide-react";
import React from "react";

interface pageHeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  margin?: string;
  bgColor?: string;
}

const PageHeading = ({
  title,
  description,
  icon: Icon,
  color,
  margin,
  bgColor
}: pageHeadingProps) => {
  return (
    <div className={`flex items-center gap-2 ${margin || "mb-10"}`}>
      <div className={` p-2 ${bgColor} rounded-xl`}>
        <Icon className={` h-10 w-10 ${color}`} />
      </div>
      <div className=" -space-y-1">
        <h1 className=" text-xl font-bold">{title}</h1>
        <p className=" text-sm font-semibold text-black/50">{description}</p>
      </div>
    </div>
  );
};

export default PageHeading;
