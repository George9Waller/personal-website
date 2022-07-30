import classNames from "classnames";

type ThirdHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const ThirdHeading = ({ children, className }: ThirdHeadingProps) => (
  <h2 className={classNames("text-lg", className)}>{children}</h2>
);

export default ThirdHeading;
