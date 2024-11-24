"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// image
import LOGO from "@/public/logo.png";
// icons
import {
  MdPlayArrow,
  MdPostAdd,
  MdOutlineEditNote,
  MdListAlt,
  MdOutlinePostAdd,
} from "react-icons/md";
import { BsCardText } from "react-icons/bs";

// styles
import "../components/css/styles.css";
import { User } from ".";
import { ThemeEnabler } from "@/app/components";
import { useAppDispatch, useTheme } from "@/app/hooks";
import { changeAdminPanelScreen } from "@/app/redux/slice/adminPanelSlice";
import toast from "react-hot-toast";

const VerticalMenu = () => {
  const dispatch = useAppDispatch();
  const [animationType, setAnimationType] = useState<"open" | "close" | "idle">(
    "idle"
  );
  const theme = useTheme();
  function handleMenuExpansion(
    pointer: HTMLDivElement | null,
    parentPointer: HTMLDivElement | null
  ): void {
    if (parentPointer) {
      if (parentPointer?.classList.contains("width-expand")) {
        parentPointer?.classList.replace("width-expand", "width-collapse");
      } else if (parentPointer?.classList.contains("width-collapse")) {
        parentPointer?.classList.replace("width-collapse", "width-expand");
      } else {
        parentPointer?.classList.add("width-expand");
      }
    }
    if (pointer) {
      // handling pointer animation
      if (pointer.classList.contains("pointer-expand")) {
        pointer.classList.replace("pointer-expand", "pointer-collapse");
      } else if (pointer.classList.contains("pointer-collapse")) {
        pointer.classList.replace("pointer-collapse", "pointer-expand");
      } else {
        pointer.classList.add("pointer-collapse");
      }
    }
  }
  function handleAnimationType() {
    // this will trigger further animations
    if (animationType === "close") {
      setAnimationType("open");
    } else if (animationType === "open") {
      setAnimationType("close");
    } else if (animationType === "idle") {
      setAnimationType("open");
    }
  }

  const parentRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  // handling animations
  useEffect(() => {
    if (animationType === "open" || animationType === "close") {
      handleMenuExpansion(pointerRef.current, parentRef.current);
    }
  }, [animationType]);

  // create post
  function createPost() {
    dispatch(changeAdminPanelScreen({ screen: "createPost" }));
    toast("Create Post", {
      icon: <MdOutlinePostAdd size="2rem" />,
    });
  }

  // edit post
  function editPost() {
    dispatch(changeAdminPanelScreen({ screen: "editPost" }));
    toast("Editing Post", { icon: <MdOutlineEditNote size="2rem" /> });
  }

  // all posts
  function allPosts() {
    dispatch(changeAdminPanelScreen({ screen: "allPosts" }));
  }

  // ipo cards
  function handleIPOCards() {
    dispatch(changeAdminPanelScreen({ screen: "ipo" }));
  }

  return (
    <div
      className="min-h-screen max-h-full w-16 bg-dark text-light z-10 -m-1 flex flex-col items-center justify-items-center justify-between relative p-2 gap-2"
      ref={parentRef}
    >
      {/* menu expand collapse Icon */}
      <div
        className="absolute z-50 top-0 cursor-pointer -right-7 text-dark pl-1 ml-0"
        onClick={handleAnimationType}
        ref={pointerRef}
      >
        <MdPlayArrow className={`w-8 h-8 `} />
      </div>
      {/* logo */}
      <div className="w-full h-auto flex flex-col cursor-pointer gap-2">
        <div className="flex-1 flex flex-row gap-1 justify-start">
          <Image
            src={LOGO}
            alt="StopLoss Logo"
            width={60}
            height={60}
            quality={100}
            className="p-1 w-12 h-12 self-center"
          />
          <h3
            className={`
            h-fit text-2xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0"} 
            `}
          >
            StopLoss
          </h3>
        </div>
        {/* separator */}
        <div className="w-full h-[1.5px] bg-[#c0c0c0] rounded-xl"></div>
      </div>
      {/* All Posts */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-start hover:bg-light hover:bg-opacity-20 hover:rounded-md"
        title="All Posts"
        onClick={allPosts}
      >
        <div className="self-center justify-center">
          <MdListAlt className="w-12 h-12 text-light p-1" />
        </div>
        <h3
          className={`h-fit text-xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0"} `}
        >
          All&nbsp;Posts
        </h3>
      </div>
      {/* Create Post Menu */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-start hover:bg-light hover:bg-opacity-20 hover:rounded-md"
        title="Create Post"
        onClick={createPost}
      >
        <div className="self-center justify-center ">
          <MdPostAdd className="w-12 h-12 text-light p-1" />
        </div>
        <h3
          className={`h-fit text-xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0"} `}
        >
          Create&nbsp;Post
        </h3>
      </div>
      {/* Edit Posts Menu */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-start hover:bg-light hover:bg-opacity-20 hover:rounded-md"
        title="Edit Post"
        onClick={editPost}
      >
        <div className="self-center justify-center">
          <MdOutlineEditNote className="w-12 h-12 text-light p-1" />
        </div>
        <h3
          className={`h-fit text-xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0"} `}
        >
          Edit&nbsp;Post
        </h3>
      </div>
      {/* IPO Cards */}
      {/* to do add IPO card create / edit / delete main page  */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-start hover:bg-light hover:bg-opacity-20 hover:rounded-md"
        title="Create IPO Cards"
        onClick={handleIPOCards}
      >
        <div className="self-center justify-center">
          <BsCardText className="w-12 h-12 text-light p-1" />
        </div>
        <h3
          className={`h-fit text-xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0"} `}
        >
          IPO&nbsp;Cards
        </h3>
      </div>
      {/* User Menu */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-start"
        title="User Menu"
      >
        <User
          verticalMenuAnimationFn={handleAnimationType}
          verticalMenuAnimation={animationType}
          menuExpansion={animationType}
        />
      </div>
      {/* theme  */}
      {/* theme needs some debugging */}
      <div
        className="w-full h-auto flex flex-row gap-1 cursor-pointer justify-around hover:bg-light hover:bg-opacity-20 hover:rounded-md"
        title="Theme"
      >
        <div className="self-center justify-center">
          <ThemeEnabler className="w-12 h-12 text-light p-1 self-center justify-center left-0" />
        </div>
        <h3
          className={`h-fit text-xl self-center 
            ${animationType === "open" && "title-show"} 
            ${animationType === "close" && "title-hide"} 
            ${animationType === "idle" && "opacity-0 w-0"} `}
        >
          {theme
            .toString()
            .split("")[0]
            .toUpperCase()
            .concat(theme.slice(1).toString().toLowerCase())}
          &nbsp;Theme
        </h3>
      </div>
    </div>
  );
};

export default VerticalMenu;
