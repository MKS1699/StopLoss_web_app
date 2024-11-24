"use client";

import { useEffect, useState } from "react";
import { AllIPOPropsTypes } from "../all/page";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardName } from "@/app/redux/slice/ipoSlice";

export interface IPOCardPropsTypes {
  ipoScreen: AllIPOPropsTypes["ipoScreen"];
}

interface IPOCardNamePropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["name"];
}
const IPOCardName = ({ ipoScreen, dataToEdit }: IPOCardNamePropsTypes) => {
  const dispatch = useAppDispatch();
  const [ipoName, setIPOName] = useState<IPOTypes["name"]>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setIPOName(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardName({ name: ipoName }));
  }, [ipoName]);
  return (
    <div className="w-full h-auto">
      <input
        type="text"
        name="ipo-card-name"
        id="ipo-card-name"
        className="outline-none indent-1 w-full text-2xl text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in border-b-2 border-solid border-dark dark:border-light"
        placeholder={ipoScreen === "create" ? "IPO Name" : dataToEdit}
        value={ipoName}
        onChange={(e) => setIPOName(e.currentTarget.value.toString())}
        title="Name of the IPO"
      />
    </div>
  );
};

export default IPOCardName;
