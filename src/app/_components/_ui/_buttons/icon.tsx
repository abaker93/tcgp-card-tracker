import clsx from 'clsx';

const IconButton = ({
  onClick,
  className,
  children,
}: {
  onClick: any;
  className?: any;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={clsx(
        'mr-0.5 rounded-full bg-indigo-50 p-2 text-3xl shadow-btn transition hover:scale-110 hover:bg-indigo-100/50',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
