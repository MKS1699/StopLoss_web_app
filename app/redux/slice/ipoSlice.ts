import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setIPOCards } from "./dataSlice";
export const EMPTYIPOSTATE: IPOTypes = {
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
  name: "",
  offerPrice: "",
  status: "pre",
  subscription: "",
};

const initialState: IPOTypes = EMPTYIPOSTATE;

export const ipoSlice = createSlice({
  name: "IPO Slice",
  initialState,
  reducers: {
    // resetData
    resetIPOSliceData: (state) => {
      state.allotmentLink = EMPTYIPOSTATE.allotmentLink;
      state.allotmentStatus = EMPTYIPOSTATE.allotmentStatus;
      state.category = EMPTYIPOSTATE.category;
      state.createdBy = EMPTYIPOSTATE.createdBy;
      state.dates = EMPTYIPOSTATE.dates;
      state.exPremium = EMPTYIPOSTATE.exPremium;
      state.ipoPhase = EMPTYIPOSTATE.ipoPhase;
      state.linkedPostsId = EMPTYIPOSTATE.linkedPostsId;
      state.logo = EMPTYIPOSTATE.logo;
      state.lotSize = EMPTYIPOSTATE.lotSize;
      state.name = EMPTYIPOSTATE.name;
      state.offerPrice = EMPTYIPOSTATE.offerPrice;
      state.status = EMPTYIPOSTATE.status;
      state.subscription = EMPTYIPOSTATE.subscription;
    },
    // setIPOCardValues
    // allotmentLink
    setIPOCardAllotmentLink: (
      state,
      action: PayloadAction<{ allotmentLink: IPOTypes["allotmentLink"] }>
    ) => {
      state.allotmentLink = action.payload.allotmentLink;
    },
    // allotmentStatus
    setIPOCardAllotmentStatus: (
      state,
      action: PayloadAction<{ allotmentStatus: IPOTypes["allotmentStatus"] }>
    ) => {
      state.allotmentStatus = action.payload.allotmentStatus;
    },
    // category
    setIPOCardCategory: (
      state,
      action: PayloadAction<{ category: IPOTypes["category"] }>
    ) => {
      state.category = action.payload.category;
    },
    // createdBy
    setIPOCardCreatedBy: (
      state,
      action: PayloadAction<{ createdBy: IPOTypes["createdBy"] }>
    ) => {
      state.createdBy = action.payload.createdBy;
    },
    // dates
    setIPOCardDates: (
      state,
      action: PayloadAction<{ dates: IPOTypes["dates"] }>
    ) => {
      state.dates = action.payload.dates;
    },
    // exPremium
    setIPOCardExPremium: (
      state,
      action: PayloadAction<{ exPremium: IPOTypes["exPremium"] }>
    ) => {
      state.exPremium = action.payload.exPremium;
    },
    // ipoPhase
    setIPOCardIPOPhase: (
      state,
      action: PayloadAction<{ ipoPhase: IPOTypes["ipoPhase"] }>
    ) => {
      state.ipoPhase = action.payload.ipoPhase;
    },
    // linkedPostsIds
    setIPOCardLinkedPostsId: (
      state,
      action: PayloadAction<{ linkedPostsId: IPOTypes["linkedPostsId"] }>
    ) => {
      state.linkedPostsId = action.payload.linkedPostsId;
    },
    // logo
    setIPOCardLogo: (
      state,
      action: PayloadAction<{ logo: IPOTypes["logo"] }>
    ) => {
      state.logo = action.payload.logo;
    },
    // lotSize
    setIPOCardLotSize: (
      state,
      action: PayloadAction<{ lotSize: IPOTypes["lotSize"] }>
    ) => {
      state.lotSize = action.payload.lotSize;
    },
    // name
    setIPOCardName: (
      state,
      action: PayloadAction<{ name: IPOTypes["name"] }>
    ) => {
      state.name = action.payload.name;
    },
    // offerPrice
    setIPOCardOfferPrice: (
      state,
      action: PayloadAction<{ offerPrice: IPOTypes["offerPrice"] }>
    ) => {
      state.offerPrice = action.payload.offerPrice;
    },
    // status
    setIPOCardStatus: (
      state,
      action: PayloadAction<{ status: IPOTypes["status"] }>
    ) => {
      state.status = action.payload.status;
    },
    // subscription
    setIPOCardSubscription: (
      state,
      action: PayloadAction<{ subscription: IPOTypes["subscription"] }>
    ) => {
      state.subscription = action.payload.subscription;
    },
  },
});
export const {
  resetIPOSliceData,
  setIPOCardAllotmentLink,
  setIPOCardAllotmentStatus,
  setIPOCardCategory,
  setIPOCardCreatedBy,
  setIPOCardDates,
  setIPOCardExPremium,
  setIPOCardIPOPhase,
  setIPOCardLinkedPostsId,
  setIPOCardLogo,
  setIPOCardLotSize,
  setIPOCardName,
  setIPOCardSubscription,
  setIPOCardOfferPrice,
  setIPOCardStatus,
} = ipoSlice.actions;

export default ipoSlice.reducer;
