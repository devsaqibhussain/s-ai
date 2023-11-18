"use client";

import Image from "next/image";
import { CodeIcon, ImageIcon, LayoutDashboardIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

const tools = [
  {
    title: "DashBoard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
    bgColor: "bg-sky-500/10",
    color: "text-sky-500",
  },
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
    title: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    bgColor: "bg-orange-500/10",
    color: "text-orange-500",
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
];

const SideBar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-slate-800 flex flex-col items-center w-72 h-full fixed">
      <div className=" flex items-center space-x-2 w-full p-4">
        <div className="relative w-10 h-10 ">
          <Image src={"/logo.jpg"} alt="logo" fill className=" rounded-full" />
        </div>
        <p className=" text-2xl font-extrabold text-white">S - AI</p>
      </div>
      <div className=" w-full p-4 space-y-4">
        {tools.map((tool) => (
          <Link
            href={tool.href}
            key={tool.href}
            className={cn(
              `w-full p-2 flex space-x-4 items-center rounded-xl hover:bg-slate-500/10 transition ${
                pathName === tool.href && tool.bgColor
              }`
            )}
          >
            <div
              className={cn(
                " relative h-10 w-10 p-2 rounded-xl",
                tool.color,
                tool.bgColor
              )}
            >
              <tool.icon />
            </div>
            <p className={cn(" text-lg", tool.color)}>{tool.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
