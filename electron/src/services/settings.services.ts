import { Service, AppSetting, AppSettingT } from "../models/settings.model";

const SETTING_ID = "setting";

// گرفتن یا ساخت خودکار تنظیمات
export const getSettings = async (): Promise<AppSettingT> => {
  let setting = await AppSetting.findById(SETTING_ID);
  if (!setting) {
    setting = await AppSetting.create({
      _id: SETTING_ID,
      clinicName: "",
      doctorName: "",
      insurances: [],
      services: [],
    });
  }
  return setting;
};

// ویرایش تنظیمات عمومی (نام کلینیک، دکتر و ...)
export const updateGeneralSettings = async (data: Partial<AppSettingT>) => {
  return await AppSetting.findByIdAndUpdate(
    SETTING_ID,
    { $set: data },
    { new: true, upsert: true }
  );
};

// گرفتن لیست خدمات
export const getAllServices = async (): Promise<Service[]> => {
  const setting = await AppSetting.findById(SETTING_ID);
  return setting?.services ?? [];
};

// گرفتن لیست بیمه‌ها
export const getAllInsurances = async () => {
  const setting = await AppSetting.findById(SETTING_ID);
  return setting?.insurances ?? [];
};

// افزودن یک سرویس جدید
export const addService = async (service: Service) => {
  return await AppSetting.findByIdAndUpdate(
    SETTING_ID,
    { $push: { services: service } },
    { new: true, upsert: true }
  );
};

// حذف سرویس بر اساس نام
export const removeService = async (serviceName: string) => {
  return await AppSetting.findByIdAndUpdate(
    SETTING_ID,
    { $pull: { services: { serviceName } } },
    { new: true }
  );
};

// افزودن بیمه
export const addInsurance = async (insurance: AppSettingT["insurances"][0]) => {
  return await AppSetting.findByIdAndUpdate(
    SETTING_ID,
    { $push: { insurances: insurance } },
    { new: true, upsert: true }
  );
};

// حذف بیمه بر اساس نام
export const removeInsurance = async (insuranceName: string) => {
  return await AppSetting.findByIdAndUpdate(
    SETTING_ID,
    { $pull: { insurances: { name: insuranceName } } },
    { new: true }
  );
};
