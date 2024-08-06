import notifyLogo from "../../../../assets/images/notify.svg";

const EmptyPosts = () => {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <p className="text-center text-gray-500 italic">
        None of your following users have posted anything yet. Check back later!
      </p>
      <img src={notifyLogo} alt="notify logo" loading="lazy" />
    </div>
  );
};

export default EmptyPosts;
