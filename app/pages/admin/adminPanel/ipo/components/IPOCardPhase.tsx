"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardIPOPhase } from "@/app/redux/slice/ipoSlice";

interface IPOCardPhasePropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["ipoPhase"];
}

const IPOCardPhase = ({ ipoScreen, dataToEdit }: IPOCardPhasePropsTypes) => {
  const dispatch = useAppDispatch();
  const [ipoPhase, setIpoPhase] = useState<IPOTypes["ipoPhase"]>("upcoming");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setIpoPhase(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardIPOPhase({ ipoPhase }));
  }, [ipoPhase]);
  return (
    <div className="w-full h-fit flex flex-col gap-1">
      <h3 className="w-full h-fit text-xl text-center dark:text-light">
        Phase
      </h3>
      <div className="w-full h-fit flex flex-row items-center justify-evenly border-2 border-solid rounded-md text-dark ">
        <div
          className={`${
            ipoPhase === "upcoming" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setIpoPhase("upcoming")}
        >
          Upcoming
        </div>
        <div
          className={`${
            ipoPhase === "current" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setIpoPhase("current")}
        >
          Current
        </div>
        <div
          className={`${
            ipoPhase === "listed" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setIpoPhase("listed")}
        >
          Listed
        </div>
      </div>
    </div>
  );
};

export default IPOCardPhase;
