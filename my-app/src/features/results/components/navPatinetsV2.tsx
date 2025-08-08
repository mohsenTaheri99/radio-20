import React from "react";
import NavePatient from "./navPatients";

type NavPatinetsV2Props = {
  ids: Array<string>;
  curentId: string;
  onSelectId: (id: string) => void;
};

const NavPatinetsV2: React.FC<NavPatinetsV2Props> = ({
  ids,
  onSelectId,
  curentId,
}) => {
  return (
    <nav className=" rounded-lg h-fit">
      <ul className=" flex gap-2 relative ">
        {ids.map((id) => (
          <li key={id} className="">
            <button
              className={` bg-white rounded-t-md border border-gray-300 relative transition-all  cursor-pointer w-full text-left ${
                id === curentId ? "pb-1" : "mt-1"
              }`}
              onClick={() => onSelectId(id)}
            >
              <NavePatient id={id} />
              <div
                className={` absolute w-full bg-white h-3 -bottom-1 z-10 ${
                  id === curentId ? "" : " opacity-0"
                }`}
              ></div>
            </button>
          </li>
        ))}
        <div className="w-full h-[1px] bg-gray-300 absolute bottom-0"></div>
      </ul>
    </nav>
  );
};

export default NavPatinetsV2;
