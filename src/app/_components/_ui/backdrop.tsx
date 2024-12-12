import clsx from 'clsx';

const Backdrop = ({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        className,
        'fixed inset-0 z-50 h-screen w-screen bg-sky-700/20 backdrop-blur-sm transition',
        {
          hidden: !show,
        },
      )}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default Backdrop;
