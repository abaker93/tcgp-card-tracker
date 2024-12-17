import clsx from 'clsx';

const Alert = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'fixed bottom-5 left-8 right-8 z-20 max-w-sm rounded-3xl bg-blue-50 px-8 py-5 shadow-btn transition',
        { hidden: !show },
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
