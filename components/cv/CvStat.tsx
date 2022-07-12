import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import SubHeading from "../common/SubHeading";

type CvStatProps = {
  children: React.ReactNode;
  icon: IconDefinition;
};

export const CvStat = ({ children, icon }: CvStatProps) => (
  <div className="flex flex-row gap-2 items-center">
    <FontAwesomeIcon icon={icon} />
    {children}
  </div>
);

export default CvStat;
