"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import {
  setIPOCardAllotmentLink,
  setIPOCardAllotmentStatus,
} from "@/app/redux/slice/ipoSlice";

interface IPOCardAllotmentPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: {
    allotmentStatus: IPOTypes["allotmentStatus"];
    allotmentLink: IPOTypes["allotmentLink"];
  };
}

const IPOCardAllotment = ({
  ipoScreen,
  dataToEdit,
}: IPOCardAllotmentPropsTypes) => {
  const dispatch = useAppDispatch();
  const [allotmentStatus, setAllotmentStatus] =
    useState<IPOTypes["allotmentStatus"]>(false);
  const [allotmentLink, setAllotmentLink] =
    useState<IPOTypes["allotmentLink"]>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setAllotmentLink(dataToEdit.allotmentLink);
      setAllotmentStatus(dataToEdit.allotmentStatus);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardAllotmentLink({ allotmentLink }));
    dispatch(setIPOCardAllotmentStatus({ allotmentStatus }));
  }, [allotmentLink, allotmentStatus]);

  useEffect(() => {
    if (!allotmentStatus) {
      setAllotmentLink("");
    }
  }, [allotmentStatus]);

  return (
    <div className="w-full h-auto p-1 flex flex-col md:flex-row gap-2">
      {/* allotmentStatus */}
      <div className="w-full h-full flex flex-row items-center justify-evenly border-2 border-solid rounded-md text-dark ">
        <label
          htmlFor="ipo-card-allotment-link"
          className={`${
            allotmentStatus && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setAllotmentStatus(true)}
        >
          Allotment Out
        </label>
        <div
          className={`${
            !allotmentStatus && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setAllotmentStatus(false)}
        >
          Allotment Not Out
        </div>
      </div>
      {/* allotmentLink */}
      {allotmentStatus && (
        <input
          type="text"
          name="ipo-card-allotment-link"
          id="ipo-card-allotment-link"
          className="outline-none indent-1 w-full text-2xl text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in border-b-2 border-solid border-dark dark:border-light"
          placeholder={
            ipoScreen === "create"
              ? "Allotment Link"
              : dataToEdit?.allotmentLink
          }
          value={allotmentLink}
          onChange={(e) => setAllotmentLink(e.currentTarget.value.toString())}
          title="Allotment Link to check the allotment of the IPO from the Registrar."
        />
      )}
    </div>
  );
};

export default IPOCardAllotment;
