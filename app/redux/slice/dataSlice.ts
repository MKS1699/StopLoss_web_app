import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DATASLICETYPES } from "@/app/types/slice_types/dataSliceTypes";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";

const EMPTYSTATE = {
  latestPosts: [],
  post: {},
  postsSizes: {
    blog: -1,
    companyProfile: -1,
    ipo: -1,
    news: -1,
    sponsoredPost: -1,
    tutorial: -1,
  },
  categoryPosts: {
    ipoPosts: [],
    blogPosts: [],
    companyProfilePosts: [],
    newsPosts: [],
    sponsoredPosts: [],
    tutorialPosts: [],
  },
  upcomingIPOEntries: [],
  ipoCards: [],
  posts: [],
};

const initialState: DATASLICETYPES = {
  latestPosts: [],
  post: {},
  postsSizes: {
    blog: -1,
    companyProfile: -1,
    ipo: -1,
    news: -1,
    sponsoredPost: -1,
    tutorial: -1,
  },
  categoryPosts: {
    ipoPosts: [],
    blogPosts: [],
    companyProfilePosts: [],
    newsPosts: [],
    sponsoredPosts: [],
    tutorialPosts: [],
  },
  upcomingIPOEntries: [],
  ipoCards: [],
  posts: [],
};

export const dataSlice = createSlice({
  name: "Data Slice",
  initialState,
  reducers: {
    // storing content to state
    setDataLatestPosts: (
      state,
      action: PayloadAction<{ posts: DATASLICETYPES["latestPosts"] }>
    ) => {
      state.latestPosts = action.payload.posts;
    },

    setDataStatePostsCategorySizes: (
      state,
      action: PayloadAction<{
        category:
          | "ipo"
          | "news"
          | "tutorial"
          | "blog"
          | "sponsored_post"
          | "company_profile";
        size: number;
      }>
    ) => {
      const { category, size } = action.payload;
      if (category == "blog") {
        state.postsSizes.blog = size;
      } else if (category == "company_profile") {
        state.postsSizes.companyProfile = size;
      } else if (category == "ipo") {
        state.postsSizes.ipo = size;
      } else if (category == "news") {
        state.postsSizes.news = size;
      } else if (category == "sponsored_post") {
        state.postsSizes.sponsoredPost = size;
      } else if (category == "tutorial") {
        state.postsSizes.tutorial = size;
      }
    },

    // upcomingipoentries
    setDataUpcomingIPOEntries: (
      state,
      action: PayloadAction<{ entries: {}[] }>
    ) => {
      state.upcomingIPOEntries = action.payload.entries;
    },

    // catergory Posts
    setDataCategoryPosts: (
      state,
      action: PayloadAction<{
        category:
          | "ipo"
          | "news"
          | "tutorial"
          | "blog"
          | "sponsored_post"
          | "company_profile";
        posts: {}[];
      }>
    ) => {
      const { category, posts } = action.payload;
      if (category === "blog") {
        state.categoryPosts.blogPosts = posts;
      }
      if (category === "company_profile") {
        state.categoryPosts.companyProfilePosts = posts;
      }
      if (category === "ipo") {
        state.categoryPosts.ipoPosts = posts;
      }
      if (category === "news") {
        state.categoryPosts.newsPosts = posts;
      }
      if (category === "sponsored_post") {
        state.categoryPosts.sponsoredPosts = posts;
      }
      if (category === "tutorial") {
        state.categoryPosts.tutorialPosts = posts;
      }
    },

    // post
    setDataPost: (state, action: PayloadAction<{ post: {} }>) => {
      state.post = action.payload.post;
    },

    // ipoCards
    setIPOCards: (state, action: PayloadAction<{ ipoCards: IPOTypes[] }>) => {
      state.ipoCards = action.payload.ipoCards;
    },
    // posts,
    setDataSlicePosts: (state, action: PayloadAction<{ posts: any[] }>) => {
      state.posts = action.payload.posts;
    },
    // resetState
    resetDataSliceState: (state) => {
      state.categoryPosts = EMPTYSTATE.categoryPosts;
      state.latestPosts = EMPTYSTATE.latestPosts;
      state.post = EMPTYSTATE.post;
      state.postsSizes = EMPTYSTATE.postsSizes;
      // remove upcoming entries
      state.upcomingIPOEntries = EMPTYSTATE.upcomingIPOEntries;
      state.ipoCards = EMPTYSTATE.ipoCards;
      state.posts = EMPTYSTATE.posts;
    },
  },
});

export const {
  setDataLatestPosts,
  setDataStatePostsCategorySizes,
  setDataUpcomingIPOEntries,
  setDataCategoryPosts,
  setDataPost,
  setIPOCards,
  setDataSlicePosts,
  resetDataSliceState,
} = dataSlice.actions;

export default dataSlice.reducer;
