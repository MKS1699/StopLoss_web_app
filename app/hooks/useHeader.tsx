"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "./storeHooks";

type HEADERS = {
  // authorization : `bearer ${token}`
  authorization: string;
};

const useHeader = () => {
  const [headers, setHeaders] = useState<HEADERS>({
    authorization: "",
  });

  const token = useAppSelector((state) => state.session.token);

  useEffect(() => {
    if (token.length > 0) {
      setHeaders({ authorization: `bearer ${token}` });
    }
  }, [token]);

  if (headers.authorization.length > 0) {
    return headers;
  } else {
    return null;
  }
};

export default useHeader;
