"use client";

import { useAppDispatch } from "@/app/hooks";
import {
  changeAdminPanelScreen,
  resetAdminPanelState,
} from "@/app/redux/slice/adminPanelSlice";
import {
  setAdminScreen,
  setAppAdminGuestMode,
  setAppAdminLoginStatus,
} from "@/app/redux/slice/appSlice";
import { resetPostState } from "@/app/redux/slice/postSlice";
import { resetSession } from "@/app/redux/slice/sessionSlice";
import { StyledComponent } from "@/app/types/component_types";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { MdOutlineEditNote, MdOutlinePostAdd } from "react-icons/md";
// styles
import "../components/css/styles.css";
interface UserMenuPropsTypes extends StyledComponent {
  showUserMenu?: boolean;
  setShowUserMenu?: (val: boolean) => void;
  guestMode: boolean;
  userName: string;
  menuExpansion?: "open" | "close" | "idle";
}

const UserMenu = ({
  showUserMenu,
  setShowUserMenu,
  guestMode,
  userName,
  menuExpansion,
}: UserMenuPropsTypes) => {
  const dispatch = useAppDispatch();

  // user menu functions
  // logout function
  function logout() {
    if (!guestMode) {
      // reset session
      dispatch(resetSession());
      // reset post state
      dispatch(resetPostState());
      // reset admin panel state
      dispatch(resetAdminPanelState());
      // reset login
      dispatch(setAppAdminLoginStatus({ loginStatus: false }));
      // back to login screen
      dispatch(setAdminScreen({ screen: "login" }));
      // logging out message
      toast.success(`${userName} successfully logged out.`);
      // closing user menu
      // setShowUserMenu(false);
    } else {
      dispatch(resetSession());
      dispatch(resetAdminPanelState());
      dispatch(resetPostState());
      dispatch(setAppAdminLoginStatus({ loginStatus: false }));
      dispatch(setAdminScreen({ screen: "login" }));
      dispatch(setAppAdminGuestMode({ guestMode: false }));
      toast.success(`Logged out.`);
      // setShowUserMenu(false);
    }
  }

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuExpansion === "close") {
      menuRef.current?.classList?.replace("user-menu-show", "user-menu-hide");
    } else if (menuExpansion === "open") {
      menuRef.current?.classList?.replace("user-menu-hide", "user-menu-show");
    } else {
      menuRef.current?.classList?.add("user-menu-hide");
    }
  }, [menuExpansion]);
  return (
    // bg-[#4cb050]  dark:bg-[#003b31]
    <div
      className="w-full h-auto flex flex-col items-center justify-evenly bg-light bg-opacity-20 rounded-sm p-1 text-lg text-center relative"
      ref={menuRef}
    >
      {/* to do menu functions */}
      {/* todo: change user profile picture */}
      <div className="w-full border-b-2 border-b-solid border-b-[#c0c0c0] my-2">
        Profile Picture
      </div>
      {/* todo : change password menu functionality */}
      <div className="w-full border-b-2 border-b-solid border-b-[#c0c0c0] my-2">
        Password
      </div>
      {/* todo: change user name functionality */}
      <div className="w-full border-b-2 border-b-solid border-b-[#c0c0c0] my-2">
        User&nbsp;Name
      </div>
      {/* logging out the user */}
      <div
        className="w-full border-b-2 border-b-solid border-b-[#c0c0c0] my-2"
        onClick={logout}
      >
        Logout
      </div>
    </div>
  );
};

export default UserMenu;
