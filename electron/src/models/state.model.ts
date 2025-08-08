import mongoose from "mongoose";

type StateT = {
  queuePatientId: string[];
};
export interface ISettings extends Document, StateT {}

const stateSchema = new mongoose.Schema<ISettings>({
  queuePatientId: [String],
});

export const AppState = mongoose.model("state", stateSchema);
