"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import MobileSidebar from "./mobileSidebar";

interface NavBarProps {
  counter: number;
  isPro: boolean;
}
const NavBar = ({ counter, isPro }: NavBarProps) => {
  const { isSignedIn, user } = useUser();
  return (
    <div className=" min-h-20 flex justify-between w-full p-2 items-center shadow-md">
      <MobileSidebar counter={counter} isPro={isPro} />

      {isSignedIn ? (
        <p className=" ml-2 text-2xl font-semibold">{user.fullName}</p>
      ) : (
        <p className=" ml-2 text-2xl font-semibold">Guest</p>
      )}
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
