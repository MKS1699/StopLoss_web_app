import { APIIPOTypes } from "@/app/types/api_types/ipoTypes";

interface IPOCardNamePropsTypes {
  name: APIIPOTypes["name"];
}
const IPOCardName = ({ name }: IPOCardNamePropsTypes) => {
  return <div className="text-xl font-medium">{name}</div>;
};

export default IPOCardName;
