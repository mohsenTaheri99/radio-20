import React from "react";
import type { Patient } from "../../../types";
import PatientCard from "../../../components/ui/patientCard";

type Props = {
  patients: Patient[];
};

const PatientList: React.FC<Props> = ({ patients }) => {
  if (patients.length === 0)
    return <div className=" text-center">هیچ مراجعی یافت نشد</div>;
  return (
    <div className="flex flex-col gap-4">
      {patients.map((patient, index) => (
        <div
          key={index}
          className=" rounded-xl shadow-xl p-5 space-y-3 bg-white"
        >
          <div className="text-lg font-bold text-blue-500">{patient.name}</div>
          <div className=" flex flex-wrap gap-2">
            <PatientCard lable="کد ملی" value={patient.nationalId} />
            <PatientCard lable="شماره تماس" value={patient.phone} />
            <PatientCard lable="تاریخ تولد" value={patient.birthDate} />
            <PatientCard
              lable="جنسیت"
              value={patient.gender === "male" ? "مرد" : "زن"}
            />
            <PatientCard lable="شماره پرونده" value={patient.fileNumber} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
