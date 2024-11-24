"use client";
import { useDeleteIPOById, useGetAllIPO } from "@/app/hooks/apiHooks";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { RiAlarmWarningFill } from "react-icons/ri";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { IPOCardDialog } from "../../components";
import { resetIPOSliceData } from "@/app/redux/slice/ipoSlice";
import { searchIPO } from "@/app/utils/tools";

interface AllIPOMainPropsTypes {
  ipoScreen: string;
  handleIPOScreen: (ipoScreen: string) => void;
  handleIPOIdToEdit: (id: string) => void;
}

const AllIPOMain = ({
  ipoScreen,
  handleIPOScreen,
  handleIPOIdToEdit,
}: AllIPOMainPropsTypes) => {
  const dispatch = useAppDispatch();
  const { isLoading, ipoCards, fetchAllIPOCards } = useGetAllIPO();
  const { deleteIPO, isDeleted } = useDeleteIPOById();
  // loggedIn user credentials
  const userId = useAppSelector((state) => state.session.userId);
  const userName = useAppSelector((state) => state.session.userName);

  const loggedInUser = {
    userId,
    userName,
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const [activePage, setActivePage] = useState<number>(1);
  const [pageBatches, setPageBatches] = useState<number[][]>([]);

  const [ipoCardsToRender, setIPOCardsToRender] =
    useState<IPOTypes[]>(ipoCards);

  const [searchQuery, setSearchQuery] = useState<string>("");

  function ipoCardsPaginationCreate() {
    const cardsToShowPerPage: number = 4;
    const batches: number[][] = [];
    // creating post batches
    for (var i = 1; i <= ipoCards.length; i += cardsToShowPerPage) {
      const batch: number[] = [];
      for (var j = i; j < i + cardsToShowPerPage && j <= ipoCards.length; j++) {
        batch.push(j);
      }
      batches.push(batch);
    }
    setPageBatches(batches);
    // setActivePage(1);
  }

  function handleIPOCardsToRender() {
    if (ipoCards.length > 4) {
      const ipoCardsIndexes: number[] = pageBatches[activePage - 1];
      const ipoCardsIndexesIPOArr: IPOTypes[] = [];
      ipoCardsIndexes?.map((ipoIndex: number) => {
        ipoCardsIndexesIPOArr.push(ipoCards[ipoIndex - 1]);
      });
      setIPOCardsToRender(ipoCardsIndexesIPOArr);
    } else {
      setIPOCardsToRender(ipoCards);
    }
  }

  function handleIPODelete({
    createdBy,
    loggedInUser,
    ipoId,
  }: {
    createdBy: IPOTypes["createdBy"];
    loggedInUser: IPOTypes["createdBy"];
    ipoId: string;
  }) {
    if (
      createdBy.userId === loggedInUser.userId &&
      createdBy.userName === loggedInUser.userName
    ) {
      setShowDeleteDialog(true);
      deleteIPO(ipoId);
      dispatch(resetIPOSliceData());
      // fetchAllIPOCards();
      handleIPOScreen("all");
      setShowDeleteDialog(false);
    } else {
      toast.error(
        "This IPO is not created by you, you can delete IPO only which you have created."
      );
    }
  }

  // pagination
  useEffect(() => {
    ipoCardsPaginationCreate();
    handleIPOCardsToRender();
  }, [ipoCards, activePage]);

  useEffect(() => {
    if (isDeleted === "deleted") {
      fetchAllIPOCards();
    }
  }, [isDeleted]);

  function handlePrevPage() {
    if (activePage <= 1) {
      toast.custom(
        (t) => (
          <div className="flex flex-row justify-center items-center bg-light p-3 rounded-md">
            <RiAlarmWarningFill className="w-8 h-8 text-[#FF0000]" />
            <p className="text-xl">
              There is no page&nbsp;
              <span className="inline-block text-[#FF0000]">0</span>.
            </p>
          </div>
        ),
        { duration: 1000 }
      );
    } else {
      setActivePage((pre) => pre - 1);
    }
  }

  function handleNextPage() {
    if (activePage < pageBatches.length) {
      let nextPage: number = activePage + 1;
      setActivePage(nextPage);
    }
    if (activePage === pageBatches.length) {
      toast.custom(
        (t) => (
          <div className="flex flex-row justify-center items-center bg-light p-3 rounded-md">
            <RiAlarmWarningFill className="w-8 h-8 text-[#FF0000]" />
            <p className="text-xl">
              Already at&nbsp;
              <span className="inline-block text-[#FF0000]">last</span>
              &nbsp;page.
            </p>
          </div>
        ),
        { duration: 1000 }
      );
    }
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      const handleSearch = setTimeout(() => {
        const result = searchIPO(searchQuery, ipoCards);
        if (result.length > 0) {
          setIPOCardsToRender(result);
          toast.success("IPO(s) found.");
        } else {
          ipoCardsPaginationCreate();
          handleIPOCardsToRender();
          setSearchQuery("");
          toast.error("No such IPO");
        }
      }, 3000);
    } else {
      ipoCardsPaginationCreate();
      handleIPOCardsToRender();
    }
  }, [searchQuery]);
  return (
    <div className="w-full h-auto flex flex-col gap-2 relative">
      {/* delete dialog */}
      {showDeleteDialog && (
        <IPOCardDialog dialogType="delete" ipoDeleteStatus={isDeleted} />
      )}
      {/* create IPO button & search bar */}
      <div className="w-full h-auto flex flex-row items-center gap-2">
        {/* todo : search bar ant its functionality */}
        <input
          type="text"
          id="all-ipo-search-bar"
          name="all-ipo-search-bar"
          className="outline-none indent-1 w-full text-2xl text-dark dark:bg-[#003831] dark:text-light  transition-all duration-150 ease-in border-b-2 border-solid border-dark dark:border-light p-1 md:p-2"
          placeholder="Search IPO"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value.toString())}
        />
        <div
          onClick={() => handleIPOScreen("create")}
          className="w-fit h-full flex flex-row self-end items-center border-solid border-2 rounded-md border-dark p-1 md:p-2 cursor-cell hover:scale-105 transition-all duration-100 ease-linear"
        >
          <div className="text-xl md:text-3xl">Create</div>
          <IoCreateOutline className="w-6 md:w-8 h-6 md:h-8" />
        </div>
      </div>
      {/* loading */}
      {isLoading && (
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 grid-flow-row md:grid-rows-2 gap-4">
          <div className="w-72 md:w-96 h-96 md:h-72 bg-[#ccc] bg-opacity-30 rounded-md flex flex-col p-2 gap-2">
            {/* logo */}
            <div className="w-32 h-16 animate-skeleton"></div>
            {/* title */}
            <div className="w-full h-16 animate-skeleton"></div>
            {/* info */}
            <div className="w-full h-80 md:h-52 animate-skeleton"></div>
          </div>
          <div className="w-72 md:w-96 h-96 md:h-72 bg-[#ccc] bg-opacity-30 rounded-md flex flex-col p-2 gap-2">
            {/* logo */}
            <div className="w-32 h-16 animate-skeleton"></div>
            {/* title */}
            <div className="w-full h-16 animate-skeleton"></div>
            {/* info */}
            <div className="w-full h-80 md:h-52 animate-skeleton"></div>
          </div>
          <div className="w-72 md:w-96 h-96 md:h-72 bg-[#ccc] bg-opacity-30 rounded-md flex flex-col p-2 gap-2">
            {/* logo */}
            <div className="w-32 h-16 animate-skeleton"></div>
            {/* title */}
            <div className="w-full h-16 animate-skeleton"></div>
            {/* info */}
            <div className="w-full h-80 md:h-52 animate-skeleton"></div>
          </div>
          <div className="w-72 md:w-96 h-96 md:h-72 bg-[#ccc] bg-opacity-30 rounded-md flex flex-col p-2 gap-2">
            {/* logo */}
            <div className="w-32 h-16 animate-skeleton"></div>
            {/* title */}
            <div className="w-full h-16 animate-skeleton"></div>
            {/* info */}
            <div className="w-full h-80 md:h-52 animate-skeleton"></div>
          </div>
        </div>
      )}
      {/* ipo cards */}
      {!isLoading && (
        <div className="flex flex-col gap-4">
          {/* ipo & its pagination */}
          <div className="w-full min-h-screen p-2 flex flex-col justify-center items-center">
            {/* todo: searching animation */}
            {/* ipo */}
            {ipoCards.length > 0 && (
              <div className="w-full min-h-[80vh] flex-1 grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2">
                {/* ipo cards are there */}
                {ipoCardsToRender?.map((ipo: any, ipoIndex: number) => {
                  const {
                    category,
                    createdBy,
                    dates,
                    exPremium,
                    ipoPhase,
                    logo,
                    lotSize,
                    name,
                    offerPrice,
                    status,
                    subscription,
                    _id,
                  } = ipo;

                  return (
                    <div
                      key={`all-ipo-cards-ipo-card-${_id}-ipo-${ipoIndex}`}
                      className="w-full h-auto p-2 flex flex-col border-[1px] border-dashed border-dark"
                    >
                      {/* ipoCard */}
                      <div className="w-full h-auto flex flex-col gap-1">
                        {/* logo */}
                        <div className="w-full h-16 flex-1 flex flex-col md:flex-row gap-2">
                          <Image
                            src={logo.original}
                            alt={name}
                            width={128}
                            height={64}
                            quality={100}
                            className="w-32 h-16"
                          />
                          {/* title */}
                          <div className="w-full h-full text-2xl self-center">
                            {name}
                          </div>
                        </div>
                        {/* info */}
                        <div className="w-full h-auto flex flex-col">
                          {/* dates */}
                          <div className="w-full h-auto flex flex-row gap-3 justify-between">
                            {/* open */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Open Date</div>
                              <div>{dates.open}</div>
                            </div>
                            {/* close */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Close Date</div>
                              <div>{dates.close}</div>
                            </div>
                            {/* listing */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Listing Date</div>
                              <div>{dates.listing}</div>
                            </div>
                          </div>
                          {/* offer price, lot size, subscription, ex. premium */}
                          <div className="w-full h-auto flex flex-row gap-3 justify-between">
                            {/* offer price */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Offer Price</div>
                              <div>{offerPrice}</div>
                            </div>
                            {/* lot size */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Lot Size</div>
                              <div>{lotSize}</div>
                            </div>
                            {/* subscription */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Subscription</div>
                              <div>{subscription}</div>
                            </div>
                            {/* ex. premium */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Ex. Premium</div>
                              <div>{exPremium}</div>
                            </div>
                          </div>
                          {/* category, status, phase */}
                          <div className="w-full h-auto flex flex-row gap-3 justify-between">
                            {/* category */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Category</div>
                              <div>{category}</div>
                            </div>
                            {/* status */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Status</div>
                              <div>{status}</div>
                            </div>
                            {/* phase */}
                            <div className="flex flex-col md:gap-2 items-center">
                              <div className="text-lg">Phase</div>
                              <div>{ipoPhase}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ipoButtons */}
                      {/* todo : edit done & delete functionality */}
                      <div className="w-full flex flex-row justify-evenly items-center text-xl">
                        <div
                          className="w-full h-fit flex flex-row justify-center gap-1 cursor-pointer"
                          onClick={() => {
                            handleIPOScreen("edit");
                            handleIPOIdToEdit(_id);
                          }}
                        >
                          <MdOutlineModeEdit className="w-6 h-6" />
                          <div>Edit</div>
                        </div>
                        <div
                          className="w-full h-fit flex flex-row justify-center gap-1 cursor-pointer"
                          onClick={() =>
                            handleIPODelete({
                              createdBy,
                              loggedInUser,
                              ipoId: _id,
                            })
                          }
                        >
                          <RiDeleteBin2Line className="w-6 h-6" />
                          <div>Delete</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* no ipo cards */}
              </div>
            )}
            {ipoCards.length <= 0 && (
              <div className="w-full h-auto text-3xl md:text-5xl col-span-2 self-center p-2 text-center flex flex-col gap-3">
                <div>Please create IPO first.</div>
                <div
                  onClick={() => handleIPOScreen("create")}
                  className="w-fit h-full self-center flex flex-row border-solid border-2 rounded-md border-dark p-1 md:p-2 cursor-cell hover:scale-105 transition-all duration-100 ease-linear gap-2"
                >
                  <div className="text-3xl md:text-5xl">Create</div>
                  <IoCreateOutline className="w-10 md:w-8 h-10 md:h-8 self-end" />
                </div>
              </div>
            )}
            {/* pagination */}
            {/* todo:pagination when there too much ipo */}
            {ipoCards.length > 4 && (
              <div className="w-fit h-fit p-2 flex flex-row gap-2 justify-self-end items-center justify-evenly">
                {/* prev page btn */}
                <div
                  className="text-xl border-2 border-solid border-dark rounded-md w-8 h-8 text-center cursor-pointer flex flex-row items-center justify-center"
                  onClick={handlePrevPage}
                >
                  <FaHandPointLeft className="" />
                </div>
                {pageBatches?.map((_, pageBatchIndex: number) => {
                  return (
                    <div
                      key={`ipo-cards-pagination-page-${pageBatchIndex}-btn`}
                      className="text-xl border-2 border-solid border-dark rounded-md w-8 h-8 text-center cursor-pointer"
                      onClick={() => setActivePage(pageBatchIndex + 1)}
                    >
                      {pageBatchIndex + 1}
                    </div>
                  );
                })}
                {/* next page btn */}
                <div
                  className="text-xl border-2 border-solid border-dark rounded-md w-8 h-8 text-center cursor-pointer flex flex-row items-center justify-center"
                  onClick={handleNextPage}
                >
                  <FaHandPointRight className="" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllIPOMain;
