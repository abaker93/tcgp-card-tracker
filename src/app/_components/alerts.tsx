import clsx from 'clsx';

const Alerts = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'fixed top-5 z-10 max-w-sm rounded-3xl bg-blue-50 p-8 shadow-btn transition',
        { '-left-full': show == false, 'left-5': show == true },
      )}
    >
      {children}
    </div>
  );
};

export default Alerts;
