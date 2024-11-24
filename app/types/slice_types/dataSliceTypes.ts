import { APIIPOTypes } from "../api_types/ipoTypes";
import { IPOTypes } from "./ipoSliceTypes";

export interface DATASLICETYPES {
  latestPosts: {}[] | any;
  post: {};
  postsSizes: {
    ipo: number;
    news: number;
    blog: number;
    tutorial: number;
    sponsoredPost: number;
    companyProfile: number;
  };
  categoryPosts: {
    ipoPosts: {}[] | any;
    newsPosts: {}[] | any;
    blogPosts: {}[] | any;
    tutorialPosts: {}[] | any;
    sponsoredPosts: {}[] | any;
    companyProfilePosts: {}[] | any;
  };
  upcomingIPOEntries:
    | {
        _id: string;
        ipoName: string;
        open: string;
        close: string;
        linkedPostsId: string[];
        __v: number;
      }[]
    | {}[];
  ipoCards: APIIPOTypes[];
  posts: any[];
}
