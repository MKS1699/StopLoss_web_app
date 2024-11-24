"use client";

import Image from "next/image";
import { IPOCardPropsTypes } from "./IPOCardName";
import SL from "@/public/Logo.svg";
interface IPOCardLogoPropsTypes extends IPOCardPropsTypes {
  dataToEdit?: IPOTypes["logo"];
}
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { ChangeEvent, useEffect, useState } from "react";
import { IPOTypes } from "@/app/types/slice_types/ipoSliceTypes";
import { useDispatch } from "react-redux";
import { setIPOCardLogo } from "@/app/redux/slice/ipoSlice";
import { useAppSelector } from "@/app/hooks";

const IPOCardLogo = ({ ipoScreen, dataToEdit }: IPOCardLogoPropsTypes) => {
  const dispatch = useDispatch();
  const ipoName = useAppSelector((state) => state.ipoSlice.name);
  const [logo, setLogo] = useState<IPOTypes["logo"]>({
    medium: "",
    original: "",
    thumbnail: "",
  });

  const [isUploading, setIsUploading] = useState<
    "idle" | "uploading" | "uploaded"
  >("idle");

  async function uploadingImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      // uploading
      setIsUploading("uploading");
      // image as form data
      const data = new FormData();
      data.append("image", e.target.files[0]);

      // axios config obj
      const config = {
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        params: {
          key: "ab9a90ee9fbb39ab4ae0f7f60d2e8804",
        },
        data,
      };

      // image upload
      const res = await axios(config);

      // if image uploaded
      if (res.status === 200) {
        toast.success("IPO Card Image Uploaded successfully");
        // required obj from res
        const { image, thumb, medium } = res.data.data;
        let ORIGINAL: string = image.url;
        let MEDIUM: string = medium ? medium?.url : "";
        let THUMBNAIL: string = thumb ? thumb?.url : "";
        // logo
        setLogo({
          original: ORIGINAL,
          medium: MEDIUM,
          thumbnail: THUMBNAIL,
        });
        // uploading
        setIsUploading("uploaded");
      }
    }
  }

  // pre data for editing
  useEffect(() => {
    if (ipoScreen === "edit" && dataToEdit) {
      setLogo(dataToEdit);
    }
  }, [dataToEdit]);

  // setting logo values in the store
  useEffect(() => {
    dispatch(setIPOCardLogo({ logo }));
  }, [logo]);

  return (
    <div className="w-32 h-auto p-1 flex flex-col gap-1">
      {/* image */}
      {/* create section */}
      {ipoScreen === "create" && (
        <>
          {/* idle */}
          {isUploading === "idle" && (
            <Image
              src={SL}
              alt={ipoName}
              width={128}
              height={80}
              className="w-32 h-20"
            />
          )}
          {/* uploading */}
          {isUploading === "uploading" && (
            <div className="!w-32 !h-20 animate-skeleton"></div>
          )}
          {/* uploaded */}
          {isUploading === "uploaded" && (
            <Image
              src={logo?.original}
              alt={ipoName}
              width={128}
              height={80}
              className="w-32 h-20"
            />
          )}
        </>
      )}
      {/* edit section */}
      {/* already uploaded image */}
      {ipoScreen === "edit" &&
        isUploading === "idle" &&
        (logo.original.length > 0 ? (
          <Image
            src={logo?.original}
            alt={ipoName}
            width={128}
            height={80}
            className="w-32 h-20"
          />
        ) : (
          <div className="!w-32 !h-20 animate-skeleton"></div>
        ))}
      {/* image uploading */}
      {ipoScreen === "edit" && isUploading === "uploading" && (
        <div className="!w-32 !h-20 animate-skeleton"></div>
      )}
      {/* imageUpdated */}
      {ipoScreen === "edit" && isUploading === "uploaded" && (
        <Image
          src={logo?.original}
          alt={ipoName}
          width={128}
          height={80}
          className="w-32 h-20"
        />
      )}
      {/* upload Image */}
      <label
        className="w-full h-auto text-xl flex flex-row items-center cursor-pointer dark:text-light bg-bodyDark bg-opacity-40 p-1 transition-all duration-150 ease-in"
        htmlFor="ipo-card-image"
      >
        <h3 className="flex-1 text-center">Upload</h3>
        <FaCloudUploadAlt />
      </label>
      <input
        type="file"
        accept="image/*"
        name="ipo-card-image"
        id="ipo-card-image"
        onChange={(e) => uploadingImage(e)}
        className="hidden"
      />
    </div>
  );
};

export default IPOCardLogo;
