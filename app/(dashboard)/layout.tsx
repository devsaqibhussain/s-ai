import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { GetApiCount } from "@/lib/db/databaseFunctions";
import { isSubscribed } from "@/lib/subscription";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const counter = await GetApiCount();
  const isPro = await isSubscribed();
  return (
    <div className=" relative h-screen flex w-full">
      <div className="hidden md:block">
        <SideBar counter = {counter} isPro = {isPro}/>
      </div>
      <div className=" md:pl-72 w-full">
        <NavBar counter = {counter} isPro={isPro}/>
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
