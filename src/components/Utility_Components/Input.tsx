interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string; // Optional, with default value 'text'
  className?: string; // Optional, with default value ''
  placeholder?: string;
}

const Input = function Input({
  label,
  type = 'text',
  className = '',
  placeholder,
  // accept,
  ...props
}: InputProps) {
  return (
    <div className="w-full filters">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
              ${className}`}
        {...props}
        placeholder={placeholder}
        // accept={accept}
      />
    </div>
  );
};

export default Input;
