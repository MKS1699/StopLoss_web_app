"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AllPosts from "../allPosts/page";
import CreatePost from "../createPost/page";
import EditPost from "../editPost/page";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { PanelMenu } from ".";
import UserSettings from "./UserSettings";
import { changeAdminPanelScreen } from "@/app/redux/slice/adminPanelSlice";

import { MdOutlinePostAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { IPOMainScreen } from "../ipo/components";

const PanelScreen = () => {
  const dispatch = useAppDispatch();
  const panelScreen: string = useAppSelector(
    (state) => state.adminPanel.panelScreen
  );
  // const [showPanelMenu, setShowPanelMenu] = useState<boolean>(false);
  function handleNewPost() {
    if (panelScreen !== "createPost") {
      dispatch(changeAdminPanelScreen({ screen: "createPost" }));
      toast("Create Post", {
        icon: <MdOutlinePostAdd size="2rem" />,
      });
    } else {
      toast.error("Already creating a Post.");
    }
  }
  return (
    <div className="w-full h-full flex-1">
      {/* panel screens */}
      {/* All Posts Panel */}
      {panelScreen === "allPosts" && <AllPosts />}
      {/* Create New Post Panel */}
      {panelScreen === "createPost" && <CreatePost />}
      {/* Edit/Delete Post Panel */}
      {panelScreen === "editPost" && <EditPost />}
      {/* this user settings will be updated soon */}
      {/* update with the user menu functions */}
      {/* User's Settings */}
      {panelScreen === "userSettings" && <UserSettings />}
      {/* IPO card screen */}
      {panelScreen === "ipo" && <IPOMainScreen />}
    </div>
  );
};

export default PanelScreen;
