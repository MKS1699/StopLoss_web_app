"use state";

import { useEffect, useState } from "react";
import {
  API_DEV,
  API_IPO_ENDPOINTS,
  API_IPO_ROUTE,
  API_URL,
} from "./endPoints";
import axios from "axios";
import { APIIPOTypes, EMPTYAPIIPOSTATE } from "@/app/types/api_types/ipoTypes";

interface useGetIPOByIdPropsTypes {
  ipoId: string;
}

const useGetIPOById = ({ ipoId }: useGetIPOByIdPropsTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ipo, setIPO] = useState<APIIPOTypes>(EMPTYAPIIPOSTATE);

  useEffect(() => {
    // change url from dev to live
    // const PATH = `${API_DEV}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.getIPOById}`;
    const PATH = `${API_URL}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.getIPOById}`;

    const fetch = async () =>
      await axios
        .post(PATH, {
          id: ipoId,
        })
        .then((res) => {
          const { result } = res.data;
          if (res.status === 200) {
            const { ipo, message, operation } = result;
            setIPO(ipo);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));

    fetch();
  }, []);

  return { isLoading, ipo };
};

export default useGetIPOById;
