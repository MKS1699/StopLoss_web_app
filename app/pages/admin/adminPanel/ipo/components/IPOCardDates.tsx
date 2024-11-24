"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardDates } from "@/app/redux/slice/ipoSlice";

interface IPOCardDatesPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["dates"];
}

const IPOCardDates = ({ ipoScreen, dataToEdit }: IPOCardDatesPropsTypes) => {
  const dispatch = useAppDispatch();
  const [dates, setDates] = useState<IPOTypes["dates"]>({
    close: "",
    listing: "",
    open: "",
  });
  const [open, setOpen] = useState<IPOTypes["dates"]["open"]>("");
  const [close, setClose] = useState<IPOTypes["dates"]["close"]>("");
  const [listing, setListing] = useState<IPOTypes["dates"]["listing"]>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setDates(dataToEdit);
      setOpen(dataToEdit.open);
      setClose(dataToEdit.close);
      setListing(dataToEdit.listing);
    }
  }, [dataToEdit]);

  useEffect(() => {
    setDates({
      open,
      close,
      listing,
    });
  }, [open, close, listing]);

  useEffect(() => {
    dispatch(setIPOCardDates({ dates }));
  }, [dates]);
  return (
    <div className="w-full h-fit p-1 flex flex-col md:flex-row gap-2">
      {/* open */}
      <div className="w-full h-full flex flex-row md:flex-col">
        <label
          htmlFor="ipo-card-dates-open"
          className="w-fit md:w-full px-1 text-center text-xl dark:text-light"
        >
          Open
        </label>
        <input
          type="text"
          name="ipo-card-dates-open"
          id="ipo-card-dates-open"
          className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
          value={open}
          onChange={(e) => setOpen(e.currentTarget.value.toString())}
          placeholder={ipoScreen === "create" ? "Open Date" : dataToEdit?.open}
          title="Opening Date of the IPO"
        />
      </div>
      {/* close */}
      <div className="w-full h-full flex flex-row md:flex-col">
        <label
          htmlFor="ipo-card-dates-close"
          className="w-fit md:w-full px-1 text-center text-xl dark:text-light"
        >
          Close
        </label>
        <input
          type="text"
          name="ipo-card-dates-close"
          id="ipo-card-dates-close"
          className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
          value={close}
          onChange={(e) => setClose(e.currentTarget.value.toString())}
          placeholder={
            ipoScreen === "create" ? "Close Date" : dataToEdit?.close
          }
          title="Closing Date of the IPO"
        />
      </div>
      {/* listing */}
      <div className="w-full h-full flex flex-row md:flex-col">
        <label
          htmlFor="ipo-card-dates-listing"
          className="w-fit md:w-full px-1 text-center text-xl dark:text-light"
        >
          Listing
        </label>
        <input
          type="text"
          name="ipo-card-dates-listing"
          id="ipo-card-dates-listing"
          className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
          value={listing}
          onChange={(e) => setListing(e.currentTarget.value.toString())}
          placeholder={
            ipoScreen === "create" ? "Listing Date" : dataToEdit?.listing
          }
          title="Listing Date of the IPO"
        />
      </div>
    </div>
  );
};

export default IPOCardDates;
