"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useHeader from "../useHeader";
import {
  API_DEV,
  API_IPO_ENDPOINTS,
  API_IPO_ROUTE,
  API_URL,
} from "./endPoints";
import toast from "react-hot-toast";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";

const usePostIPOCreate = () => {
  const [ipoUploadStatus, setIPOUploadStatus] = useState<
    "idle" | "uploading" | "uploaded"
  >("idle");

  const headers = useHeader();

  const postIPO = async (ipo: IPOTypes) => {
    // const PATH = `${API_DEV}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.createIPO}`;
    const PATH = `${API_URL}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.createIPO}`;
    setIPOUploadStatus("uploading");
    if (headers?.authorization) {
      const config: AxiosRequestConfig = {
        url: PATH,
        method: "POST",
        headers: {
          authorization: headers?.authorization,
        },
        data: {
          ipo,
        },
      };

      const res = await axios(config);

      if (res.status === 201) {
        setIPOUploadStatus("uploaded");
        toast.success("IPO Created.");
      } else if (res.status === 200 || res.status == 500) {
        setIPOUploadStatus("uploaded");
        toast.error("Error while uploading post please try again.");
        // todo : handle error
        // after this error or 500 error
        // tell the user the values he created has been saved
        // can login an try again
      }
    }
  };

  return { ipoUploadStatus, postIPO };
};

export default usePostIPOCreate;
