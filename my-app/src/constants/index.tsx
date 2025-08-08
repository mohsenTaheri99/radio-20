import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { FaFileMedical } from "react-icons/fa6";
import { FaConciergeBell } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
export const NAV_LINKS = [
  {
    label: "صفحه اصلی",
    path: "/",
    icon: <IoMdHome className="w-full h-full" />,
  },
  {
    label: "پذیرش",
    path: "/Reception",
    icon: <FaConciergeBell className="w-full h-full p-[2px]" />,
  },
  {
    label: "جواب‌دهی",
    path: "/Results",
    icon: <MdAttachFile className="w-full h-full" />,
  },
  {
    label: "مراجعین",
    path: "/patients",
    icon: <FaFileMedical className="w-full h-full p[2px] " />,
  },
  {
    label: "دسترسی",
    path: "/profile",
    icon: <MdPerson className="w-full h-full" />,
  },
  {
    label: "تنظیمات",
    path: "/setting",
    icon: <IoMdSettings className="w-full h-full" />,
  },
] as const;
