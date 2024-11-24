import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";
import Image from "next/image";

interface IPOCardImagePropsTypes {
  logo: APIIPOTypes["logo"];
  name: APIIPOTypes["name"];
}

const IPOCardImage = ({ logo, name }: IPOCardImagePropsTypes) => {
  return (
    <Image
      src={logo?.original}
      alt={`${name}-ipo-logo`}
      width={150}
      height={150}
      className="w-24 h-24"
    />
  );
};

export default IPOCardImage;
