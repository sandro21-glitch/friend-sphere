import { useAppSelector } from "../../hooks/reduxHooks";
import EditProfilePopup from "./EditProfilePopup";

const Modals = () => {
  const { updateProfileModal } = useAppSelector((store) => store.modals);

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center z-[9999] min-h-screen">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="z-[9999]">
        {!updateProfileModal ? <EditProfilePopup /> : null}
      </div>
    </div>
  );
};

export default Modals;
