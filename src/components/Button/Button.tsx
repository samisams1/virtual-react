import React from "react";

export type ButtonProps = {
  leftIcon?: JSX.Element;  // Correctly named leftIcon
  rightIcon?: JSX.Element;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({
  leftIcon,  // Correctly using leftIcon
  rightIcon,
  title = "",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`relative flex items-center group rounded-md font-medium h-10 w-full py-2 px-3 
      ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-color5 text-white hover:bg-color3 hover:text-white"}
      ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loader">Loading...</span> // Placeholder for loading spinner
      ) : (
        <>
          {leftIcon && <span className="absolute left-3">{leftIcon}</span>}
          <span className={`ml-4 ${leftIcon ? "pl-10" : ""} font-medium text-base text-[#344054] leading-6 group-hover:text-white`}>
            {title}
          </span>
          {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;