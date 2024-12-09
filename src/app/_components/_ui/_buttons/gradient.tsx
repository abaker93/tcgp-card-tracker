import clsx from 'clsx';

const GradientButton = ({
  className,
  onClick,
  disabled,
  children,
}: {
  className?: any;
  onClick?: any;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={clsx(
        className,
        'btn-gradient flex items-center gap-3 rounded-full px-8 py-2 transition',
        {
          'pointer-events-none opacity-50': disabled,
          'pointer-events-auto opacity-100 hover:scale-90': !disabled,
        },
      )}
      type="button"
      {...(onClick && { onClick })}
      {...(disabled && { disabled })}
    >
      {children}
    </button>
  );
};

export default GradientButton;
