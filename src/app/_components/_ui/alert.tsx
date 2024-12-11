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
        'fixed bottom-5 z-20 max-w-sm rounded-3xl bg-blue-50 px-8 py-5 shadow-btn transition',
        { '-left-full': show == false, 'left-5': show == true },
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
