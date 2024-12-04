import MenuButton from './_menu/menuButton';
import MenuDrawer from './_menu/menuDrawer';

const Header = (props) => {
  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        <h1 className="text-center text-2xl font-bold">My Cards</h1>
        <div className="absolute right-0 top-0 p-6">
          <MenuButton />
          <MenuDrawer />
        </div>
      </div>
    </div>
  );
};

export default Header;
