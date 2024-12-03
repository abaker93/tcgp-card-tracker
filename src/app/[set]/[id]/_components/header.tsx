import MenuDrawer from "@/app/_components/menuDrawer";
import { IconArrow } from "@/app/ui/icons";
import Link from "next/link";

const Header = (props: any) => {
  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        <div className="absolute left-0 top-0 p-6">
          <Link href={`/${props.set}`}>
            <button
              className="mr-0.5 rounded-full bg-indigo-50 p-2 text-3xl shadow-btn transition hover:scale-110 hover:bg-indigo-100"
              type="button"
              data-drawer-target="menu-drawer"
              data-drawer-show="menu-drawer"
            >
              <IconArrow dir="left" />
            </button>
          </Link>
        </div>
        <h1 className="text-center text-2xl font-bold">My Cards</h1>
        <MenuDrawer />
      </div>
    </div>
  );
};

export default Header;
