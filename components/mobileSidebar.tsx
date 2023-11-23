import { LucideMenu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";

interface MobileSidebarProps {
  counter: number;
  isPro: boolean;
}

const MobileSidebar = ({ counter, isPro }: MobileSidebarProps) => {
  return (
    <div className=" md:hidden">
      <Sheet>
        <SheetTrigger>
          <LucideMenu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 w-72">
          <SideBar counter={counter} isPro={isPro} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
