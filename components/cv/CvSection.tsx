import classNames from "classnames";
import SubHeading from "../common/SubHeading";

type CvSectionProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export const CvSection = ({ children, title, className }: CvSectionProps) => (
  <div className={classNames("mt-4 cv-section", className)}>
    <SubHeading className="border-l-8 border-secondary mb-5">
      <span className="ml-4">{title}</span>
    </SubHeading>
    {children}
  </div>
);

export default CvSection;
