import classNames from "classnames";

type SubHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const SubHeading = ({ children, className }: SubHeadingProps) => (
  <h2 className={classNames("text-2xl", className)}>{children}</h2>
);

export default SubHeading;
