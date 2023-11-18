import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";


const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative h-screen flex w-full">
      <div className="hidden md:block">
        <SideBar/>
      </div>
      <div className=" md:pl-72 w-full">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
