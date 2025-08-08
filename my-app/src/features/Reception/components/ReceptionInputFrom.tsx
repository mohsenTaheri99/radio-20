import React, { useState } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewPatient } from "../../../services/api/patients.api";
import { getAllSettings } from "../../../services/api/setting.api";
import CustomSelecte from "../../../components/ui/CustomSelecte";
import { useMessage } from "../../../services/context/message.propvider";

type Gender = "male" | "female";

type PatientFormData = {
  name: string;
  lastName: string;
  gender: Gender;
  time: string;
  nationalId: string;
  phone: string;
  birthdate: string;
  insurance: string;
  insuranceNumber: string;
  fileNumber: string;
  radiologist: string;
  radiologyCode: string;
  therapist: string;
  medicalSystemNumber: string;
  registerDate: string;
  answerDate: string;
  printDate: string;
  validityDate: string;
  doctorName: string;
  paidAmount: number; // مبلغ پرداختی
  totalAmount: number; // مبلغ کل
  withoutDiscount: boolean; // بدون تخفیف
  radiologyType: string;
  service: string;
};
const defultFormValue: PatientFormData = {
  name: "",
  lastName: "",
  gender: "male",
  time: "",
  nationalId: "",
  phone: "",
  birthdate: "",
  insurance: "private",
  insuranceNumber: "",
  fileNumber: "",
  radiologist: "",
  radiologyCode: "",
  therapist: "",
  medicalSystemNumber: "",
  registerDate: "",
  answerDate: "",
  printDate: "",
  validityDate: "",
  doctorName: "",
  paidAmount: 0, // مبلغ پرداختی
  totalAmount: 0, // مبلغ کل
  withoutDiscount: true, // بدون تخفیف
  radiologyType: "",
  service: "",
};

const ReceptionInputFrom = () => {
  const [form, setForm] = useState<PatientFormData>(defultFormValue);
  const { setMessage } = useMessage();
  const {
    data: setting,
    isLoading,
    isError: settingIsError,
  } = useQuery({
    queryFn: getAllSettings,
    queryKey: ["setting"],
    staleTime: 5 * 60 * 1000, // Consider settings stable for 5 minutes
    select: (response) => response.data, // Extract data from response
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { mutateAsync: addPatient, isPending } = useMutation({
    mutationFn: addNewPatient,
    onError: (error: Error) => {
      setMessage(`خطا در ثبت بیمار: ${error.message}`, "error");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", form);
    // send to API here
  };

  const HandeSendNewPatient = async () => {
    try {
      // Validate required fields
      if (!form.name || !form.lastName || !form.nationalId || !form.phone) {
        setMessage("لطفاً فیلدهای ضروری را پر کنید.", "error");
        return;
      }

      const result = await addPatient({
        name: form.name + " " + form.lastName,
        nationalId: form.nationalId,
        phone: form.phone,
        birthDate: new Date(form.birthdate),
        gender: form.gender,
        createdBy: "60c72b2f9b1d8e1a4c8f9a12",
        fileNumber: Math.random().toString(),
        visits: [
          {
            withoutDiscount: false,
            paidAmount: form.paidAmount,
            totalAmount: form.totalAmount,
            createdBy: "60c72b2f9b1d8e1a4c8f9a12",
            doctorName: form.doctorName,
            status: "inProgress",
            radiologyType: form.radiologyType,
            service: form.service,
            insurance: form.insurance,
          },
        ],
      });

      if (!result.data) {
        throw new Error("داده‌های بیمار دریافت نشد");
      }

      setForm(defultFormValue);
      setMessage("اطلاعات با موفقیت اضافه شد.", "success");
    } catch (error) {
      console.error("Error adding patient:", error);
      setMessage(
        error instanceof Error
          ? `خطا در ثبت بیمار: ${error.message}`
          : "خطا در ثبت بیمار. لطفاً دوباره تلاش کنید.",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (settingIsError) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-50">
        خطا در دریافت تنظیمات. لطفا صفحه را رفرش کنید.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl shadow-xl p-4  bg-white"
    >
      <h2 className="text-2xl font-bold  text-blue-600  mb-4">فرم بیمار</h2>
      <h2>اطلاعات شخصی</h2>
      <div className="grid grid-cols-3  gap-1 p-4">
        {inputFieldsPersonalInfo.map((field, i) => {
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
        <div className="text-sm text-gray-700  p-2  ">
          <select
            className=" border border-gray-300 p-1  rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full h-full"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
      </div>
      <h2>اطلاعات درمان</h2>
      <div className="grid grid-cols-3  gap-1 p-4">
        {inputFieldsVisitInformation.map((field, i) => {
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
      </div>
      <div className="flex  gap-1 p-4">
        <CustomSelecte
          optiens={
            setting?.insurances?.map((insurance) => insurance.name) ?? []
          }
          key={1}
          className={" w-full"}
          name={"insurance"}
          label={"بیمه"}
          handelChenge={(value) => {
            setForm({ ...form, insurance: value });
          }}
        />
      </div>
      <div className="flex  gap-1 p-4">
        <CustomSelecte
          optiens={
            setting?.services?.map((service) => service.serviceName) ?? []
          }
          key={1}
          className={" w-full"}
          name={"insurance"}
          label={"خدمات"}
          handelChenge={(value) => {
            setForm({ ...form, service: value });
          }}
        />
      </div>
      <div className="px-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          onClick={HandeSendNewPatient}
          disabled={
            isPending ||
            !form.name ||
            !form.lastName ||
            !form.nationalId ||
            !form.phone
          }
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>در حال ثبت...</span>
            </>
          ) : (
            "ثبت اطلاعات"
          )}
        </button>
      </div>
    </form>
  );
};
export default ReceptionInputFrom;

type InputField = {
  name: keyof PatientFormData;
  label: string;
  type?: "text" | "number";
  className?: string;
  placeholder?: string;
};

const inputFieldsPersonalInfo: InputField[] = [
  { name: "name", label: "نام", type: "text", className: "" },
  { name: "lastName", label: "نام خانوادگی", type: "text", className: "" },
  { name: "nationalId", label: "کد ملی", type: "text", className: "" },
  { name: "phone", label: "تلفن", type: "text", className: "" },
  { name: "birthdate", label: "تاریخ تولد", type: "text", className: "" },
];

const inputFieldsVisitInformation: InputField[] = [
  {
    name: "doctorName",
    label: "نام کارشناس",
    type: "text",
    className: "",
  },
  {
    name: "paidAmount",
    label: "مبلغ پرداختی",
    type: "text",
    className: "",
  },
  {
    name: "totalAmount",
    label: "مبلغ کل",
    type: "text",
    className: "",
  },
  {
    name: "radiologyType",
    label: "نوع رادیولوژی",
    type: "text",
    className: "",
  },
];
