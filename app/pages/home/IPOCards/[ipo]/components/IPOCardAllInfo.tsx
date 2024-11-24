"use client";
import { useAppSelector } from "@/app/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IPOCard } from "../../components";
import {
  useGetAllIPO,
  useGetIPOById,
  useGetPostByIdInBatch,
} from "@/app/hooks/apiHooks";
import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";
import { APIPOSTTypes } from "@/app/types/api_types/postTypes";
import Image from "next/image";
import Link from "next/link";
import { createTitleURL } from "@/app/utils/tools";

interface IPOCardAllInfoPropsTypes {}

const IPOCardAllInfo = ({}: IPOCardAllInfoPropsTypes) => {
  const searchParams = useSearchParams();
  const ipoId = searchParams.get("id");

  const { ipo, isLoading } = useGetIPOById({ ipoId: ipoId ? ipoId : "" });

  const { linkedPostsId } = ipo;
  const {
    isLoading: postBatchLoading,
    postBatch,
    getPostBatch,
  } = useGetPostByIdInBatch();

  useEffect(() => {
    if (linkedPostsId.length > 0) {
      getPostBatch(linkedPostsId);
    }
  }, [linkedPostsId]);
  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {isLoading ? (
        <div>Loading </div>
      ) : (
        <div className="p-2">
          {/* ipo card */}
          <IPOCard ipo={ipo} key={`IPO-Card-${ipoId}`} showViewBtn={false} />
          {/* linked posts */}
          <div className="w-full mt-2 flex flex-col gap-2">
            {postBatchLoading ? (
              <></>
            ) : (
              postBatch?.map((post: APIPOSTTypes, postIndex: number) => {
                const { _id, postImage, postTitle, postDescription, postType } =
                  post;

                const postDescriptionLinesArr = postDescription.split("<br />");

                return (
                  <div
                    className="w-full h-auto flex flex-col gap-2 bg-light shadow-xl p-2 rounded-md"
                    key={`IPO-related-Post-${_id}-${postIndex}`}
                  >
                    {/* image & title */}
                    <div className="w-full h-auto flex flex-row gap-4 justify-between">
                      {/* image */}
                      <Image
                        src={postImage.links.original}
                        alt={postImage.caption}
                        width={120}
                        height={60}
                      />
                      <div className="font-medium text-xl">{postTitle}</div>
                    </div>
                    {/* description */}
                    <div>
                      {postDescriptionLinesArr.map(
                        (line: string, lineIndex: number) => {
                          return line;
                        }
                      )}
                    </div>
                    <Link
                      href={{
                        pathname: `/pages/home/categories/${postType}/${createTitleURL(
                          postTitle
                        )}`,
                        query: { id: _id },
                      }}
                      className="w-auto h-auto border-2 border-solid rounded-md border-[#27187E] p-1 text-[#27187E] cursor-pointer text-center"
                    >
                      Read More
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// todo : loading skeleton

export default IPOCardAllInfo;
