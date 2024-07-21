type TooltipTypes = {
  message?: string;
  action: string;
};

const Tooltip = ({ message, action }: TooltipTypes) => {
  return (
    <div
      className="absolute z-10 hidden p-1 text-[12px] text-nowrap font-medium
             text-white bg-azure-blue rounded-lg group-hover:inline-block -translate-y-full top-0"
      role="tooltip"
    >
      <span className="capitalize">{action}</span>{" "}
      <span className="lowercase">{message}</span>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-azure-blue border-l-8 border-r-8 border-l-transparent border-r-transparent top-full"></div>
    </div>
  );
};

export default Tooltip;
