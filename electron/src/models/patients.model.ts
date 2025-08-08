import mongoose, { Schema, Document } from "mongoose";
export type Gender = "male" | "female" | "other";

export type RadiologyVisit = {
  visitDate?: Date;
  paidAmount: number; // مبلغ پرداختی
  totalAmount: number; // مبلغ کل
  withoutDiscount: boolean; // بدون تخفیف
  radiologyType: string;
  doctorName?: string;
  notes?: string;
  photo?: string[];
  status: "done" | "inProgress";
  createdBy: string | mongoose.Types.ObjectId;
  insurance?: string;
  service?: string;
};

export type RadiologyPatient = {
  name: string;
  nationalId?: string;
  phone?: string;
  birthDate?: Date;
  gender?: Gender;
  createdAt?: Date;
  fileNumber?: string;
  createdBy: string | mongoose.Types.ObjectId;
  visits: RadiologyVisit[];
};

export interface IRadiologyPatient extends Document, RadiologyPatient {}
const visitSchema = new Schema<RadiologyVisit>(
  {
    visitDate: { type: Date, default: Date.now },
    radiologyType: { type: String, required: true },
    doctorName: { type: String },
    notes: { type: String },
    photo: { type: [String] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
    },
    paidAmount: { type: Number, required: true }, // مبلغ پرداختی
    totalAmount: { type: Number, required: true }, // مبلغ کل
    withoutDiscount: { type: Boolean, required: true }, // بدون تخفیف
    insurance: { type: String },
    service: { type: String },
    status: { type: String, enum: ["done", "inProgress"] },
  },
  { _id: false }
);

const radiologyPatientSchema = new Schema<IRadiologyPatient>({
  name: { type: String, required: true, trim: true },
  nationalId: { type: String },
  phone: { type: String },
  birthDate: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"] },
  createdAt: { type: Date, default: Date.now },
  fileNumber: { type: String, unique: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff",
  },
  visits: [visitSchema],
});

export const RadiologyPatients = mongoose.model<IRadiologyPatient>(
  "radiology-patients",
  radiologyPatientSchema
);
