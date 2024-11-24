"use state";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHooks";
import {
  API_DEV,
  API_IPO_ENDPOINTS,
  API_IPO_ROUTE,
  API_URL,
} from "./endPoints";
import axios from "axios";
import { setIPOCards } from "@/app/redux/slice/dataSlice";

const useGetAllIPO = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ipoCards = useAppSelector((state) => state.data.ipoCards);

  async function fetchAllIPOCards() {
    // change url from dev to live
    // const PATH = `${API_DEV}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.getAllIPO}`;
    const PATH = `${API_URL}${API_IPO_ROUTE}${API_IPO_ENDPOINTS.getAllIPO}`;

    setIsLoading(true);

    await axios
      .get(PATH)
      .then((res) => {
        const { result } = res.data;
        const { operation, message, ALL_IPO } = result;
        if (ALL_IPO.length > 0 || ALL_IPO.length == 0) {
          dispatch(setIPOCards({ ipoCards: ALL_IPO }));
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchAllIPOCards();
  }, []);

  return { isLoading, ipoCards, fetchAllIPOCards };
};

export default useGetAllIPO;
