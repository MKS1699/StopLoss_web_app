"use client";

import { useAppDispatch } from "@/app/hooks";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { setIPOCardOfferPrice } from "@/app/redux/slice/ipoSlice";

interface IPOCardOfferPricePropsTypes extends IPOCardPropsTypes {
  dataToEdit?: string;
}

const IPOCardOfferPrice = ({
  ipoScreen,
  dataToEdit,
}: IPOCardOfferPricePropsTypes) => {
  const dispatch = useAppDispatch();
  const [offerPrice, setOfferPrice] = useState<string>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setOfferPrice(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardOfferPrice({ offerPrice }));
  }, [offerPrice]);

  return (
    <div className="w-full h-auto p-1 text-xl flex flex-row md:flex-col">
      <label
        htmlFor="ipo-card-offer-price"
        className="w-fit md:w-full px-1 text-center dark:text-light"
      >
        Offer Price
      </label>
      <input
        type="text"
        name="ipo-card-offer-price"
        id="ipo-card-offer-price"
        className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
        placeholder={ipoScreen === "create" ? "Offer Price" : dataToEdit}
        value={offerPrice}
        onChange={(e) => setOfferPrice(e.currentTarget.value.toString())}
        title="Offer Price of the IPO"
      />
    </div>
  );
};

export default IPOCardOfferPrice;
