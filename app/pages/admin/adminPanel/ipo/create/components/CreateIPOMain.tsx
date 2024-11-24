"use client";
import {
  useAppDispatch,
  useAppSelector,
  useIPOCardValidation,
} from "@/app/hooks";
import { AllIPOPropsTypes } from "../../all/page";
import {
  IPOCardAllotment,
  IPOCardCategory,
  IPOCardDates,
  IPOCardDialog,
  IPOCardExPremium,
  IPOCardLinkedPosts,
  IPOCardLogo,
  IPOCardLotSize,
  IPOCardName,
  IPOCardOfferPrice,
  IPOCardPhase,
  IPOCardStatus,
  IPOCardSubscription,
} from "../../components";
import { useEffect, useRef, useState } from "react";
import {
  resetIPOSliceData,
  setIPOCardCreatedBy,
} from "@/app/redux/slice/ipoSlice";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import toast from "react-hot-toast";
import { MdOutlineDangerous } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { IoReturnDownBack } from "react-icons/io5";
import { useGetAllIPO, usePostIPOCreate } from "@/app/hooks/apiHooks";
const CreateIPOMain = ({ ipoScreen, handleIPOScreen }: AllIPOPropsTypes) => {
  const dispatch = useAppDispatch();

  // ipo validator hook
  const { result, ipo } = useIPOCardValidation();
  const { fetchAllIPOCards } = useGetAllIPO();
  // ipo upload hook
  const { ipoUploadStatus, postIPO } = usePostIPOCreate();
  // user details for createdBy
  const userId = useAppSelector((state) => state.session.userId);
  const userName = useAppSelector((state) => state.session.userName);
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  useEffect(() => {
    dispatch(resetIPOSliceData());
    const createdBy: IPOTypes["createdBy"] = {
      userId,
      userName,
    };
    dispatch(setIPOCardCreatedBy({ createdBy }));
  }, []);

  // upload handling
  function handleUpload(): void {
    if (result.passed) {
      setShowUploadDialog(true);
      postIPO(ipo);
      dispatch(resetIPOSliceData());
      handleIPOScreen("all");
      fetchAllIPOCards();
      setShowUploadDialog(false);
      // todo : handle the error in the postIPO hook
    } else {
      // show error
      if (result.fieldErrors && result.fieldErrors?.length > 0) {
        result.fieldErrors?.map((err, errIndex: number) => {
          // sending errors
          toast.custom(
            (t) => (
              <div className="bg-light text-base flex flex-row rounded-md items-center justify-items-center gap-2 p-2">
                <MdOutlineDangerous className="text-[#FF0000] w-7 h-7" />
                <div className="text-bodyDark w-full flex-1 flex flex-row gap-1">
                  <div className="w-fit">{err.fieldName}</div>
                  <div className="w-fit">{err.fieldError}</div>
                </div>
              </div>
            ),
            { duration: 1500 }
          );
        });
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {/* ipo create dialog */}
      {showUploadDialog && (
        <IPOCardDialog dialogType="create" ipoUploadStatus={ipoUploadStatus} />
      )}
      {/* title */}
      <h1 className="w-full text-center h-fit py-2 text-3xl dark:text-light">
        Create IPO Card
      </h1>
      <div className="flex flex-col">
        {/* ipoInfo */}
        <div className="w-full h-full flex flex-col md:flex-row gap-2 justify-evenly">
          {/* ipo Logo */}
          <IPOCardLogo ipoScreen="create" />
          {/* ipo Name & dates */}
          <div className="w-full h-fit flex flex-col">
            <IPOCardName ipoScreen="create" />
            <IPOCardDates ipoScreen="create" />
            {/* lotsize, offerPrice, subscription, exPremium */}
            <div className="w-full h-fit flex flex-col md:flex-row">
              <IPOCardLotSize ipoScreen="create" />
              <IPOCardOfferPrice ipoScreen="create" />
              <IPOCardSubscription ipoScreen="create" />
              <IPOCardExPremium ipoScreen="create" />
            </div>
          </div>
          {/* ipo category , phase & status */}
          <div className="w-full h-fit flex flex-col">
            <IPOCardCategory ipoScreen="create" />
            <IPOCardPhase ipoScreen="create" />
            <IPOCardStatus ipoScreen="create" />
          </div>
        </div>
        {/* allotment Status & allotment Link */}
        <IPOCardAllotment ipoScreen="create" />
      </div>
      <IPOCardLinkedPosts ipoScreen="create" />
      {/* todo : ipo submit and after submit handling , validation ipo before creating / updating, also make inner routing within ipo all,create,edit possible */}
      <div className="w-full h-auto flex flex-row justify-evenly items-center">
        <div
          onClick={handleUpload}
          className="w-full h-auto py-2 text-2xl text-bodyDark dark:text-light cursor-pointer text-center hover:scale-150 transition-all ease-in duration-150 flex flex-row gap-2 items-center justify-center"
        >
          <GoUpload className="w-6 h-6" />
          <h3>Upload</h3>
        </div>
        <div
          onClick={() => handleIPOScreen("all")}
          className="w-full h-auto py-2 text-2xl text-bodyDark dark:text-light cursor-pointer text-center hover:scale-150 transition-all ease-in duration-150 flex flex-row gap-2 items-center justify-center"
        >
          <IoReturnDownBack className="w-6 h-6" />
          <h3>Go Back</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateIPOMain;
