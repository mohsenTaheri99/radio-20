type Props = {
  lable: string;
  value: string;
};
const PatientCard: React.FC<Props> = ({ lable, value }) => {
  return (
    <div className="text-sm text-gray-700 shadow p-1 rounded-md flex gap-2 px-5 ">
      <label className="text-gray-900">{lable + ":"}</label>
      <span className="text-gray-500">{value}</span>
    </div>
  );
};

export default PatientCard;
