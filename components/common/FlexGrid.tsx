type FlexGridProps = {
  children: React.ReactNode;
};

export const FlexGrid = ({ children }: FlexGridProps) => (
  <div className="flex flex-wrap justify-around gap-8">
    {children}
  </div>
);

export default FlexGrid
