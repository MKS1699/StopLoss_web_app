"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "./storeHooks";

const useIPOCardValidation = () => {
  // IPO Fields for validation checking

  const ipo = useAppSelector((state) => state.ipoSlice);
  const {
    allotmentLink,
    allotmentStatus,
    category,
    createdBy,
    dates,
    exPremium,
    ipoPhase,
    linkedPostsId,
    logo,
    lotSize,
    name,
    offerPrice,
    status,
    subscription,
  } = ipo;

  const [result, setResult] = useState<{
    passed: boolean;
    fieldErrors?: {
      fieldName: string;
      fieldError: string;
    }[];
  }>({ passed: false, fieldErrors: [] });

  function validateIPO() {
    const Err: {
      fieldName: string;
      fieldError: string;
    }[] = [];

    // allotment status & link
    // by default allotment status is false
    if (allotmentStatus) {
      if (allotmentLink.length <= 0) {
        Err.push({
          fieldName: "Allotment Link",
          fieldError: "Link is empty.",
        });
      }
    }
    // dates check
    // open date
    if (dates.open.length <= 0) {
      Err.push({
        fieldName: "Dates",
        fieldError: "Open Date is empty.",
      });
    }
    // close date
    if (dates.close.length <= 0) {
      Err.push({
        fieldName: "Close Date",
        fieldError: "Close Date is empty.",
      });
    }
    // listing date
    if (dates.listing.length <= 0) {
      Err.push({
        fieldName: "Listing Date",
        fieldError: "Listing Date is empty.",
      });
    }
    // ex premium check
    if (exPremium.length <= 0) {
      Err.push({
        fieldName: "Ex.Premium",
        fieldError: "Expected Premium is empty.",
      });
    }
    // logo check
    if (logo.original.length <= 0) {
      Err.push({
        fieldName: "Logo",
        fieldError: "Logo is not uploaded.",
      });
    }
    // lot size check
    if (lotSize.length <= 0) {
      Err.push({
        fieldName: "LotSize",
        fieldError: "Lot size is empty.",
      });
    }
    // name check
    if (name.length <= 0) {
      Err.push({
        fieldName: "Name",
        fieldError: "Name is empty.",
      });
    }
    // offer price check
    if (offerPrice.length <= 0) {
      Err.push({
        fieldName: "OfferPrice",
        fieldError: "Offer Price is empty.",
      });
    }
    // subscription check
    if (subscription.length <= 0) {
      Err.push({
        fieldName: "Subscription",
        fieldError: "Subscription is empty.",
      });
    }
    // creating result
    if (Err.length > 0) {
      setResult({ passed: false, fieldErrors: Err });
    } else {
      setResult({ passed: true });
    }
  }

  useEffect(() => {
    validateIPO();
  }, [ipo]);
  return { result, ipo };
};

export default useIPOCardValidation;
