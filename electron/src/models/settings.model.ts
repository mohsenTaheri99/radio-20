import mongoose from "mongoose";

export type Service = {
  serviceName: string;
  price: number;
};

export type Insurance = {
  name: string; // نام بیمه
  coveragePercent: number; // درصد پرداخت بیمه (مثلاً 70)
  hasContract: boolean; // آیا مرکز درمانی با بیمه قرارداد داره یا نه
  maxCoverage?: number; // سقف پوشش هزینه (اختیاری)
  type: "base" | "supplementary"; // نوع بیمه: پایه یا تکمیلی
};

export type AppSettingT = {
  _id: String;
  clinicName: string;
  doctorName: string;
  insurances: Insurance[];
  services: Service[];
};

const insuranceSchema = new mongoose.Schema<Insurance>({
  name: { type: String, required: true },
  coveragePercent: { type: Number, required: true },
  hasContract: { type: Boolean, required: true },
  maxCoverage: { type: Number, required: true },
  type: { type: String, enum: ["base", "supplementary"] },
});

const serviceSchema = new mongoose.Schema<Service>({
  serviceName: String,
  price: String,
});

export interface ISettings extends Document, AppSettingT {}
const settingSchema = new mongoose.Schema<ISettings>({
  _id: { type: String, default: "setting" },
  clinicName: String,
  doctorName: String,
  insurances: [insuranceSchema],
  services: [serviceSchema],
});

export const AppSetting = mongoose.model("setting", settingSchema);
