"use client";

import { useAppDispatch } from "@/app/hooks";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { setIPOCardExPremium } from "@/app/redux/slice/ipoSlice";

interface IPOCardExPremiumPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: string;
}

const IPOCardExPremium = ({
  ipoScreen,
  dataToEdit,
}: IPOCardExPremiumPropsTypes) => {
  const dispatch = useAppDispatch();
  const [exPremium, setExPremium] = useState<string>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setExPremium(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardExPremium({ exPremium }));
  }, [exPremium]);

  return (
    <div className="w-full h-auto p-1 text-xl flex flex-row md:flex-col">
      <label
        htmlFor="ipo-card-ex-premium"
        className="w-fit md:w-full px-1 text-center dark:text-light"
      >
        Ex.&nbsp;Premium
      </label>
      <input
        type="text"
        name="ipo-card-ex-premium"
        id="ipo-card-ex-premium"
        className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
        placeholder={ipoScreen === "create" ? "Ex. Premium" : dataToEdit}
        value={exPremium}
        onChange={(e) => setExPremium(e.currentTarget.value.toString())}
        title="Expected Premium of the IPO"
      />
    </div>
  );
};

export default IPOCardExPremium;
