"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardStatus } from "@/app/redux/slice/ipoSlice";

interface IPOCardStatusPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["status"];
}

const IPOCardStatus = ({ ipoScreen, dataToEdit }: IPOCardStatusPropsTypes) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<IPOTypes["status"]>("pre");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setStatus(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardStatus({ status }));
  }, [status]);
  return (
    <div className="w-full h-fit flex flex-col gap-1">
      <h3 className="w-full h-fit text-xl text-center dark:text-light">
        Status
      </h3>
      <div className="w-full h-fit flex flex-row items-center justify-evenly border-2 border-solid rounded-md text-dark ">
        <div
          className={`${
            status === "pre" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setStatus("pre")}
        >
          Pre Apply
        </div>
        <div
          className={`${
            status === "apply" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setStatus("apply")}
        >
          Apply
        </div>
        <div
          className={`${
            status === "closed" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setStatus("closed")}
        >
          Closed
        </div>
      </div>
    </div>
  );
};

export default IPOCardStatus;
