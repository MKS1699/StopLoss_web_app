import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardAllotmentLinkPropsTypes {
  allotmentLink: APIIPOTypes["allotmentLink"];
}

const IPOCardAllotmentLink = ({
  allotmentLink,
}: IPOCardAllotmentLinkPropsTypes) => {
  return (
    <a
      href={allotmentLink}
      target="_blank"
      className="w-auto h-auto self-end p-2 text-light bg-[#27187E] rounded-md cursor-pointer"
    >
      Check Allotment
    </a>
  );
};

export default IPOCardAllotmentLink;
