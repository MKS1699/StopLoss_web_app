"use client";

import { useState } from "react";
import useHeader from "../useHeader";
import {
  API_DEV,
  API_IPO_ENDPOINTS,
  API_IPO_ROUTE,
  API_URL,
} from "./endPoints";
import axios, { AxiosRequestConfig } from "axios";

const useUpdateIPO = () => {
  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "updating" | "updated"
  >("idle");

  const header = useHeader();

  async function updateIPO(ipoId: string, ipoUpdate: any) {
    // change path from dev to live
    // const PATH = `${API_DEV}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.updateIPO}`;
    const PATH = `${API_URL}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.updateIPO}`;

    // update status
    setUpdateStatus("updating");
    const config: AxiosRequestConfig = {
      url: PATH,
      method: "PUT",
      headers: {
        authorization: header?.authorization,
      },
      data: {
        id: ipoId,
        ipoUpdate,
      },
    };

    const res = await axios(config);
    if (res.status === 201) {
      setUpdateStatus("updated");
      return true;
    } else {
      setUpdateStatus("updated");
      return false;
    }
  }
  return { updateStatus, updateIPO };
};

export default useUpdateIPO;
