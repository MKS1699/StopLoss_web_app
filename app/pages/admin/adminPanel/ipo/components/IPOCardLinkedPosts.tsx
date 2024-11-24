"use client";

import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { IPOCardPropsTypes } from "./IPOCardName";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setIPOCardLinkedPostsId } from "@/app/redux/slice/ipoSlice";
import { useGetAllPosts } from "@/app/hooks/apiHooks";
import { CiSearch } from "react-icons/ci";
import { IoAlert } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { RenderPosts } from ".";
import toast from "react-hot-toast";
import { searchRelatedPosts } from "@/app/utils/tools";
import { Spinner } from "@/app/components";

interface IPOCardLinkedPostsPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["linkedPostsId"];
}

const IPOCardLinkedPosts = ({
  ipoScreen,
  dataToEdit,
}: IPOCardLinkedPostsPropsTypes) => {
  const dispatch = useAppDispatch();
  const { isLoading, posts } = useGetAllPosts();
  const [linkedPostsId, setLinkedPostsId] = useState<IPOTypes["linkedPostsId"]>(
    []
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [searchPostsToRender, setSearchPostsToRender] = useState<any[]>([]);

  const [linkedPostsToRender, setLinkedPostsToRender] = useState<any[]>([]);

  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setLinkedPostsId(dataToEdit);
      const linkedPostsToRenderArr: any[] = [];
      for (let i = 0; i < linkedPostsId.length; i++) {
        for (let j = 0; j < posts.length; j++) {
          if (linkedPostsId[i] === posts[j]._id) {
            linkedPostsToRenderArr.push(posts[j]);
          }
        }
      }
      setLinkedPostsToRender(linkedPostsToRenderArr);
    }
  }, [dataToEdit, posts]);

  useEffect(() => {
    dispatch(setIPOCardLinkedPostsId({ linkedPostsId }));
  }, [linkedPostsId]);

  useEffect(() => {
    if (searchValue.length == 0 || searchValue == "" || searchValue == " ") {
      setSearchPostsToRender(posts);
    }
  }, [searchValue, posts]);

  function linkPost(id: string, post: any) {
    if (linkedPostsId.length > 0) {
      const foundId = linkedPostsId.filter((postId, _) => postId === id);
      if (foundId.length === 0) {
        setLinkedPostsId([...linkedPostsId, id]);
        setLinkedPostsToRender([...linkedPostsToRender, post]);
        toast.success("Post linked.", { duration: 1500 });
      } else {
        toast("Post already linked.", {
          icon: <IoAlert className="text-[#FF0000] w-8 h-8" />,
          duration: 1500,
        });
      }
    } else {
      setLinkedPostsId([id]);
      setLinkedPostsToRender([post]);
      toast.success("Post linked.", { duration: 1500 });
    }
  }
  function deLinkPost(id: string) {
    if (linkedPostsId.length > 0) {
      const foundId = linkedPostsId.filter((postId, _) => postId !== id);
      if (foundId) {
        setLinkedPostsId(foundId);
      }
      const linkedPostsRenderUpdateArr = linkedPostsToRender.filter(
        (post, _) => post._id !== id
      );
      setLinkedPostsToRender(linkedPostsRenderUpdateArr);
      toast.error("Post DeLinked.", { duration: 1500 });
    }
  }

  return (
    <div className="w-full h-full p-1 flex flex-col gap-2">
      {/* title & info */}
      {/* <div className="w-full h-auto">
        <h3>IPOCardLinkedPosts</h3>
        <div className="">
          Click on the posts in the&nbsp;
          <span className="bg-dark bg-opacity-70 p-1 text-light inline-block">
            Select Posts
          </span>
          &nbsp;block or search you posts through the search bar&nbsp;
          <label
            htmlFor="ipo-card-linked-posts-search-bar"
            className="w-6 h-6 bg-dark bg-opacity-70 p-1 text-light inline-flex items-center justify-items-center"
          >
            <CiSearch />
          </label>
          &nbsp;in the&nbsp;
          <span className="bg-dark bg-opacity-70 p-1 text-light inline-block">
            Select Posts
          </span>
          &nbsp; block.
          <br />
          Posts which are linked will be shown in the&nbsp;
          <span className="bg-dark bg-opacity-70 p-1 text-light inline-block">
            Linked Posts
          </span>
          &nbsp; block.
        </div>
      </div> */}
      {/* blocks */}
      <div className="w-full h-auto flex-1 flex flex-col md:flex-row justify-evenly gap-2">
        {/* linked Posts */}
        <div className="w-full h-auto flex flex-col">
          {/* title */}
          <div className="w-full h-auto py-1 text-center">
            <h3 className="text-base dark:text-light">Linked Posts</h3>
          </div>
          {/* linked Posts  */}
          <div
            className="w-full h-auto flex-1 flex flex-col gap-1"
            id="ipo-card-linked-posts-block"
          >
            <RenderPosts
              deLinkPost={deLinkPost}
              pageBatch={3}
              posts={linkedPostsToRender}
              key={`Linked-Posts-Render`}
            />
          </div>
        </div>
        {/* search Posts */}
        <div className="w-full h-auto flex flex-col">
          {/* search bar */}
          <div className="w-full h-auto py-1 flex flex-row items-center justify-items-center">
            <div className="w-fit h-fit text-bodyDark dark:text-light">
              <CiSearch />
            </div>
            <input
              type="text"
              name="ipo-card-linked-posts-search-bar"
              id="ipo-card-linked-posts-search-bar"
              className="outline-none indent-1 w-full text-base text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in border-b-2 border-solid border-dark dark:border-light"
              placeholder="Search Posts to Link"
              value={searchValue}
              onChange={(e) => setSearchValue(e.currentTarget.value.toString())}
              onKeyUp={() => {
                if (searchValue.length > 0) {
                  setIsSearching(true);
                  setTimeout(() => {
                    const result = searchRelatedPosts(searchValue, posts);
                    setSearchPostsToRender(result);
                    setIsSearching(false);
                  }, 3000);
                } else {
                  setSearchPostsToRender(posts);
                }
              }}
            />
          </div>
          {/* search Posts  */}
          {/* search result */}
          {!isSearching && (
            <RenderPosts
              linkPost={linkPost}
              posts={searchPostsToRender}
              pageBatch={3}
              key={`Search-Posts-Render`}
            />
          )}
          {/* search animation */}
          {isSearching && (
            <div className="w-full h-40 self-center justify-self-center">
              <div className="w-full h-full items-center justify-items-center justify-center flex flex-row gap-2">
                <Spinner />
                <div>Searching</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IPOCardLinkedPosts;
