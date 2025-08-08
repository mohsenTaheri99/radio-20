import React, { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  type?: "text" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  className?: string;
};

const CustomInput: React.FC<Props> = ({
  label,
  value,
  type = "text",
  onChange,
  name,
  placeholder,
  className,
}) => {
  const [lableMoveTop, setlableMoveTop] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current?.value.length !== 0) setlableMoveTop(true);
  }, []);
  return (
    <div
      className={
        "text-sm text-gray-700  p-2 rounded-md flex flex-col gap-1 relative " +
        className
      }
    >
      <label
        className="text-black text-opacity-0 absolute bg-white px-2 h-2"
        style={{
          top: "0",
          right: `20px`,

          transform: lableMoveTop
            ? `translate( 0 , 40%)`
            : `translate( 0 , 0%)`,
        }}
      >
        <span className=" opacity-0">{label}</span>
      </label>
      <label
        className="text-gray-1000 text-l  absolute transition-all duration-200 px-2 cursor-text "
        style={{
          top: "50%",
          right: `20px`,

          transform: lableMoveTop
            ? `translate( 0 , -160%)`
            : `translate( 0 , -50%)`,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </label>

      <input
        ref={inputRef}
        className="border border-gray-300 p-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type={type}
        value={value}
        onFocus={() => setlableMoveTop(true)}
        onBlur={(e) =>
          e.target.value.length !== 0 ? 1 : setlableMoveTop(false)
        }
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
