import clsx from 'clsx';
import Backdrop from '../_ui/backdrop';

const MenuDrawer = ({
  userData,
  toggleMenuDrawer,
  openMenuDrawer,
  children,
}: {
  userData: any;
  toggleMenuDrawer: any;
  openMenuDrawer: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Backdrop show={openMenuDrawer}>
      <div
        className="fixed inset-0 h-screen w-screen"
        onClick={toggleMenuDrawer}
      ></div>
      <div
        className={clsx(
          'fixed inset-y-0 top-16 flex h-min w-screen max-w-md flex-col rounded-l-3xl bg-blue-50 px-8 py-16 shadow-btn transition',
          {
            '-right-full': !openMenuDrawer,
            'right-0': openMenuDrawer,
          },
        )}
      >
        {children}
      </div>
    </Backdrop>
  );
};

export default MenuDrawer;
