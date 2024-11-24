import { AllIPOPropsTypes } from "../all/page";
import CreateIPOMain from "./components/CreateIPOMain";

const CreateIPO = ({ ipoScreen, handleIPOScreen }: AllIPOPropsTypes) => {
  return (
    <CreateIPOMain ipoScreen={ipoScreen} handleIPOScreen={handleIPOScreen} />
  );
};

export default CreateIPO;
