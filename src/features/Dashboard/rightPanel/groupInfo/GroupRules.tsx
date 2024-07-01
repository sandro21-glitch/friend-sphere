import { BsPatchCheck } from "react-icons/bs";
type GroupRuleTypes = {
  rules: {
    description: string;
    id: string;
    rule: string;
  }[];
};

const GroupRules = ({ rules }: GroupRuleTypes) => {
  return (
    <div>
      <p className="mb-2 font-semibold">Community Guidelines:</p>
      <ul className="flex flex-col gap-2">
        {rules.map((rule) => {
          return (
            <li key={rule.id} className="flex items-center gap-2 text-[14px]">
              <div>
                <BsPatchCheck style={{ width: "1.1em", height: "1.1em" }} />
              </div>
              {rule.rule}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupRules;
