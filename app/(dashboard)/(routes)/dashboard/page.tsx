import Link from "next/link";

import DashBoardTools from "@/components/dashboardTools";
import {
  CodeIcon,
  ImageIcon,
  LucideLayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
} from "lucide-react";
import PageHeading from "@/components/pageHeading";

const tools = [
  {
    title: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    bgColor: "bg-emerald-500/10",
    color: "text-emerald-500",
  },
  {
    title: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    bgColor: "bg-violet-500/10",
    color: "text-violet-500",
  },
  {
    title: "Audio Generation",
    href: "/audio",
    icon: MusicIcon,
    bgColor: "bg-red-500/10",
    color: "text-red-500",
  },
  {
    title: "Code Generation",
    href: "/code",
    icon: CodeIcon,
    bgColor: "bg-pink-500/10",
    color: "text-pink-500",
  },
  {
    title: "Settings",
    href: "/setting",
    icon: Settings,
    bgColor: "bg-slate-500/10",
    color: "text-slate-500",
  },
];

const DashBoard = () => {
  return (
    <div className=" w-full p-5 sm:p-12 lg:p-20">
      <PageHeading
        title="DashBoard"
        description="One stop for all your AI needs"
        icon={LucideLayoutDashboard}
        color="text-cyan-500"
        bgColor="bg-cyan-500/10"
      />

      {tools.map((tool) => (
        <Link href={tool.href} key={tool.href}>
          <DashBoardTools tool={tool} />
        </Link>
      ))}
    </div>
  );
};

export default DashBoard;
