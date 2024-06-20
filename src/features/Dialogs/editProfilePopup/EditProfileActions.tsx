const EditProfileActions = () => {
  return (
    <div className="flex items-center justify-end gap-3">
      <button className="bg-white hover:bg-gray-50 transition-colors ease-in duration-150 border py-2 px-3 rounded-md text-[14px]">
        Cancel
      </button>
      <button className="bg-azure-blue hover:bg-deep-blue transition-colors ease-in duration-150 border text-white py-2 px-3 rounded-md text-[14px]">
        Update
      </button>
    </div>
  );
};

export default EditProfileActions;
