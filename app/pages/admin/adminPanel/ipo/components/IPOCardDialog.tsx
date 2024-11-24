"use client";

import { IPOCardPropsTypes } from "./IPOCardName";
import { Spinner } from "@/app/components";
interface IPOCardDialogPropsTypes {
  ipoUploadStatus?: "idle" | "uploading" | "uploaded";
  dialogType: "create" | "edit" | "delete";
  ipoDeleteStatus?: "idle" | "processing" | "deleted";
  ipoEditStatus?: "idle" | "updating" | "updated";
}

const IPOCardDialog = ({
  ipoUploadStatus,
  dialogType,
  ipoDeleteStatus,
  ipoEditStatus,
}: IPOCardDialogPropsTypes) => {
  return (
    // dialog parent
    <div className="absolute top-0 left-0n w-full min-h-screen backdrop-blur-sm flex flex-col items-center justify-center">
      {/* dialog */}
      <div className="w-64 h-32 flex flex-row items-center justify-center bg-light bg-opacity-60 text-dark shadow-xl gap-4 rounded-md">
        <Spinner className="w-8 h-8" />
        {/* create Dialog */}
        {dialogType === "create" && (
          <>
            {ipoUploadStatus === "idle" && (
              <h4 className="text-2xl">Starting</h4>
            )}
            {ipoUploadStatus === "uploading" && (
              <h4 className="text-2xl">Creating IPO</h4>
            )}
            {ipoUploadStatus === "uploaded" && (
              <h4 className="text-2xl">IPO Created</h4>
            )}
          </>
        )}
        {/* delete Dialog */}
        {dialogType === "delete" && (
          <>
            {ipoDeleteStatus === "idle" && (
              <h4 className="text-2xl">Starting</h4>
            )}
            {ipoDeleteStatus === "processing" && (
              <h4 className="text-2xl">Deleting IPO</h4>
            )}
            {ipoDeleteStatus === "deleted" && (
              <h4 className="text-2xl">IPO Deleted</h4>
            )}
          </>
        )}
        {/* edit Dialog */}
        {dialogType === "edit" && (
          <>
            {ipoEditStatus === "idle" && <h4 className="text-2xl">Starting</h4>}
            {ipoEditStatus === "updating" && (
              <h4 className="text-2xl">Updating IPO</h4>
            )}
            {ipoEditStatus === "updated" && (
              <h4 className="text-2xl">IPO Updated</h4>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IPOCardDialog;
