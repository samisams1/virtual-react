import React from "react";

export type ButtonProps = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  color?: "default" | "green" | "red"; // Added color prop for customization
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const MainButton: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  title = "",
  loading = false,
  disabled = false,
  className = "",
  color = "default", // Default color
  ...props
}) => {
  // Determine button styles based on the color prop
  const colorStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    green: "bg-green-500 text-white hover:bg-green-600",
    red: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`relative flex items-center group rounded-md font-medium 
      ${disabled ? "bg-gray-300 cursor-not-allowed" : colorStyles[color]}
      ${className} py-2 px-3`} // Default padding for minimum size
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loader">Loading...</span> // Placeholder for loading spinner
      ) : (
        <>
          {leftIcon && <span className="absolute left-3">{leftIcon}</span>}
          <span className={`flex-1 ${leftIcon ? "ml-10" : "ml-4"} font-medium leading-6 group-hover:text-white`}>
            {title}
          </span>
          {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default MainButton;