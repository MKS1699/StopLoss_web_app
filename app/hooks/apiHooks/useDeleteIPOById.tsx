"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import useHeader from "../useHeader";
import {
  API_DEV,
  API_IPO_ENDPOINTS,
  API_IPO_ROUTE,
  API_URL,
} from "./endPoints";
import toast from "react-hot-toast";

const useDeleteIPOById = () => {
  const [isDeleted, setIsDeleted] = useState<"idle" | "processing" | "deleted">(
    "idle"
  );
  const headers = useHeader();
  async function deleteIPO(ipoId: string) {
    // development url
    // const PATH = `${API_DEV}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.deleteIPO}`;
    // live url
    const PATH = `${API_URL}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.deleteIPO}`;

    const config: AxiosRequestConfig = {
      url: PATH,
      method: "DELETE",
      headers: {
        authorization: headers?.authorization,
      },
      data: {
        itemId: ipoId,
      },
    };
    setIsDeleted("processing");
    const res = await axios(config);
    const { data } = res;
    if (data.result.operation === "success") {
      setIsDeleted("deleted");
      toast.success("IPO deletion successful.");
    } else {
      setIsDeleted("deleted");
      toast.error("Error while deleting IPO.");
    }
  }
  return { isDeleted, deleteIPO };
};

export default useDeleteIPOById;
