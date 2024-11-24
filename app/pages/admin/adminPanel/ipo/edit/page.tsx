import { AllIPOPropsTypes } from "../all/page";
import EditIPOMain from "./components/EditIPOMain";

interface EditIPOMainPropsTypes extends AllIPOPropsTypes {
  ipoIdToEdit: string;
}

const EditIPO = ({
  ipoScreen,
  handleIPOScreen,
  ipoIdToEdit,
}: EditIPOMainPropsTypes) => {
  return (
    <EditIPOMain
      ipoScreen={ipoScreen}
      handleIPOScreen={handleIPOScreen}
      ipoId={ipoIdToEdit}
    />
  );
};

export default EditIPO;
