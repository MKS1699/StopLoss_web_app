"use client";

import { useAppDispatch, useAppSelector, useGuestMode } from "@/app/hooks";
import { StyledComponent } from "@/app/types/component_types";
import { barlow } from "@/app/utils/fonts";
import React, { HTMLProps, MouseEvent, useEffect, useState } from "react";
import { UserMenu } from ".";
interface UserPropsTypes extends StyledComponent {
  userIconClass?: React.ComponentProps<"div">["className"];
  verticalMenuAnimationFn?: () => void;
  verticalMenuAnimation?: "idle" | "open" | "close";
  menuExpansion?: "open" | "close" | "idle";
}

const User = ({
  className,
  userIconClass,
  verticalMenuAnimationFn,
  verticalMenuAnimation,
  menuExpansion,
}: UserPropsTypes) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.session.userName);
  const userId = useAppSelector((state) => state.session.userId);

  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const guestMode = useGuestMode();

  function handleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }

  // auto closing of user menu
  // based on verticalMenu
  useEffect(() => {
    if (verticalMenuAnimation) {
      if (verticalMenuAnimation === "close") {
        setShowUserMenu(false);
      }
    }
  }, [verticalMenuAnimation]);

  return (
    <div
      className={`${barlow.className} w-full h-full self-center justify-self-center flex flex-col gap-2 ${className}`}
      onClick={verticalMenuAnimationFn}
    >
      {/* user icon */}
      <div
        className={`w-8 h-8 bg-[#4cb050] text-light font-thin rounded-full self-center justify-self-center text-center text-xl cursor-pointer ${userIconClass}`}
        onClick={handleUserMenu}
      >
        {/* to do */}
        {/* make user profile picture compulsory */}
        {/* set profile picture as icon */}
        {/* show username on vertical menu expansion */}
        {guestMode ? "G" : userName?.charAt(0).toUpperCase()}
      </div>
      {/* user menu */}
      <div className="px-1">
        <UserMenu
          userName={userName}
          guestMode={guestMode}
          setShowUserMenu={setShowUserMenu}
          showUserMenu={showUserMenu}
          menuExpansion={menuExpansion}
        />
      </div>
    </div>
  );
};

export default User;
