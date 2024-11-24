import IPOCards from "../IPOCards/page";
import { CenterDiv, LeftDiv, RightDiv, UpcomingIPO } from "./components";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-3 grid-flow-row md:grid-rows-1 mt-2 px-1">
      {/* upcomingIPO feature is being replaced by IPO Cards section */}
      {/* <UpcomingIPO
        key={`mobile-upcoming ipo`}
        className="visible md:hidden row-start-1"
      /> */}
      {/* IPO Cards */}
      {/* This section is visible in mobiles only */}
      <IPOCards className="block md:hidden" />
      <LeftDiv className="row-start-3 md:row-start-1 md:col-start-1" />
      <CenterDiv className="row-start-2 md:row-start-1 md:col-start-2" />
      <RightDiv className="row-start-4 md:row-start-1 md:col-start-3" />
    </div>
  );
};

export default LandingPage;
