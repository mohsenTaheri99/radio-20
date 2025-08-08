import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNotePatient,
  getPatinetById,
} from "../../../services/api/patients.api";
import TextAreaAuto from "../../TextArea/TextArea";
import PatientInfo from "./PatientInfo";
import UploadImage from "./uploadImage";
import type { Patient } from "../../../types";
import { BASE_URL } from "../../../util/axios";
import { useState } from "react";
import CustomButton from "../../../components/ui/CustomButton";
import PrintPatient from "../../../components/PrintPatient";

type Props = {
  id: string;
  display: boolean;
};

interface PatientResponse {
  data: Patient;
}

const ResultsInputFrom = ({ id, display }: Props) => {
  const {
    data: patientResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery<PatientResponse>({
    queryKey: ["patient", id],
    queryFn: () => getPatinetById(id),
    enabled: !!id,
    retry: 2,
  });

  const { mutate: addNote, isPending } = useMutation({
    mutationFn: addNotePatient,
    onSuccess: () => {
      // Refetch patient data after successful note addition
      refetch();
    },
    onError: (error: Error) => {
      console.error("Failed to add note:", error);
    },
  });

  const [textAvalue, setTextAValue] = useState<string>("");
  const patient = patientResponse?.data;

  if (!display) {
    return null;
  }

  return (
    <div
      className="flex flex-col gap-2 rounded-b-xl shadow-xl p-4 bg-white border-1 border-gray-300
    "
    >
      <div className="flex-2 flex flex-col gap-2  w-full ">
        <div className="flex flex-col gap-2 lg:flex-1">
          <h1 className="font-bold text-xl text-blue-500">اطلاعات بیمار</h1>

          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="text-red-500 p-4 flex flex-col items-center gap-4">
              <p>خطا در دریافت اطلاعات بیمار</p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                تلاش مجدد
              </button>
            </div>
          ) : !patient ? (
            <div className="text-gray-500 p-4 text-center">
              اطلاعات بیمار یافت نشد
            </div>
          ) : (
            <div className=" w-full">
              <PatientInfo patient={patient} />
            </div>
          )}
        </div>
        <div className="lg:flex-1">
          <h1 className="font-bold text-xl text-blue-500">تضیحات</h1>
          <div className=" flex flex-col gap-2 rounded-xl shadow-xl p-4 bg-white">
            <TextAreaAuto
              initValue={patient?.visits[patient.visits.length - 1].notes}
              placeholder="بنویس..."
              onChange={(value) => setTextAValue(value)}
            />
            <CustomButton
              label={isPending ? "در حال ذخیره..." : "ذخیره متن"}
              onClick={() => {
                if (!textAvalue.trim()) return;

                addNote({
                  patientId: id,
                  note: textAvalue,
                  index: patient?.visits.length ? patient.visits.length - 1 : 0,
                });
              }}
              disabled={isPending || !textAvalue.trim()}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-3 grid-cols-1  lg:flex-1 lg:grid-cols-2  ">
        <div className="flex flex-col gap-2 rounded-xl shadow-xl p-4 bg-white">
          <UploadImage
            imagesUlr={
              patient?.visits[patient?.visits.length - 1].photo?.map(
                (p) => BASE_URL + "/api/image/" + p
              ) ?? []
            }
            visit={patient?.visits.length.toString() ?? "-1"}
            name={patient?.name ?? "noname"}
            id={id}
          />
        </div>
        <PrintPatient patient={patient} />
      </div>
    </div>
  );
};

export default ResultsInputFrom;
