import { useState } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import type { AppSettingT } from "../../../types";
import CustomButton from "../../../components/ui/CustomButton";
import PatientCard from "../../../components/ui/patientCard";
import InsuranceAddFrom from "./InsuranceAddFrom";
import { useMutation } from "@tanstack/react-query";
import { updateGeneralSettings } from "../../../services/api/setting.api";
import ServicesAddFrom from "./ServicesAddFrom";
type porps = {
  setting: AppSettingT;
};

const AppSetting = ({ setting }: porps) => {
  const [form, setForm] = useState<AppSettingT>(setting);
  const [showAddInsu, setShowAddInsu] = useState<boolean>(false);
  const [showAddService, setShowAddService] = useState<boolean>(false);

  if (setting === null) return <div>not set</div>;

  const { mutateAsync: updateSetting } = useMutation({
    mutationFn: updateGeneralSettings,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="rounded-xl shadow-xl p-4 flex flex-col gap-1  bg-white"
      onSubmit={() => {
        updateGeneralSettings(form);
      }}
    >
      <div className="rounded-xl shadow-xl p-4  bg-whites">
        <h2 className=" font-bold text-gray-900  p-2">اطلاعات کلینیک</h2>
        <CustomInput
          name={"clinicName"}
          label={"نام کلینیک"}
          value={form["clinicName"] as any}
          onChange={handleChange}
        />
        <CustomInput
          name={"doctorName"}
          label={"نام دکتر"}
          value={form["doctorName"] as any}
          onChange={handleChange}
        />
      </div>
      <div className="rounded-xl shadow-xl p-4 flex flex-col gap-1 bg-whites">
        <h2 className=" font-bold text-gray-900  px-2">ببمه ها</h2>

        {form.insurances.map((inshure, i) => {
          return (
            <div className="border border-gray-300  px-4 py-1   rounded-md ">
              <h2 className=" font-bold text-gray-900  px-2">
                {" "}
                {inshure.name}
              </h2>

              <div key={i} className=" flex gap-2 flex-wrap ">
                <PatientCard
                  lable={"درصد پوشش"}
                  value={`${inshure.coveragePercent}`}
                />
                <PatientCard
                  lable={"سقف پوشش"}
                  value={`${inshure.maxCoverage}`}
                />
                <PatientCard lable={"نوع بیمه"} value={inshure.type} />
              </div>
              <CustomButton
                label="حذف"
                className=" bg-red-400 text-white mt-2"
              />
              <CustomButton
                label="اصلاح"
                className=" bg-green-400 text-white  m-1 mb-0"
              />
            </div>
          );
        })}
        <div className="p-2">
          <CustomButton
            label="افزودن بیمه"
            className="w-35"
            onClick={() => setShowAddInsu(true)}
          />
        </div>
      </div>
      <div className="rounded-xl shadow-xl p-4 flex flex-col gap-1 bg-whites">
        <h2 className=" font-bold text-gray-900   px-2">خدمات</h2>

        {form.services.map((service, i) => {
          return (
            <div className="border border-gray-300  px-4 py-1  rounded-md ">
              <h2 className=" font-bold text-gray-900  p-2">
                {" "}
                {service.serviceName}
              </h2>

              <div key={i} className=" flex gap-2 flex-wrap ">
                <PatientCard lable={"قسمت"} value={`${service.price}`} />
              </div>
              <CustomButton
                label="حذف"
                className=" bg-red-400 text-white mt-2"
              />
              <CustomButton
                label="اصلاح"
                className=" bg-green-400 text-white  m-1 mb-0"
              />
            </div>
          );
        })}

        <div className="p-2">
          <CustomButton
            label="افزودن خدمت"
            className="w-35"
            onClick={() => setShowAddService(true)}
          />
        </div>
      </div>

      <InsuranceAddFrom
        show={showAddInsu}
        callback={(insurace) => {
          setForm((prev) => {
            const newFrom = { ...prev };
            newFrom.insurances.push(insurace);
            return newFrom;
          });
          setShowAddInsu(false);
        }}
      />
      <ServicesAddFrom
        show={showAddService}
        callback={(service) => {
          setForm((prev) => {
            const newFrom = { ...prev };
            newFrom.services.push(service);
            return newFrom;
          });
          setShowAddService(false);
        }}
      />

      <CustomButton label="ذخیره" type="submit" />
    </form>
  );
};
export default AppSetting;
