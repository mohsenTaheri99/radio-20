import React from "react";

type CustomButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1 rounded-md bg-blue-400 hover:bg-blue-500 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
