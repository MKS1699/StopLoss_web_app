"use client";

import {
  useGetPostsCategorySizes,
  useGetUpcomingIPOEntries,
} from "@/app/hooks/apiHooks";
import { PostSection, UpcomingIPO } from ".";
import { CenterDivropsTypes } from "./CenterDiv";
import { useAppSelector } from "@/app/hooks";

interface RightDivPropsTypes extends CenterDivropsTypes {}

const RightDiv = ({ className }: RightDivPropsTypes) => {
  const { isLoading: upcomingIPOEntriesLoading, upcomingIPOEntries } =
    useGetUpcomingIPOEntries();

  const { size: ipo } = useGetPostsCategorySizes({ category: "ipo" });
  const { size: companyProfile } = useGetPostsCategorySizes({
    category: "company_profile",
  });
  const { size: tutorial } = useGetPostsCategorySizes({
    category: "tutorial",
  });

  return (
    <div className={`flex flex-col justify-evenly ${className}`}>
      {/* upcoming IPO feature is deprecated */}
      {/* {upcomingIPOEntries.length > 0 && (
        <UpcomingIPO className="" key={`desktop-upcoming ipo`} />
      )} */}
      {ipo > 0 && <PostSection postType="ipo" key="ipo-posts" limit={5} />}
      {companyProfile > 0 && (
        <PostSection postType="company_profile" key="company-posts" limit={5} />
      )}
      {tutorial > 0 && (
        <PostSection postType="tutorial" key="tutorial-posts" limit={5} />
      )}
    </div>
  );
};

export default RightDiv;
