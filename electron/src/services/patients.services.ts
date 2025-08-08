import {
  RadiologyPatient,
  RadiologyPatients,
  IRadiologyPatient,
  RadiologyVisit,
} from "../models/patients.model";
export const CreateNewPationt = async (
  patientInfo: RadiologyPatient
): Promise<IRadiologyPatient> => {
  let patient = await RadiologyPatients.findOne({
    nationalId: patientInfo.nationalId,
  });
  if (patient) throw new Error("کاریری با این شماره ملی وجود دارد.");

  patient = new RadiologyPatients(patientInfo);
  await patient.save();
  return patient;
};

export const findPatientByNationalId = async (
  natiID: number
): Promise<IRadiologyPatient> => {
  const patient = await RadiologyPatients.findOne({ nationalId: natiID });
  if (!patient) throw new Error("کاربری با این شماره ملی وجود ندارد.");
  return patient;
};

export const getPatientsByName = async (
  name: string
): Promise<IRadiologyPatient[]> => {
  const patient = await RadiologyPatients.find({
    name: { $regex: name, $options: "i" },
  }).sort({ _id: -1 });
  return patient;
};

export const getPatientById = async (
  id: string
): Promise<IRadiologyPatient | null> => {
  const patient = await RadiologyPatients.findById(id);
  if (!patient) {
    return null;
  }
  return patient;
};

export const addNewVisitTOPatient = async (
  id: string,
  visit: RadiologyVisit
): Promise<IRadiologyPatient> => {
  const patient = await RadiologyPatients.findById(id);
  if (!patient)
    throw new Error("خطا در افزون ویزیت جدید : مراجعی با این id نداریم");
  patient.visits.push(visit);
  await patient.save();
  return patient;
};

export const getAllPatients = async (): Promise<IRadiologyPatient[]> => {
  const patient = await RadiologyPatients.find().sort({ _id: -1 });
  return patient;
};

type addNotPorps = {
  id: string;
  visitIndex: number;
  note: string;
};
export const addNote = async (
  props: addNotPorps
): Promise<IRadiologyPatient> => {
  const patient = await RadiologyPatients.findOne({ _id: props.id });
  if (!patient) throw new Error("کاربری با این _id وجود ندارد.");

  patient.visits[props.visitIndex].notes = props.note;
  await patient.save();
  return patient;
};

type addImagePorps = {
  id: string;
  visitIndex: number;
  image: string;
};
export const addImageToPatinet = async (
  props: addImagePorps
): Promise<IRadiologyPatient> => {
  const patient = await RadiologyPatients.findOne({ _id: props.id });
  if (!patient) throw new Error("کاربری با این _id وجود ندارد.");

  patient.visits[props.visitIndex - 1].photo?.push(props.image);
  await patient.save();
  return patient;
};

export const getByNationalId = async (nationalId: string) => {
  const patient = await RadiologyPatients.findOne({ nationalId: nationalId });
  if (!patient) return null;
  return patient;
};
