"use client";
import AllIPOMain from "./components/AllIPOMain";

export interface AllIPOPropsTypes {
  ipoScreen: string;
  handleIPOScreen: (ipoScreen: string) => void;
  handleIPOIdToEdit?: (id: string) => void;
}

const AllIPO = ({
  ipoScreen,
  handleIPOScreen,
  handleIPOIdToEdit,
}: AllIPOPropsTypes) => {
  return (
    <AllIPOMain
      ipoScreen={ipoScreen}
      handleIPOScreen={handleIPOScreen}
      handleIPOIdToEdit={handleIPOIdToEdit ? handleIPOIdToEdit : () => {}}
    />
  );
};

export default AllIPO;
