import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardOfferPriceLotSizeSubscriptionExPremiumPropsTypes {
  offerPrice: APIIPOTypes["offerPrice"];
  lotSize: APIIPOTypes["lotSize"];
  subscription: APIIPOTypes["subscription"];
  exPremium: APIIPOTypes["exPremium"];
}

const IPOCardOfferPriceLotSizeSubscriptionExPremium = ({
  exPremium,
  lotSize,
  offerPrice,
  subscription,
}: IPOCardOfferPriceLotSizeSubscriptionExPremiumPropsTypes) => {
  return (
    <div className="w-full h-20 flex flex-row gap-2 justify-evenly">
      {/* offerPrice */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">
          Offer Price
        </div>
        <div className="w-full text-lg font-normal text-center">
          {offerPrice}
        </div>
      </div>

      {/* lotSize */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">Lot Size</div>
        <div className="w-full text-lg font-normal text-center">{lotSize}</div>
      </div>

      {/* exPremium */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">
          Ex. Premium
        </div>
        <div className="w-full text-lg font-normal text-center">
          {exPremium}
        </div>
      </div>

      {/* subscription */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">
          Subscription
        </div>
        <div className="w-full text-lg font-normal text-center">
          {subscription}
        </div>
      </div>
    </div>
  );
};

export default IPOCardOfferPriceLotSizeSubscriptionExPremium;
