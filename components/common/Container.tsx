import classNames from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => (
  <div
    className={classNames(
      "container mx-auto p-6 m-16 max-w-screen-lg bg-base-100 rounded-3xl grid grid-cols-1 gap-4",
      className
    )}
  >
    {children}
  </div>
);

export default Container;
