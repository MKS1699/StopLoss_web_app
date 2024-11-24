import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardDatesPropsTypes {
  dates: APIIPOTypes["dates"];
}

const IPOCardDates = ({ dates }: IPOCardDatesPropsTypes) => {
  const { close, listing, open } = dates;
  return (
    <div className="w-full h-auto flex flex-row gap-2 justify-evenly">
      {/* open */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">Open Date</div>
        <div className="w-full text-lg font-normal text-center">{open}</div>
      </div>

      {/* close */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">
          Close Date
        </div>
        <div className="w-full text-lg font-normal text-center">{close}</div>
      </div>

      {/* listing */}
      <div className="w-full h-full flex flex-col gap-1 justify-between">
        <div className="w-full text-base font-light text-center">
          Listing Date
        </div>
        <div className="w-full text-lg font-normal text-center">{listing}</div>
      </div>
    </div>
  );
};

export default IPOCardDates;
