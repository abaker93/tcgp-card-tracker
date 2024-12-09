const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-8">
      {children}
    </div>
  );
};

export default CardContainer;
