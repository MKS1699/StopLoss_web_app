"use client";
import { useAppSelector } from "@/app/hooks";
import {
  PostExternalLinks,
  PostImagenDescription,
  PostOptionsBar,
  PostParagraphs,
  PostTags,
  PostTitleBar,
  PostUpcomingIPO,
} from "../components";

const CreatePost = () => {
  const screen = "createPost";
  const postType = useAppSelector((state) => state.post.postType);
  return (
    <div className="w-full h-auto grid grid-flow-row grid-cols-1 gap-1 pl-2 pr-1 pt-2">
      {/* Title Bar*/}
      <PostTitleBar screen={screen} />
      {/* Post Options Bar */}
      <PostOptionsBar screen={screen} />
      {/* todo: remove upcomingIPO feature and info alert */}
      {/* postUpcomingIPO feature is being replaced/changed/update with 
          IPO cards. */}
      {/* if post type is IPO */}
      {/* Post UpcomingIPO Status */}
      {/* {postType === "ipo" && <PostUpcomingIPO />} */}
      {/* above feature is depreciated and will be removed in future updates
          after all the checks related to it
      */}
      {/* info regarding ipo cards. */}
      <div className="w-fit h-auto mx-auto my-4 border-2 border-solid border-[#FF0000] rounded-md text-base px-2 animate-pulse">
        Any type of post(s) can now be linked with any IPO cards.
        <br />
        You have to do it in the IPO Cards section after creating a Post.
        <br />
        This alert will be removed soon.
      </div>
      {/* Post Thumbnail/mainImage &  */}
      <PostImagenDescription screen={screen} />
      {/* Post Paragraphs */}
      <PostParagraphs screen={screen} />
      {/* Post External Links */}
      <PostExternalLinks screen={screen} />
      {/* Post Tags */}
      <PostTags screen={screen} />
    </div>
  );
};

export default CreatePost;
