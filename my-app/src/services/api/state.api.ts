import axiosInstance from "../../util/axios";

const URL = "/api/state";
export const getPatientQueue = async () => {
  const response = await axiosInstance.get<string[]>(URL + "/queue");
  return response;
};
export const addToPatientQueue = async (id: string) => {
  const response = await axiosInstance.post<string[]>(URL + "/queue", {
    patientId: id,
  });
  return response;
};
