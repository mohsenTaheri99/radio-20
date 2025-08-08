import React from "react";

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  name?: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
  name,
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        name={name}
        className="w-4 h-4 accent-blue-600"
      />
      <span>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
