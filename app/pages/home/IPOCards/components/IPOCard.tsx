"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import {
  IPOCardAllotmentLink,
  IPOCardCategoryPhaseStatus,
  IPOCardDates,
  IPOCardImage,
  IPOCardName,
  IPOCardOfferPriceLotSizeSubscriptionExPremium,
} from ".";
import Link from "next/link";
import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardPropsTypes {
  ipo: APIIPOTypes;
  showViewBtn: boolean;
}

const IPOCard = ({ ipo, showViewBtn }: IPOCardPropsTypes) => {
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
    _id,
  } = ipo;
  return (
    <div className="w-full h-auto p-2 bg-light dark:bg-bodyDark shadow-2xl rounded-md flex flex-col gap-2">
      {/* image & name */}
      <div className="w-full h-24 flex flex-row gap-3">
        {/* IPO Card Image */}
        <IPOCardImage logo={logo} name={name} />
        {/* IPO Card Name */}
        <IPOCardName name={name} />
      </div>
      {/* category, phase, status */}
      <IPOCardCategoryPhaseStatus
        category={category}
        phase={ipoPhase}
        status={status}
      />
      {/* offerPrice, lotSize, subscription, exPremium */}
      <IPOCardOfferPriceLotSizeSubscriptionExPremium
        exPremium={exPremium}
        lotSize={lotSize}
        offerPrice={offerPrice}
        subscription={subscription}
      />
      {/* dates */}
      <IPOCardDates dates={dates} />
      {/* posts & allotment */}
      <div className="w-full h-auto flex flex-row justify-end gap-2">
        {/* posts */}
        {showViewBtn && (
          <Link
            href={{
              pathname: `/pages/home/IPOCards/${name}`,
              query: {
                id: _id,
              },
            }}
            className="w-auto h-auto border-2 border-solid rounded-md border-[#27187E] p-1 text-[#27187E] cursor-pointer"
          >
            Details
          </Link>
        )}
        {/* allotment link & status */}
        {allotmentStatus && (
          <IPOCardAllotmentLink allotmentLink={allotmentLink} />
        )}
      </div>
    </div>
  );
};

export default IPOCard;
