"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHooks";
import {
  API_DEV,
  API_POSTS_ENDPOINTS,
  API_POSTS_ROUTE,
  API_URL,
} from "./endPoints";
import axios from "axios";
import { setDataSlicePosts } from "@/app/redux/slice/dataSlice";
import useHeader from "../useHeader";

const useGetAllPosts = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.session.token);
  const posts = useAppSelector((state) => state.data.posts);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const headers = useHeader();

  const fetch = async () => {
    // change url from dev to live
    // const PATH: string = `${API_DEV}${API_POSTS_ROUTE}${API_POSTS_ENDPOINTS.getAllPosts}`;

    const PATH: string = `${API_URL}${API_POSTS_ROUTE}${API_POSTS_ENDPOINTS.getAllPosts}`;

    if (headers?.authorization) {
      await axios
        .get(PATH, {
          headers: {
            authorization: headers?.authorization,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const { result } = res.data;
            const { posts } = result;
            dispatch(setDataSlicePosts({ posts }));
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (headers?.authorization) {
      fetch();
    }
  }, [headers?.authorization]);

  return { isLoading, posts };
};

export default useGetAllPosts;
