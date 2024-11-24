import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardCategoryPhaseStatusPropsTypes {
  category: APIIPOTypes["category"];
  phase: APIIPOTypes["ipoPhase"];
  status: APIIPOTypes["status"];
}

const IPOCardCategoryPhaseStatus = ({
  category,
  phase,
  status,
}: IPOCardCategoryPhaseStatusPropsTypes) => {
  return (
    <div className="w-full h-auto flex flex-row gap-2 justify-evenly text-sm">
      <div className="w-auto h-auto text-light px-2 py-1 rounded-md bg-[#F87060]">
        {/* category */}
        {category === "mainboard" && "Mainboard"}
        {category === "sme" && "SME"}
      </div>
      <div className="w-auto h-auto text-light px-2 py-1 rounded-md bg-[#5299D3]">
        {/* phase */}
        {phase === "current" && "Current"}
        {phase === "listed" && "Listed"}
        {phase === "upcoming" && "Upcoming"}
      </div>
      <div className="w-auto h-auto text-light px-2 py-1 rounded-md bg-[#102542]">
        {/* status */}
        {status === "pre" && "Pre-Apply"}
        {status === "apply" && "Apply"}
        {status === "closed" && "Closed"}
      </div>
    </div>
  );
};

export default IPOCardCategoryPhaseStatus;
