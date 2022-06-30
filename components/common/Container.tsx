type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <div className="container mx-auto p-6 m-16 max-w-screen-lg bg-base-100 rounded-3xl grid grid-cols-1 gap-4">
    {children}
  </div>
);

export default Container
