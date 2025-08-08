import { useState } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import type { Insurance } from "../../../types";
import CustomButton from "../../../components/ui/CustomButton";
// import CustomCheckbox from "../../../components/ui/CustomCheckbox";
const defultFormValue: Insurance = {
  name: "",
  coveragePercent: 0,
  hasContract: false,
  type: "base",
};
type props = {
  callback: (Insurance: Insurance) => void;
  show: boolean;
};
const InsuranceAddFrom = ({ callback, show }: props) => {
  const [form, setForm] = useState<Insurance>(defultFormValue);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div
      className=" absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md "
      style={{ display: show ? "unset" : "none" }}
    >
      <h1 className="px-4 font-bold ">افزودن بیمه</h1>
      <div className="grid grid-cols-2  gap-1 min-w-100 mt-5 ">
        {inputFields.map((field, i) => {
          return (
            <CustomInput
              key={i}
              className={field.className}
              name={field.name}
              label={field.label}
              value={form[field.name] as any}
              onChange={handleChange}
            />
          );
        })}
        <div>{/* <CustomCheckbox label="پوشش"  }/> */}</div>
      </div>
      <div className="px-2 mt-3">
        <CustomButton label="افزودن" onClick={() => callback(form)} />
      </div>
    </div>
  );
};

export default InsuranceAddFrom;

type InputField = {
  name: keyof Insurance;
  label: string;
  type?: "text" | "number";
  className?: string;
  placeholder?: string;
};
const inputFields: InputField[] = [
  { name: "name", label: "نام بیمه", type: "text", className: "" },
  {
    name: "coveragePercent",
    label: "درصد پوشش",
    type: "number",
    className: "",
  },
  { name: "maxCoverage", label: "سقف پوشش", type: "number", className: "" },
  { name: "type", label: "نوع بیمه", type: "text", className: "" }, // یا یک دراپ‌داون با base/supplementary
];
