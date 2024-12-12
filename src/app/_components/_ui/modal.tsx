import clsx from 'clsx';
import Backdrop from '../_ui/backdrop';

const Modal = ({
  show,
  onClick,
  children,
}: {
  show: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Backdrop show={show} className="flex items-center justify-center">
      <div className="fixed inset-0 h-screen w-screen" onClick={onClick}></div>
      <div
        className={clsx(
          'inset-0 z-50 h-auto w-3/4 max-w-full rounded-3xl bg-blue-50 px-8 py-8 shadow-btn transition sm:w-1/2',
          {
            hidden: !show,
          },
        )}
      >
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
