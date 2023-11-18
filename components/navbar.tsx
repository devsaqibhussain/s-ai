"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import MobileSidebar from "./mobileSidebar";

const NavBar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <div className=" min-h-20 flex justify-between w-full p-2 items-center shadow-md">
      <MobileSidebar />

      {isSignedIn ? (
        <p className=" ml-2 text-2xl font-semibold">{user.fullName}</p>
      ) : (
        <p className=" ml-2 text-2xl font-semibold">Guest</p>
      )}
      <div className="">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </div>
  );
};

export default NavBar;
