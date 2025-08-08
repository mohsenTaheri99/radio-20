import { useQuery } from "@tanstack/react-query";
import { getPatinetById } from "../../../services/api/patients.api";

type Props = {
  id: string;
};
const NavePatient = ({ id }: Props) => {
  const { data: patient, isLoading } = useQuery({
    queryFn: () => getPatinetById(id),
    queryKey: [id],
    select: (response) => response.data,
  });
  if (isLoading) return null;
  return <div className="px-4 py-2">{patient?.name}</div>;
};

export default NavePatient;
