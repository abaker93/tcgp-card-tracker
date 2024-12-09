const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto min-h-[calc(100vh-190px)] max-w-7xl p-8">
      {children}
    </div>
  );
};

export default MainContainer;
