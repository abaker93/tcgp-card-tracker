import MenuDrawer from "@/app/_components/menuDrawer";

const Header = () => {
  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        <h1 className="text-center text-2xl font-bold">My Cards</h1>
        <MenuDrawer />
      </div>
    </div>
  );
};

export default Header;
