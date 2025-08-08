export type vector2D = {
  top: number;
  left: number;
};
type Gender = "male" | "female";
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
  createdBy: string;
  insurance?: string;
  service?: string;
};

export type Patient = {
  _id?: string;
  name: string;
  nationalId?: string;
  phone?: string;
  birthDate?: Date;
  gender?: Gender;
  createdAt?: Date;
  fileNumber?: string;
  createdBy: string;
  visits: RadiologyVisit[];
};

///seting types

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
  _id?: String;
  clinicName: string;
  doctorName: string;
  insurances: Insurance[];
  services: Service[];
};
