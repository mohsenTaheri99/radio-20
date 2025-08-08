import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
type Props = {
  label: string;
  type?: "text" | "number";
  handelChenge: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string;
  optiens: string[];
};

const CustomSelecte: React.FC<Props> = ({
  label,
  type = "text",
  handelChenge,
  name,
  placeholder,
  className,
  optiens,
}) => {
  const [showDropdown, SetSowDropDown] = useState<boolean>(false);
  const [lableMoveTop, setlableMoveTop] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        SetSowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    handelChenge(value);
  }, [value]);

  useEffect(() => {
    if (value.length !== 0) setlableMoveTop(true);
  }, [value]);
  return (
    <div
      ref={boxRef}
      className={
        "text-sm text-gray-700 rounded-md flex flex-col  relative " + className
      }
    >
      <div
        className={
          "text-sm text-gray-700 rounded-md flex p-2 flex-col gap-1 relative " +
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
          onChange={(e) => setValue(e.target.value)}
          name={name}
          placeholder={placeholder}
        />
        <button
          className=" absolute top-1/2 tran left-3 border rounded border-gray-300 cursor-pointer p-1"
          style={{
            transform: `translate( 0 , -50%)`,
          }}
          onClick={() => SetSowDropDown((s) => !s)}
        >
          {!showDropdown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </button>
      </div>
      <div
        className="px-2 mx-2 transition-all border border-gray-300 rounded-md  duration-300 max-h-40 overflow-y-scroll overflow-x-hidden"
        style={{
          height: showDropdown ? "100px" : "0px",
        }}
      >
        <div className="p-2  flex flex-col items-start gap-0.5">
          {optiens.map((op) => {
            return (
              <button
                className="bg-gray-50 w-full text-start px-2 border-1 rounded border-gray-300 hover:border-blue-400 cursor-pointer"
                onClick={() => setValue(op)}
              >
                {op}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomSelecte;
