type TooltipTypes = {
  message?: string;
  action: string;
};

const Tooltip = ({ message, action }: TooltipTypes) => {
  return (
    <div
      className="absolute z-10 hidden group-hover:block py-1 px-2 text-[12px]
       whitespace-nowrap font-medium
               text-white bg-azure-blue rounded-md transform -translate-x-1/2 -translate-y-full
               -top-1 left-1/2"
      role="tooltip"
    >
      <span className="capitalize">{action}</span>{" "}
      <span className="lowercase">{message}</span>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-azure-blue border-l-8 border-r-8 border-l-transparent border-r-transparent top-full"></div>
    </div>
  );
};

export default Tooltip;
