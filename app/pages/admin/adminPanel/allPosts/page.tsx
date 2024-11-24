"use client";
import { useAppDispatch, useAppSelector, useGetPostsByUser } from "@/app/hooks";
import { PostsList } from "./components";
import { useEffect, useState } from "react";
import { Pagination } from "@/app/components";
import {
  useGetNumOfPostsByUser,
  useGetMorePostsByUser,
} from "@/app/hooks/apiHooks";
import { PostSliceTypes } from "@/app/types/slice_types/postSliceTypes";
import { setPostsToShow } from "@/app/redux/slice/adminPanelSlice";

const AllPosts = () => {
  const dispatch = useAppDispatch();

  // states from store
  const userId = useAppSelector((state) => state.session.userId);
  const userName = useAppSelector((state) => state.session.userName);
  const userPosts = useAppSelector((state) => state.adminPanel.userPosts);
  const postsToShow = useAppSelector((state) => state.adminPanel.postsToShow);

  // api hooks
  const { isLoading: firstPostsPageLoading, getPostsByUser } =
    useGetPostsByUser({
      userId,
    });
  const { numberOfPostsByUser } = useGetNumOfPostsByUser();
  const { getMorePostsByUser } = useGetMorePostsByUser();

  // component states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postIsDeleted, setPostIsDeleted] = useState<boolean>(false);

  function handleUpdateCurrentPage(page: number): void {
    if (page >= 1) {
      setCurrentPage(page);
    }
  }

  useEffect(() => {
    if (userPosts.length > 1) {
      dispatch(setPostsToShow({ posts: userPosts[currentPage - 1] }));
    }
  }, [userPosts]);

  useEffect(() => {
    if (postIsDeleted && userPosts.length == 0) {
      getPostsByUser();
      setPostIsDeleted(false);
    }
  }, [postIsDeleted]);

  // doing pagination for the user if posts more than 10
  useEffect(() => {
    if (numberOfPostsByUser > 10) {
      getMorePostsByUser();
    }
  }, [numberOfPostsByUser]);
  return (
    /* All Posts Section */
    <div className="w-full min-h-screen p-2 flex flex-col justify-between gap-y-2 text-lg relative gap-4">
      <h3 className="w-full h-fit text-3xl text-center">
        All Posts of&nbsp;
        {userName.charAt(0).toUpperCase().concat(userName.slice(1))}
      </h3>
      {!firstPostsPageLoading && (
        <>
          {/* Posts List section */}
          <PostsList
            posts={postsToShow}
            updateIsPostDeleted={() => setPostIsDeleted(true)}
          />
          {/* Pagination */}

          {userPosts.length > 1 && (
            <Pagination
              currPage={currentPage}
              updateCurrPage={handleUpdateCurrentPage}
              makePagesOf={userPosts}
              updatePostsToShow={() =>
                dispatch(setPostsToShow({ posts: userPosts[currentPage - 1] }))
              }
            />
          )}
        </>
      )}
      {firstPostsPageLoading && (
        <div className="w-full h-full flex flex-col gap-y-2">
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
          <div className="w-full h-20 animate-skeleton"></div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
