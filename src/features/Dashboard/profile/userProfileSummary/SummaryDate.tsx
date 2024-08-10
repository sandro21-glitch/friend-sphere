import { useAppSelector } from "../../../../hooks/reduxHooks";

const SummaryDate: React.FC = () => {
  const registerDate = useAppSelector(
    (store) => store.auth.userData?.registeredDate
  );

  // calculate the number of days between two dates
  const calculateDaysSince = (startDate: string, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(startDate);
    const secondDate = endDate;

    const diffDays = Math.round(
      Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
    );
    return diffDays;
  };

  // format the date as "Month Day, Year"
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate the number of days since registration
  const daysSinceRegistration = calculateDaysSince(
    registerDate || "",
    new Date()
  );

  // format the registration date
  const formattedDate = formatDate(registerDate || "");

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-[16px] lg:text-[20px]">Profile Summary</h3>
      <p className="text-[14px]">
        Joined {daysSinceRegistration} days ago ({formattedDate})
      </p>
    </div>
  );
};

export default SummaryDate;
