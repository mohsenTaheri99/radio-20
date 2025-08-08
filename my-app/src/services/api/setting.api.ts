import type { AppSettingT, Insurance, Service } from "../../types";
import axiosInstance from "../../util/axios";

export const getAllSettings = async () => {
  const response = await axiosInstance.get<AppSettingT>("/api/settings/all");
  console.log(response);
  return response;
};

export const updateGeneralSettings = async (update: Partial<AppSettingT>) => {
  const response = await axiosInstance.post<AppSettingT>(
    "/api/settings/update",
    {
      update: update,
    }
  );
  return response;
};
export const addToSettingInsurance = async (insurance: Insurance) => {
  const response = await axiosInstance.post<AppSettingT>(
    "/api/settings/add-insurance",
    {
      insurance: insurance,
    }
  );
  return response;
};
export const addToSettingService = async (service: Service) => {
  const response = await axiosInstance.post<AppSettingT>(
    "/api/settings/add-service",
    {
      service: service,
    }
  );
  return response;
};
export const removeServiceFromSetting = async (serviceName: string) => {
  const response = await axiosInstance.post<AppSettingT>(
    "/api/settings/remove-service",
    {
      serviceName: serviceName,
    }
  );
  return response;
};
export const removeInsuranceFromSetting = async (insuranceName: string) => {
  const response = await axiosInstance.post<AppSettingT>(
    "/api/settings/remove-insurance",
    {
      insuranceName: insuranceName,
    }
  );
  return response;
};
