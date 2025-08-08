import { useQuery } from "@tanstack/react-query";
import { ListOFPatient, SearchBar } from "../features/searchingPatients";
import { useEffect, useState } from "react";
import { sreachPatinet } from "../services/api/patients.api";
import { useMessage } from "../services/context/message.propvider";

type SearchType = "name" | "nationalId" | "all";
type Search = {
  type: SearchType;
  text: string;
};
// const dummyPatients: Patient[] = [patient, patient, patient];

const Patients = () => {
  const { setMessage } = useMessage();
  const [debouncedSearch, setDebouncedSearch] = useState<Search>({
    type: "all",
    text: "",
  });
  const [search, setSearch] = useState<Search>({
    type: "all",
    text: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: patients = [], // provide empty array as default
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["patient", debouncedSearch],
    queryFn: () =>
      sreachPatinet({ type: debouncedSearch.type, text: debouncedSearch.text }),
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    retry: 1, // Only retry once on error
    select: (response) => response,
  });
  const handelSearch = (searchParams: Search) => {
    setSearch(searchParams);
  };
  return (
    <div className="w-full h-full flex flex-col pt-10 items-center overflow-y-scroll overflow-x-hidden">
      <div className="w-9/10 max-w-160">
        <SearchBar callback={handelSearch} />
      </div>
      <div className="w-9/10 max-w-160 mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : isError ? (
          <div className="text-red-500 p-4 rounded-lg bg-red-50 text-center">
            خطا در دریافت اطلاعات. لطفا صفحه را رفرش کنید.
          </div>
        ) : !patients?.length ? (
          <div className="text-gray-500 p-4 text-center">
            {debouncedSearch.text
              ? "هیچ بیماری با این مشخصات پیدا نشد."
              : "لیست بیماران خالی است."}
          </div>
        ) : (
          <div className="relative">
            {isFetching && (
              <div className="absolute top-0 right-0 m-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
              </div>
            )}
            <ListOFPatient patients={patients} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
