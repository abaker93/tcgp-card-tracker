import clsx from 'clsx';

const LinkButton = ({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={clsx(
        className,
        'flex h-12 items-center gap-3 rounded-full px-4 transition hover:bg-gradient-to-r hover:from-indigo-100/30 hover:to-blue-100/40 hover:shadow-inset-box',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LinkButton;
