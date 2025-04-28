type titleType = {
  children: string;
  fontSize?: string;
  color?: string;
  size?: string;
  className?: string;
};

const SubTitle = ({
  children,
  color = '#9333EA',
  size = '3xl',
  className = '',
}: titleType) => {
  return (
    <h2
      className={`font-semibold font-mono ${className} text-[${color}] text-${size} `}
    >
      {children}
    </h2>
  );
};

export default SubTitle;
