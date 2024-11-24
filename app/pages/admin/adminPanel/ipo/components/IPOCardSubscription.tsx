"use client";

import { useAppDispatch } from "@/app/hooks";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { setIPOCardSubscription } from "@/app/redux/slice/ipoSlice";

interface IPOCardSubscriptionPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: string;
}

const IPOCardSubscription = ({
  ipoScreen,
  dataToEdit,
}: IPOCardSubscriptionPropsTypes) => {
  const dispatch = useAppDispatch();
  const [subscription, setSubscription] = useState<string>("");

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setSubscription(dataToEdit);
    }
  }, [dataToEdit]);

  useEffect(() => {
    dispatch(setIPOCardSubscription({ subscription }));
  }, [subscription]);

  return (
    <div className="w-full h-auto p-1 text-xl flex flex-row md:flex-col">
      <label
        htmlFor="ipo-card-subscription"
        className="w-fit md:w-full px-1 text-center dark:text-light"
      >
        Subscription
      </label>
      <input
        type="text"
        name="ipo-card-subscription"
        id="ipo-card-subscription"
        className="outline-none indent-1 w-full text-xl text-center text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in md:border-t-2 md:border-solid md:border-dark md:dark:border-light"
        placeholder={ipoScreen === "create" ? "Subscription" : dataToEdit}
        value={subscription}
        onChange={(e) => setSubscription(e.currentTarget.value.toString())}
        title="Subscription of the IPO"
      />
    </div>
  );
};

export default IPOCardSubscription;
