"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { RiAlarmWarningFill } from "react-icons/ri";
interface RenderPostsPropsTypes {
  linkPost?: (id: string, post: any) => void;
  deLinkPost?: (id: string) => void;
  posts: any[];
  pageBatch: number;
}

const RenderPosts = ({
  deLinkPost,
  linkPost,
  posts,
  pageBatch,
}: RenderPostsPropsTypes) => {
  const [activePage, setActivePage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [postBatches, setPostBatches] = useState<number[][]>([]);
  const [postsToRender, setPostsToRender] = useState<any[]>([]);

  useEffect(() => {
    if (posts && pageBatch) {
      setTotalPage(Math.ceil(posts?.length / pageBatch));
      // creating pageBatches
      const batches: number[][] = [];
      for (let i = 1; i <= posts?.length; i += pageBatch) {
        let batch: number[] = [];
        for (let j = i; j < i + pageBatch && j <= posts?.length; j++) {
          batch.push(j);
        }
        batches.push(batch);
      }
      setActivePage(1);
      setPostBatches(batches);
    }
  }, [posts, pageBatch]);

  useEffect(() => {
    if (activePage > 0 && posts && postBatches) {
      const renderArr: any[] = [];
      postBatches[activePage - 1]?.map((postIndex: number) => {
        renderArr.push(posts[postIndex - 1]);
      });
      setPostsToRender(renderArr);
    }
  }, [activePage, posts, postBatches]);

  function handlePrevPage() {
    if (activePage <= 1) {
      toast.custom(
        (t) => (
          <div className="flex flex-row justify-center items-center bg-light p-3 rounded-md">
            <RiAlarmWarningFill className="w-8 h-8 text-[#FF0000]" />
            <p className="text-xl">
              There is no page&nbsp;
              <span className="inline-block text-[#FF0000]">0</span>.
            </p>
          </div>
        ),
        { duration: 1000 }
      );
    } else {
      setActivePage((pre) => pre - 1);
    }
  }

  function handleNextPage() {
    if (activePage < postBatches.length) {
      setActivePage((pre) => pre + 1);
    }
    if (activePage === postBatches.length) {
      toast.custom(
        (t) => (
          <div className="flex flex-row justify-center items-center bg-light p-3 rounded-md">
            <RiAlarmWarningFill className="w-8 h-8 text-[#FF0000]" />
            <p className="text-xl">
              Already at&nbsp;
              <span className="inline-block text-[#FF0000]">last</span>
              &nbsp;page.
            </p>
          </div>
        ),
        { duration: 1000 }
      );
    }
  }

  const MiddlePageBtn = () => {
    return (
      <div
        key={`Post-Batch-Page-${Math.ceil(postBatches.length / 2)}-Button`}
        className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
        onClick={() => setActivePage(Math.ceil(postBatches.length / 2))}
      >
        {Math.ceil(postBatches.length / 2)}
      </div>
    );
  };

  const BtnBeforeActivePage = () => {
    const beforeActivePage: number = activePage - 1;
    return (
      <div
        key={`Post-Batch-Page-${
          beforeActivePage > 1 ? beforeActivePage : 1
        }-Button`}
        className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
        onClick={() =>
          setActivePage(beforeActivePage > 1 ? beforeActivePage : 1)
        }
      >
        {beforeActivePage > 1 ? beforeActivePage : 1}
      </div>
    );
  };

  const BtnAfterActivePage = () => {
    const afterActivePage: number = activePage + 1;
    return (
      <div
        key={`Post-Batch-Page-${
          afterActivePage <= postBatches.length
            ? afterActivePage
            : postBatches.length
        }-Button`}
        className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
        onClick={() =>
          setActivePage(
            afterActivePage <= postBatches.length
              ? afterActivePage
              : postBatches.length
          )
        }
      >
        {afterActivePage <= postBatches.length
          ? afterActivePage
          : postBatches.length}
      </div>
    );
  };

  return (
    <div className="w-full h-auto flex-1 flex flex-col gap-1">
      {/* posts rendering based on page */}
      {postsToRender.length > 0 &&
        postsToRender?.map((post: any) => {
          if (post) {
            const { _id, postTitle, postImage } = post;
            const { links, caption } = postImage;
            const { original } = links;
            return (
              <div
                key={`ipo-linked-posts-search-post-${_id}`}
                className="w-full h-20 flex flex-row rounded-md border-solid border-[1px] border-bodyDark dark:border-light dark:text-light text-bodyDark"
              >
                {/* image */}
                <div className="w-20 h-full">
                  <Image
                    src={original}
                    alt={caption}
                    width={128}
                    height={80}
                    className="w-20 h-full rounded-tl-md rounded-bl-md"
                  />
                </div>
                {/* title & add btn */}
                <div className="w-full h-full flex flex-col items-center justify-evenly">
                  <div className="w-full h-full text-wrap truncate flex-1 overflow-hidden px-1">
                    {postTitle}
                  </div>
                  {linkPost && (
                    <div
                      className="w-full h-fit text-center cursor-pointer transition-all duration-100 ease-in hover:bg-dark hover:text-light hover:rounded-br-md"
                      onClick={() => linkPost(_id, post)}
                    >
                      Link this post.
                    </div>
                  )}
                  {deLinkPost && (
                    <div
                      className="w-full h-fit text-center cursor-pointer transition-all duration-100 ease-in hover:bg-dark hover:text-light hover:rounded-br-md"
                      onClick={() => deLinkPost(_id)}
                    >
                      DeLink this post.
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
      {/* pagination */}
      {totalPage > 1 && (
        <div className="w-full h-fit p-1 flex flex-row justify-evenly gap-1">
          {/* previous page */}
          <div
            className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
            onClick={handlePrevPage}
          >
            <FaHandPointLeft />
          </div>
          {/* when pages are 7 aur less */}
          {postBatches.length <= 7 &&
            postBatches.map((_, postBatchIndex: number) => {
              return (
                <div
                  key={`Post-Batch-Page-${postBatchIndex}-Button`}
                  className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
                  onClick={() => setActivePage(postBatchIndex + 1)}
                >
                  {postBatchIndex + 1}
                </div>
              );
            })}
          {/* when pages are more than 7 */}
          {postBatches.length >= 8 && (
            <>
              {/* first page */}
              <div
                key={`Post-Batch-Page-${1}-Button`}
                className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
                onClick={() => setActivePage(1)}
              >
                1
              </div>
              {/* button before active page */}
              <BtnBeforeActivePage />
              {/* MiddlePageBtn */}
              {<MiddlePageBtn />}
              {/* button after activePage */}
              <BtnAfterActivePage />
              {/* lastpage */}
              <div
                key={`Post-Batch-Page-${postBatches.length}-Button`}
                className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
                onClick={() => setActivePage(postBatches.length)}
              >
                {postBatches.length}
              </div>
            </>
          )}
          {/* next page */}
          <div
            className="w-10 h-10 p-1 border-2 border-solid border-bodyDark dark:border-light dark:text-light text-bodyDark rounded-sm flex flex-col items-center justify-evenly cursor-pointer text-xl"
            onClick={handleNextPage}
          >
            <FaHandPointRight />
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderPosts;
