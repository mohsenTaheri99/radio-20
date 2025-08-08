import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="p-7 h-screen flex flex-col items-center justify-center bg-gray-900 text-white ">
      <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>
      <p className="text-2xl mb-6">صفحه مورد نظر یافت نشد</p>
      <button
        onClick={goHome}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md transition-colors duration-300 shadow-lg"
      >
        بازگشت به صفحه اصلی
      </button>
      <div className="absolute bottom-8 text-gray-500">
        <p>صفحه مورد نظر شما وجود ندارد.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
