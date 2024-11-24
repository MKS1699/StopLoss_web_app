"use client";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
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
import { useGetIPOById, useUpdateIPO } from "@/app/hooks/apiHooks";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  resetIPOSliceData,
  setIPOCardCreatedBy,
} from "@/app/redux/slice/ipoSlice";
import { GrUpdate } from "react-icons/gr";
import { IoReturnDownBack } from "react-icons/io5";
import toast from "react-hot-toast";

interface EditIPOMainPropsTypes extends AllIPOPropsTypes {
  ipoId: string;
}
const EditIPOMain = ({
  ipoScreen,
  handleIPOScreen,
  ipoId,
}: EditIPOMainPropsTypes) => {
  const dispatch = useAppDispatch();
  const { isLoading, ipo } = useGetIPOById({ ipoId });
  const {
    allotmentLink,
    allotmentStatus,
    category,
    createdBy,
    dates,
    exPremium,
    ipoPhase,
    linkedPostsId,
    logo,
    lotSize,
    name,
    offerPrice,
    status,
    subscription,
  } = ipo;
  // ipo edit status
  const [isIPOEdited, setIsIPOEdited] = useState<boolean>(false);
  // update hook
  const { updateStatus, updateIPO } = useUpdateIPO();
  // data to check
  const ipoUpdated = useAppSelector((state) => state.ipoSlice);
  const {
    allotmentLink: allotmentLinkEdit,
    allotmentStatus: allotmentStatusEdit,
    category: categoryEdit,
    createdBy: createdByEdit,
    dates: datesEdit,
    exPremium: exPremiumEdit,
    ipoPhase: ipoPhaseEdit,
    linkedPostsId: linkedPostsIdEdit,
    logo: logoEdit,
    lotSize: lotSizeEdit,
    name: nameEdit,
    offerPrice: offerPriceEdit,
    status: statusEdit,
    subscription: subscriptionEdit,
  } = ipoUpdated;

  // show edit dialog
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  // resetting the IPO Slice
  useEffect(() => {
    dispatch(resetIPOSliceData());
  }, []);

  // loading sate
  useEffect(() => {
    if (!isLoading && createdBy) {
      dispatch(setIPOCardCreatedBy({ createdBy }));
    }
  }, [isLoading]);

  // checking if ipo is edited
  // then setting ipoEditStatus
  useEffect(() => {
    if (
      name !== nameEdit ||
      allotmentLink !== allotmentLinkEdit ||
      allotmentStatus !== allotmentStatusEdit ||
      category !== categoryEdit ||
      dates.close !== datesEdit.close ||
      dates.listing !== datesEdit.listing ||
      dates.open !== datesEdit.open ||
      logo.medium !== logoEdit.medium ||
      logo.original !== logoEdit.original ||
      logo.thumbnail !== logoEdit.thumbnail ||
      exPremium !== exPremiumEdit ||
      ipoPhase !== ipoPhaseEdit ||
      linkedPostsId !== linkedPostsIdEdit ||
      offerPrice !== offerPriceEdit ||
      status !== statusEdit ||
      subscription !== subscriptionEdit
    ) {
      setIsIPOEdited(true);
    } else {
      setIsIPOEdited(false);
    }
  }, [
    allotmentLinkEdit,
    allotmentStatusEdit,
    categoryEdit,
    createdByEdit,
    datesEdit,
    exPremiumEdit,
    ipoPhaseEdit,
    linkedPostsIdEdit,
    logoEdit,
    lotSizeEdit,
    nameEdit,
    offerPriceEdit,
    statusEdit,
    subscriptionEdit,
  ]);

  function handleGoBack(): void {
    // todo : if ipo is edited then prompt to update or discard all changes.
    // if (isIPOEdited) {
    //   toast.error("IPO has been edited , you should update it.");
    // } else {
    //   handleIPOScreen("all");
    // }
    handleIPOScreen("all");
  }

  async function handleUpload() {
    if (isIPOEdited) {
      setShowEditDialog(true);
      const ipoUpdate = {
        allotmentLink: allotmentLinkEdit,
        allotmentStatus: allotmentStatusEdit,
        category: categoryEdit,
        dates: datesEdit,
        exPremium: exPremiumEdit,
        ipoPhase: ipoPhaseEdit,
        linkedPostsId: linkedPostsIdEdit,
        logo: logoEdit,
        lotSize: lotSizeEdit,
        name: nameEdit,
        offerPrice: offerPriceEdit,
        status: statusEdit,
        subscription: subscriptionEdit,
      };
      const result = await updateIPO(ipoId, ipoUpdate);
      if (result) {
        toast.success("IPO updated successfully.");
      } else {
        toast.error("Error updating IPO try again.");
        // todo : store this data and make it available for later
        // when there is the error in updating ipo
        const editedData = ipoUpdated;
      }
      setShowEditDialog(false);
      handleIPOScreen("all");
      dispatch(resetIPOSliceData());
    } else {
      toast.error("IPO has not been updated yet.");
    }
  }
  return (
    <div className="flex flex-col gap-4 relative">
      {/* edit / update ipo dialog */}
      {showEditDialog && (
        <IPOCardDialog dialogType="edit" ipoEditStatus={updateStatus} />
      )}
      {/* title */}
      <h1 className="w-full text-center h-fit py-2 text-3xl dark:text-light">
        Edit IPO Card
      </h1>
      <div className="flex flex-col">
        {/* ipoInfo */}
        <div className="w-full h-full flex flex-col md:flex-row gap-2 justify-evenly">
          {/* ipo Logo */}
          <IPOCardLogo ipoScreen="edit" dataToEdit={logo} />
          {/* ipo Name & dates */}
          <div className="w-full h-fit flex flex-col">
            <IPOCardName ipoScreen="edit" dataToEdit={name} />
            <IPOCardDates ipoScreen="edit" dataToEdit={dates} />
            {/* lotsize, offerPrice, subscription, exPremium */}
            <div className="w-full h-fit flex flex-col md:flex-row">
              <IPOCardLotSize ipoScreen="edit" dataToEdit={lotSize} />
              <IPOCardOfferPrice ipoScreen="edit" dataToEdit={offerPrice} />
              <IPOCardSubscription ipoScreen="edit" dataToEdit={subscription} />
              <IPOCardExPremium ipoScreen="edit" dataToEdit={exPremium} />
            </div>
          </div>
          {/* ipo category , phase & status */}
          <div className="w-full h-fit flex flex-col">
            <IPOCardCategory ipoScreen="edit" dataToEdit={category} />
            <IPOCardPhase ipoScreen="edit" dataToEdit={ipoPhase} />
            <IPOCardStatus ipoScreen="edit" dataToEdit={status} />
          </div>
        </div>
        {/* allotment Status & allotment Link */}
        <IPOCardAllotment
          ipoScreen="edit"
          dataToEdit={{ allotmentLink, allotmentStatus }}
        />
      </div>
      {/* linkedPosts */}
      <IPOCardLinkedPosts ipoScreen="edit" dataToEdit={linkedPostsId} />

      {/* todo : validation (done) , update ipo handling, error handling */}
      <div className="w-full h-auto flex flex-row justify-evenly items-center">
        <div
          onClick={handleUpload}
          className="w-full h-auto py-2 text-2xl text-bodyDark dark:text-light cursor-pointer text-center hover:scale-150 transition-all ease-in duration-150 flex flex-row gap-2 items-center justify-center"
        >
          <GrUpdate
            className={`w-6 h-6 ${isIPOEdited ? "animate-spinner" : ""}`}
          />
          <h3>Update</h3>
        </div>
        {/* to do :check for editstatus and perform back action accordingly */}
        <div
          onClick={handleGoBack}
          className="w-full h-auto py-2 text-2xl text-bodyDark dark:text-light cursor-pointer text-center hover:scale-150 transition-all ease-in duration-150 flex flex-row gap-2 items-center justify-center"
        >
          <IoReturnDownBack className="w-6 h-6" />
          <h3>Go Back</h3>
        </div>
      </div>
    </div>
  );
};

export default EditIPOMain;
