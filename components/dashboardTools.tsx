import { ArrowRightIcon, LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface DashBoardToolsProps {
  tool: {
    title: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
  };
}
const DashBoardTools = ({ tool }: DashBoardToolsProps) => {
  return (
    <Card
      className={` mt-4 flex  items-center justify-between gap-4 p-2 hover:shadow-md transition`}
    >
      <div className={`p-2 ${tool.bgColor} ${tool.color} rounded-xl`}>
        <tool.icon className=" w-7 h-7" />
      </div>
      <h1 className="flex-1 text-xl font-semibold">{tool.title}</h1>
      <ArrowRightIcon className={`${tool.color} ${tool.bgColor} rounded-full p-1 w-8 h-8`} />
    </Card>
  );
};

export default DashBoardTools;
