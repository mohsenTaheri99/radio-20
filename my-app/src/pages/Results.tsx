import { useQuery } from "@tanstack/react-query";
import { ResultFrom } from "../features/results";
import { getPatientQueue } from "../services/api/state.api";
import { useState } from "react";
import NavPatinetsV2 from "../features/results/components/navPatinetsV2";
import PageHeader from "../components/ui/PageHeader";

type QueueResponse = {
  data: string[];
};

const Results = () => {
  const { data, isLoading, isError, refetch } = useQuery<QueueResponse>({
    queryKey: ["patientQueue"],
    queryFn: getPatientQueue,
    refetchInterval: 2000,
    retry: 2, // Retry failed requests twice
  });

  const ids = data?.data ?? [];
  const [currentId, setCurrentId] = useState<string | null>(null);

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
          <p>خطا در دریافت اطلاعات</p>
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
    <div className="w-full h-full flex flex-col  items-center overflow-y-scroll overflow-x-hidden">
      <PageHeader pageName="جواب‌دهی" />
      <div className="w-9/10  mt-5  ">
        <NavPatinetsV2
          ids={ids}
          onSelectId={setCurrentId}
          curentId={currentId ?? ids[0]}
        />

        {ids.map((id: string, index: number) => (
          <ResultFrom
            key={id}
            display={id === currentId || (currentId === null && index === 0)}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};
export default Results;
