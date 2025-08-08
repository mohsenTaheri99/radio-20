import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError(); // گرفتن اطلاعات خطا
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-800 to-red-600 text-white">
      <h1 className="text-4xl font-bold mb-4">اوه، خطایی رخ داده است!</h1>

      <p className="text-gray-300 mb-4">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="/"
        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-300"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default ErrorPage;
