import { PostSliceTypes } from "./postSliceTypes";

export interface AdminPanelSliceTypes {
  panelScreen:
    | "allPosts"
    | "createPost"
    | "editPost"
    | "userSettings"
    | "panelSettings"
    | "ipo";
  workingOnPost: boolean;
  postUploadStatus: "idle" | "uploading" | "uploaded";
  userPosts: PostSliceTypes[][];
  postsToShow: PostSliceTypes[];
}
