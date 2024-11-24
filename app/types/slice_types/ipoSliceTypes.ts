export interface IPOSliceTypes {
  ipoCards: IPOTypes[];
}

export interface IPOTypes {
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
}
