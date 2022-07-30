import classNames from "classnames";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export const Heading = ({ children, className }: HeadingProps) => (
  <h1 className={classNames("text-4xl", className)}>{children}</h1>
);

export default Heading;
