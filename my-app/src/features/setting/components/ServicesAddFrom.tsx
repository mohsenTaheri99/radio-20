import { useState } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import type { Service } from "../../../types";
import CustomButton from "../../../components/ui/CustomButton";
// import CustomCheckbox from "../../../components/ui/CustomCheckbox";
const defultFormValue: Service = {
  serviceName: "",
  price: 0,
};
type props = {
  callback: (Insurance: Service) => void;
  show: boolean;
};
const ServicesAddFrom = ({ callback, show }: props) => {
  const [form, setForm] = useState<Service>(defultFormValue);
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

export default ServicesAddFrom;

type InputField = {
  name: keyof Service;
  label: string;
  type?: "text" | "number";
  className?: string;
  placeholder?: string;
};
const inputFields: InputField[] = [
  { name: "serviceName", label: "نام خدمت", type: "text", className: "" },
  {
    name: "price",
    label: "قیمت",
    type: "number",
    className: "",
  },
];
