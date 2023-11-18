import { LucideMenu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";

const MobileSidebar = () => {
  return (
    <div className=" md:hidden">
      <Sheet>
        <SheetTrigger>
          <LucideMenu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 w-72">
          <SideBar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
