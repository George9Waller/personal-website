import classNames from "classnames";

type FlexGridProps = {
  children: React.ReactNode;
  className?: string;
};

export const FlexGrid = ({ children, className }: FlexGridProps) => (
  <div className={classNames("flex flex-wrap justify-around gap-8", className)}>
    {children}
  </div>
);

export default FlexGrid;
