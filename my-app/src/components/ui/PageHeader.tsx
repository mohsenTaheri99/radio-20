type Props = {
  pageName: string;
};
const PageHeader = ({ pageName }: Props) => {
  return (
    <div className="w-full bg-white p-2 px-10 shadow-sm  bg-gradient-to-l from-gray-50 to-white">
      <h1 className="font-bold text-xl  text-blue-500">{pageName}</h1>
    </div>
  );
};
export default PageHeader;
