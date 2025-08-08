import { FaCheck, FaTimes } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { BsImage } from "react-icons/bs";

type Status = "uploaded" | "uploading" | "newImage" | "error";

interface ImageStatusProps {
  status: Status;
}

const ImageStatus = ({ status }: ImageStatusProps) => {
  const getStatusContent = () => {
    switch (status) {
      case "uploaded":
        return {
          icon: <FaCheck className="w-2.5 h-2.5 text-white" />,
          bgColor: "bg-green-500",
          tooltip: "آپلود شده",
        };
      case "uploading":
        return {
          icon: <BiLoaderAlt className="w-2.5 h-2.5 text-white animate-spin" />,
          bgColor: "bg-yellow-500",
          tooltip: "در حال آپلود",
        };
      case "error":
        return {
          icon: <FaTimes className="w-2.5 h-2.5 text-white" />,
          bgColor: "bg-red-500",
          tooltip: "خطا در آپلود",
        };
      default:
        return {
          icon: <BsImage className="w-2.5 h-2.5 text-white" />,
          bgColor: "bg-blue-500",
          tooltip: "عکس جدید",
        };
    }
  };

  const { icon, bgColor, tooltip } = getStatusContent();

  return (
    <div className="absolute left-2 bottom-2 group">
      <div
        className={`${bgColor} w-5 h-5 rounded-full flex items-center justify-center shadow-sm`}
      >
        {icon}
      </div>
      <div className="absolute bottom-0 left-6 transform   px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );
};

export default ImageStatus;
