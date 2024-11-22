import React from 'react';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode; // Optional icon
  buttonLabel?: string;   // Optional button label
  buttonIcon?: React.ReactNode; // Optional button icon
  onButtonClick?: () => void;   // Function to handle button click
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  buttonLabel,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#00796b' }}>
      <section className="flex items-center px-4 md:px-8">
        {icon && <div className="mr-2">{icon}</div>}
        <h1 className="font-bold leading-8 text-white text-2xl">{title}</h1> {/* Changed text color to white for contrast */}
      </section>
      {buttonLabel && (
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={onButtonClick}
        >
          {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default PageHeader;