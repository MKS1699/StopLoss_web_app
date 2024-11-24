"use client";

import {
  APIPOSTTypes,
  EMPTYAPIPOSTSTATE,
} from "@/app/types/api_types/postTypes";
import { useEffect, useState } from "react";
import {
  API_DEV,
  API_POSTS_ENDPOINTS,
  API_POSTS_ROUTE,
  API_URL,
} from "./endPoints";
import axios from "axios";

interface useGetPostByIdInBatchPropsTypes {}

const useGetPostByIdInBatch = () => {
  const [postBatch, setPostBatch] = useState<APIPOSTTypes[] | null>([
    EMPTYAPIPOSTSTATE,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // change path dev to live
  const POST_PATH = `${API_URL}${API_POSTS_ROUTE}${API_POSTS_ENDPOINTS.getPostById}`;
  // const POST_PATH = `${API_DEV}${API_POSTS_ROUTE}${API_POSTS_ENDPOINTS.getPostById}`;

  const fetchPost = async (postId: string) => {
    try {
      const res = await axios.post(POST_PATH, { id: postId });
      const result: APIPOSTTypes = res.data.result.post;
      return result;
    } catch (error) {
      return null;
    }
  };

  const getPostBatch = async (ids: string[]) => {
    // start loading
    setIsLoading(true);

    // fetching posts
    const postsArr: APIPOSTTypes[] | null = [];
    for (let i: number = 0; i < ids.length; i++) {
      const post = await fetchPost(ids[i]);
      if (post) {
        postsArr[postsArr.length] = post;
      }
    }

    // adding posts to postbatch
    setPostBatch(postsArr);

    // stoping loading
    setIsLoading(false);
  };

  return { isLoading, postBatch, getPostBatch };
};

export default useGetPostByIdInBatch;
