"use client";

import { useGetAllIPO } from "@/app/hooks/apiHooks";
import { StyledComponent } from "@/app/types/component_types";
import { useEffect, useState } from "react";
import { IPOCard } from "./components";
import IPOCategoryFilter, {
  IPOCategoryFilterPropsTypes,
} from "./components/IPOCategoryFilter";
import IPOPhaseFilter, {
  IPOPhaseFilterPropsTypes,
} from "./components/IPOPhaseFilter";
import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";
import { CiSearch } from "react-icons/ci";
import { EMPTYAPIPOSTSTATE } from "@/app/types/api_types/postTypes";
interface IPOCardsPropsTypes extends StyledComponent {}

const IPOCards = ({ className }: IPOCardsPropsTypes) => {
  const { isLoading, fetchAllIPOCards, ipoCards } = useGetAllIPO();
  const [category, setCategory] =
    useState<APIIPOTypes["category"]>("mainboard");

  function handleCategory(categoryToSet: APIIPOTypes["category"]) {
    setCategory(categoryToSet);
  }

  const [phase, setPhase] = useState<APIIPOTypes["ipoPhase"]>("upcoming");

  function handlePhase(phaseToSet: APIIPOTypes["ipoPhase"]) {
    setPhase(phaseToSet);
  }

  // search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch(query: string) {
    setSearchQuery(query.toString());
  }
  const [iposToRender, setIPOsToRender] = useState<APIIPOTypes[]>([]);

  function handleIPOsToRender() {
    const iposArr: APIIPOTypes[] = ipoCards.filter(
      (ipo: APIIPOTypes) => ipo.category === category && ipo.ipoPhase === phase
    );

    if (searchQuery.length > 0 || searchQuery !== "") {
      const iposArrWithSearch: any[] = [];
      iposArr.map((ipo: APIIPOTypes) => {
        if (
          ipo.name
            .toString()
            .toLowerCase()
            .includes(searchQuery.toString().toLowerCase())
        ) {
          return (iposArrWithSearch[iposArrWithSearch.length] = ipo);
        }
      });
      if (typeof iposArrWithSearch !== "undefined") {
        setIPOsToRender(iposArrWithSearch);
      }
    } else {
      setIPOsToRender(iposArr);
    }
  }

  // rendering ipos based on filter
  useEffect(() => {
    handleIPOsToRender();
  }, [category, phase, ipoCards, searchQuery]);

  return (
    <div className={`w-full h-auto ${className}`}>
      {isLoading ? (
        <IPOLoadingSkeleton />
      ) : (
        <>
          <IPOCardsMobile
            ipoCards={iposToRender}
            category={category}
            handleCategory={handleCategory}
            phase={phase}
            handlePhase={handlePhase}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
          <IPOCardsDesktop
            ipoCards={iposToRender}
            category={category}
            handleCategory={handleCategory}
            phase={phase}
            handlePhase={handlePhase}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </>
      )}
    </div>
  );
};

// todo:improve loading skeleton
const IPOLoadingSkeleton = () => {
  return <div className="w-full h-60 animate-skeleton flex"></div>;
};

// IPO mobile view
const IPOCardsMobile = ({
  ipoCards,
  category,
  handleCategory,
  phase,
  handlePhase,
  searchQuery,
  handleSearch,
}: {
  ipoCards: any[];
  category: IPOCategoryFilterPropsTypes["category"];
  handleCategory: IPOCategoryFilterPropsTypes["handleCategory"];
  phase: IPOPhaseFilterPropsTypes["phase"];
  handlePhase: IPOPhaseFilterPropsTypes["handlePhase"];
  searchQuery: string;
  handleSearch: (searchQuery: string) => void;
}) => {
  return (
    <div
      className="md:hidden w-full bg-light dark:bg-dark rounded-md p-4 shadow-xl flex flex-col gap-2 text-dark dark:text-light
    "
    >
      {/* IPO search bar */}
      <div className="w-full h-auto text-base flex flex-row gap-2 items-center">
        <CiSearch className="w-5 h-5 text-dark dark:text-light" />
        <input
          type="text"
          className={`w-full h-fit border-b-2 border-b-solid border-b-dark dark:border-b-light bg-light dark:bg-dark text-dark dark:text-light outline-none text-lg placeholder:text-center`}
          onChange={(e) => handleSearch(e.target.value.toString())}
          value={searchQuery}
          placeholder="Search IPOs"
        />
      </div>
      {/* IPO Category */}
      <IPOCategoryFilter category={category} handleCategory={handleCategory} />
      {/* IPO Phase */}
      <IPOPhaseFilter phase={phase} handlePhase={handlePhase} />
      {/* IPO Cards */}
      {ipoCards.map((ipoCard: APIIPOTypes, index: number) => {
        return <IPOCard key={`IPO-Card-${index}`} ipo={ipoCard} showViewBtn />;
      })}
      {/* {ipoCards.length > 3 && <div>View More</div>} */}
    </div>
  );
};

// IPO desktop view
const IPOCardsDesktop = ({
  ipoCards,
  category,
  handleCategory,
  phase,
  handlePhase,
  searchQuery,
  handleSearch,
}: {
  ipoCards: any[];
  category: IPOCategoryFilterPropsTypes["category"];
  handleCategory: IPOCategoryFilterPropsTypes["handleCategory"];
  phase: IPOPhaseFilterPropsTypes["phase"];
  handlePhase: IPOPhaseFilterPropsTypes["handlePhase"];
  searchQuery: string;
  handleSearch: (searchQuery: string) => void;
}) => {
  return (
    <div
      className="hidden w-full bg-light dark:bg-dark rounded-md p-4 shadow-xl md:flex flex-col gap-2 text-dark dark:text-light
"
    >
      {/* IPO search bar */}
      <div className="w-full h-auto text-base flex flex-row gap-2 items-center">
        <CiSearch className="w-5 h-5 text-dark dark:text-light" />
        <input
          type="text"
          className={`w-full h-fit border-b-2 border-b-solid border-b-dark dark:border-b-light bg-light dark:bg-dark text-dark dark:text-light outline-none text-lg placeholder:text-center`}
          onChange={(e) => handleSearch(e.target.value.toString())}
          value={searchQuery}
          placeholder="Search IPOs"
        />
      </div>
      {/* IPO Category */}
      <IPOCategoryFilter category={category} handleCategory={handleCategory} />
      {/* IPO Phase */}
      <IPOPhaseFilter phase={phase} handlePhase={handlePhase} />
      {/* IPO Cards */}
      {ipoCards.map((ipoCard: APIIPOTypes, index: number) => {
        return <IPOCard key={`IPO-Card-${index}`} ipo={ipoCard} showViewBtn />;
      })}
      {/* {ipoCards.length > 3 && <div>View More</div>} */}
    </div>
  );
};
export default IPOCards;
