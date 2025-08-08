import { NavLink, Outlet } from "react-router-dom";
import { NAV_LINKS } from "./constants";
import { useEffect } from "react";
import { getAllPatient } from "./services/api/patients.api";
import Message from "./components/Message";

function App() {
  useEffect(() => {
    getAllPatient();
  }, []);
  return (
    <div className="h-screen w-screen flex ">
      <div className=" flex flex-col items-center justify-center h-full w-60 bg-white  bg-gradient-to-r from-gray-50 to-white ">
        {NAV_LINKS.map((nl) => {
          return (
            <NavLink
              to={nl.path}
              className={({ isActive }) =>
                `
                transition-all duration-300
                pt-2 pb-2 pl-5 pr-5 mb-2  text-gray-900  gap-2 
                w-11/12 rounded-md h-fit flex items-center group 
                ${
                  isActive
                    ? "bg-blue-400 border-blue-300 text-blue-100  hover:bg-blue-400 "
                    : ""
                }
              `
              }
            >
              <div className="w-6 h-6 ">{nl.icon}</div>
              <span className=" transition-all duration-500 transform group-hover:-translate-x-2">
                {nl.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      <div
        style={{
          width: " calc(100% - 15rem )",
          // backgroundImage: "radial-gradient(#d3d3d3 1px, transparent 2px)",
          // backgroundSize: "20px 20px",

          backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.05) 0px, transparent 1px),
          linear-gradient(0deg, rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px, 20px 20px, 20px 20px",
        }}
        className=" relative bg-gray-50 shadow-md"
      >
        <Message />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
