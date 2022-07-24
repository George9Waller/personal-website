import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type CvSkillProps = {
  icon?: IconDefinition;
  name: string;
};

export const CvSkill = ({ icon, name }: CvSkillProps) => {
  const classes = classNames(
    "flex-none flex items-center content-center rounded-lg bg-opacity-20 bg-gray-200 hover:bg-opacity-40 transition duration-500 ease-in-out px-2 py-1",
    icon && "text-2xl"
  );
  if (icon) {
    return (
      <div className="tooltip" data-tip={name}>
        <span className={classes}>
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
    );
  } else {
    return <span className={classNames(classes, "text-sm")}>{name}</span>;
  }
};

export default CvSkill;
