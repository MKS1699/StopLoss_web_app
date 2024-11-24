"use client";

import { barlow, pacifico } from "@/app/utils/fonts";
import LOGO from "@/public/Logo.svg";
import Image from "next/image";
import { User, VerticalMenu } from ".";
import { ThemeEnabler } from "@/app/components";

const AdminTitleBar = () => {
  return (
    <div className="w-full h-auto flex flex-row justify-around">
      <h1
        className={`${barlow.className} flex-1 font-thin text-[#4CB050] text-5xl self-center w-full h-fit  md:justify-self-start`}
      >
        stoploss.live
      </h1>
      <User userIconClass="md:!justify-self-end" />
      <ThemeEnabler className="!justify-items-end" />
    </div>
  );
};

export default AdminTitleBar;
