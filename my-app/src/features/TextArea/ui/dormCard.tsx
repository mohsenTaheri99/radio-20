type PropsType = {
  label: string;
  data: string | number;
};

const FormCard = function ({ data, label }: PropsType) {
  return (
    <div className="p-4 ">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-gray-900 font-semibold">{data}</p>
    </div>
  );
};

export default FormCard;
