import clsx from 'clsx';

const PillButton = ({
  outline,
  active,
  onClick,
  className,
  children,
}: {
  outline?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: undefined;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={clsx(
        'flex h-12 items-center gap-3 rounded-full px-4 transition hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40 hover:shadow-inset-box',
        className,
        {
          'border-0 bg-gradient-to-r from-indigo-100/30 to-blue-100/40 shadow-inset-box':
            active,
          'border border-blue-900/10': !active && outline,
        },
      )}
      type="button"
      {...(onClick && { onClick })}
    >
      {children}
    </button>
  );
};

export default PillButton;
