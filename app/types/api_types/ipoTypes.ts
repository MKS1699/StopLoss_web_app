export interface APIIPOTypes {
  name: string;
  logo: {
    original: string;
    medium: string;
    thumbnail: string;
  };
  dates: {
    open: string;
    close: string;
    listing: string;
  };
  category: "mainboard" | "sme";
  offerPrice: string;
  lotSize: string;
  subscription: string;
  exPremium: string;
  status: "pre" | "apply" | "closed";
  linkedPostsId: string[];
  ipoPhase: "current" | "upcoming" | "listed";
  allotmentLink: string;
  allotmentStatus: boolean;
  createdBy: {
    userName: string;
    userId: string;
  };
  _id: string;
  __v: number;
}

export const EMPTYAPIIPOSTATE: APIIPOTypes = {
  __v: -1,
  _id: "",
  allotmentLink: "",
  allotmentStatus: false,
  category: "mainboard",
  createdBy: {
    userId: "",
    userName: "",
  },
  dates: {
    close: "",
    listing: "",
    open: "",
  },
  exPremium: "",
  ipoPhase: "upcoming",
  linkedPostsId: [""],
  logo: {
    medium: "",
    original: "",
    thumbnail: "",
  },
  lotSize: "",
  name: "empty",
  offerPrice: "",
  status: "pre",
  subscription: "",
};
