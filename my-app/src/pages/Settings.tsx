import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../services/api/setting.api";
import AppSetting from "../features/setting/components/appSetting";
import type { AppSettingT } from "../types";

interface SettingsResponse {
  data: AppSettingT;
}

const Settings = () => {
  const {
    data: settingsResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery<SettingsResponse>({
    queryKey: ["settings"],
    queryFn: getAllSettings,
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache for 30 minutes
    retry: 2,
  });

  const settings = settingsResponse?.data;

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-red-500 flex flex-col items-center gap-4">
          <p>خطا در دریافت تنظیمات</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col pt-10 items-center overflow-y-scroll relative">
      <div className="w-9/10 max-w-160">
        <h1 className="text-xl font-bold">تنظیمات برنامه</h1>
        <div>
          {settings?._id ? (
            <AppSetting setting={settings} />
          ) : (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-600 text-center">
              تنظیمات پیدا نشد
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
