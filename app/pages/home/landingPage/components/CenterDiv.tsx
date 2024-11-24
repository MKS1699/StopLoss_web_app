import { LatestPosts } from ".";
import IPOCards from "../../IPOCards/page";

export interface CenterDivropsTypes {
  className?: string;
}

const CenterDiv = ({ className }: CenterDivropsTypes) => {
  return (
    <div
      className={`
    ${className}`}
    >
      {/* IPO cards */}
      {/* this section will be visible only on screen bigger than mobiles */}
      {/* <IPOCards className="hidden md:block" /> */}
      {/* latest Posts */}
      <LatestPosts />
    </div>
  );
};

export default CenterDiv;
