import { AppState as StateModel } from "../models/state.model";

export const getQueue = async () => {
  const doc = await StateModel.findOne();
  return doc?.queuePatientId || [];
};

export const addToQueue = async (patientId: string) => {
  let doc = await StateModel.findOne();
  if (!doc) {
    doc = new StateModel({ queuePatientId: [patientId] });
  } else {
    if (!doc.queuePatientId.includes(patientId)) {
      doc.queuePatientId.push(patientId);
    }
  }
  await doc.save();
  return doc.queuePatientId;
};

export const removeFromQueue = async (patientId: string) => {
  const doc = await StateModel.findOne();
  if (!doc) return [];

  doc.queuePatientId = doc.queuePatientId.filter((id) => id !== patientId);
  await doc.save();
  return doc.queuePatientId;
};
