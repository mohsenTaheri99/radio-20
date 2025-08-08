import PatientCard from "../../../components/ui/patientCard";

import type { Patient } from "../../../types";

type Props = {
  patient: Patient;
};
const PatientInfo = ({ patient }: Props) => {
  return (
    <div className="border-gray-300 border rounded flex-col flex p-4">
      <h1 className=" animate-popup">{patient.name}</h1>
      <div className="flex flex-wrap   p-4 gap-2">
        <PatientCard
          lable={"مبلغ پرداختی"}
          value={
            patient.visits[patient.visits.length - 1]?.paidAmount.toString() ??
            ""
          }
        />
        <PatientCard lable={"شماره تماس"} value={patient.phone ?? ""} />
        <PatientCard
          lable={"خدمات"}
          value={patient.visits[patient.visits.length - 1]?.service ?? ""}
        />
        <PatientCard
          lable={"نوع بیمه"}
          value={patient.visits[patient.visits.length - 1]?.insurance ?? ""}
        />
      </div>
    </div>
  );
};

export default PatientInfo;
