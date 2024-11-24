"use client";

import { useAppDispatch } from "@/app/hooks";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { setIPOCardLotSize } from "@/app/redux/slice/ipoSlice";

interface IPOCardLotSizePropsTypes extends IPOCardPropsTypes {
  dataToEdit?: string;
}

const IPOCardLotSize = ({
  ipoScreen,
  dataToEdit,
}: IPOCardLotSizePropsTypes) => {
  const dispatch = useAppDispatch();
  const [lotSize, setLotSize] = useState<string>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setLotSize(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardLotSize({ lotSize }));
  }, [lotSize]);

  return (
    <div className="w-full h-auto p-1 text-xl flex flex-row md:flex-col">
      <label
        htmlFor="ipo-card-lot-size"
        className="w-fit md:w-full px-1 text-center dark:text-light"
      >
        Lot Size
      </label>
      <input
        type="text"
        name="ipo-card-lot-size"
        id="ipo-card-lot-size"
        className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
        placeholder={ipoScreen === "create" ? "Lot Size" : dataToEdit}
        value={lotSize}
        onChange={(e) => setLotSize(e.currentTarget.value.toString())}
        title="Lot Size of the IPO"
      />
    </div>
  );
};

export default IPOCardLotSize;
