"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardCategory } from "@/app/redux/slice/ipoSlice";

interface IPOCardCategoryPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["category"];
}

const IPOCardCategory = ({
  ipoScreen,
  dataToEdit,
}: IPOCardCategoryPropsTypes) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<IPOTypes["category"]>("mainboard");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setCategory(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardCategory({ category }));
  }, [category]);
  return (
    <div className="w-full h-fit flex flex-col gap-1">
      <h3 className="w-full h-fit text-xl text-center dark:text-light">
        Category
      </h3>
      <div className="w-full h-fit flex flex-row items-center justify-evenly border-2 border-solid rounded-md text-dark ">
        <div
          className={`${
            category === "mainboard" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setCategory("mainboard")}
        >
          Mainboard
        </div>
        <div
          className={`${
            category === "sme" && "bg-dark text-light"
          } w-full h-full text-center cursor-pointer transition-all duration-500 ease-in dark:text-light`}
          onClick={() => setCategory("sme")}
        >
          SME
        </div>
      </div>
    </div>
  );
};

export default IPOCardCategory;
