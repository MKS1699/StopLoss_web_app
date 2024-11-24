"use client";

import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

export interface IPOPhaseFilterPropsTypes {
  phase: APIIPOTypes["ipoPhase"];
  handlePhase: (phaseTOSet: APIIPOTypes["ipoPhase"]) => void;
}

const IPOPhaseFilter = ({ phase, handlePhase }: IPOPhaseFilterPropsTypes) => {
  return (
    <div className="w-full h-auto flex flex-row gap-2 justify-evenly">
      {/* current */}
      <div
        className="w-auto h-auto flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          handlePhase("current");
        }}
      >
        <div
          className={`w-5 h-5 rounded-full transition-all ease-in duration-300 ${
            phase === "current"
              ? "bg-[#4cb050] opacity-80"
              : "bg-dark dark:bg-light opacity-20"
          }`}
        ></div>
        <div>Current</div>
      </div>
      {/* upcoming */}
      <div
        className="w-auto h-auto flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          handlePhase("upcoming");
        }}
      >
        <div
          className={`w-5 h-5 rounded-full transition-all ease-in duration-300 ${
            phase === "upcoming"
              ? "bg-[#4cb050] opacity-80"
              : "bg-dark dark:bg-light opacity-20"
          }`}
        ></div>
        <div>Upcoming</div>
      </div>
      {/* listed */}
      <div
        className="w-auto h-auto flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          handlePhase("listed");
        }}
      >
        <div
          className={`w-5 h-5 rounded-full transition-all ease-in duration-300 ${
            phase === "listed"
              ? "bg-[#4cb050] opacity-80"
              : "bg-dark dark:bg-light opacity-20"
          }`}
        ></div>
        <div>Listed</div>
      </div>
    </div>
  );
};

export default IPOPhaseFilter;
