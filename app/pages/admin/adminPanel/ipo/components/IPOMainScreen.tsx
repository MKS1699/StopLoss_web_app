"use client";

import { useState } from "react";
import AllIPO from "../all/page";
import CreateIPO from "../create/page";
import EditIPO from "../edit/page";

const IPOMainScreen = () => {
  const [ipoScreen, setIPOScreen] = useState<string>("all");
  function handleIPOScreen(ipoScreenToSet: string) {
    setIPOScreen(ipoScreenToSet);
  }

  const [ipoIdToEdit, setIPOIdToEdit] = useState<string>("");
  function handleIPOIdToEdit(ipoId: string) {
    setIPOIdToEdit(ipoId);
  }
  return (
    <div className="min-h-screen flex flex-col ml-7 p-2">
      {ipoScreen === "all" && (
        <AllIPO
          ipoScreen={ipoScreen}
          handleIPOScreen={handleIPOScreen}
          handleIPOIdToEdit={handleIPOIdToEdit}
        />
      )}
      {ipoScreen === "create" && (
        <CreateIPO ipoScreen={ipoScreen} handleIPOScreen={handleIPOScreen} />
      )}
      {ipoScreen === "edit" && (
        <EditIPO
          ipoScreen={ipoScreen}
          handleIPOScreen={handleIPOScreen}
          ipoIdToEdit={ipoIdToEdit}
        />
      )}
    </div>
  );
};

export default IPOMainScreen;
