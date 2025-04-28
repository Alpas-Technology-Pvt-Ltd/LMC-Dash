const Button = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md font-medium w-full bg-theme_color whitespace-nowrap  ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
