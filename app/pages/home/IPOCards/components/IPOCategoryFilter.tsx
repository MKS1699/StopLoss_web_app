import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

export interface IPOCategoryFilterPropsTypes {
  category: APIIPOTypes["category"];
  handleCategory: (categoryToSet: APIIPOTypes["category"]) => void;
}

const IPOCategoryFilter = ({
  category,
  handleCategory,
}: IPOCategoryFilterPropsTypes) => {
  return (
    <div className="w-full h-auto flex flex-row gap-2 justify-evenly">
      <div
        className="w-auto h-auto flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          handleCategory("mainboard");
        }}
      >
        <div
          className={`w-5 h-5 rounded-full transition-all ease-in duration-300 ${
            category === "mainboard"
              ? "bg-[#4cb050] opacity-80"
              : "bg-dark dark:bg-light opacity-20"
          }`}
        ></div>
        <div>MainBoard</div>
      </div>
      <div
        className="w-auto h-auto flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          handleCategory("sme");
        }}
      >
        <div
          className={`w-5 h-5 rounded-full transition-all ease-in duration-300 ${
            category === "sme"
              ? "bg-[#4cb050] opacity-80"
              : "bg-dark dark:bg-light opacity-20"
          }`}
        ></div>
        <div>SME</div>
      </div>
    </div>
  );
};

export default IPOCategoryFilter;
