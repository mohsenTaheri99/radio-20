import type { Patient } from "../../types";
import axiosInstance from "../../util/axios";

export const addNewVisitToPatient = async (patientId: string, visit: any) => {
  const response = await axiosInstance.post<{
    message: string;
    patient: Patient;
  }>("/api/patient/add-visit", {
    patientId,
    visit,
  });
  return response;
};

export const getAllPatient = async () => {
  const response = await axiosInstance.get<Patient[]>("/api/patient/all");
  console.log(response);
  return response;
};
export const addNewPatient = async (patient: Patient) => {
  const response = await axiosInstance.post<{
    meesage: string;
    patient: Patient;
  }>("/api/patient/add-new", {
    patient: patient,
  });
  console.log(response);
  return response;
};
type addNoteProps = {
  patientId: string;
  note: string;
  index: number;
};
export const addNotePatient = async (props: addNoteProps) => {
  const response = await axiosInstance.post<{
    meesage: string;
    patient: Patient;
  }>("/api/patient/add-note", {
    patientId: props.patientId,
    note: props.note,
    index: props.index,
  });
  console.log(response);
  return response;
};

export const getPatinetBynatinalId = async (id: string) => {
  const response = await axiosInstance.get<Patient>(
    `/api/patient/by-national-id/${id}`
  );
  return response;
};
export const getPatinetById = async (id: string) => {
  const response = await axiosInstance.get<Patient>(`/api/patient/${id}`);
  return response;
};

export const getPatinetByName = async (name: string) => {
  const response = await axiosInstance.get<Patient[]>(
    `/api/patient/by-name/${name}`
  );
  return response;
};

type SearchType = "name" | "nationalId" | "all";
type Search = {
  type: SearchType;
  text: string;
};

export const sreachPatinet = async (search: Search): Promise<Patient[]> => {
  switch (search.type) {
    case "nationalId": {
      const response = await getPatinetBynatinalId(search.text);
      if (!response.data) return [];
      console.log(search.text);
      return [response.data];
    }
    case "name": {
      const response = await getPatinetByName(search.text);
      return response.data;
    }
    case "all": {
      const response = await getAllPatient();
      return response.data;
    }
    default:
      return [];
  }
};
