type titleType = {
  children: string;
  fontSize?: string;
  color?: string;
  className?: string;
};

const Title = ({ children, color = '#9333EA', className = '' }: titleType) => {
  return (
    <h1
      className={`font-semibold font-mono ${className} text-[${color}] text-4xl `}
    >
      {children}
    </h1>
  );
};

export default Title;
