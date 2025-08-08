import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { Patient } from "../types";
import { BASE_URL } from "../util/axios";

type PrintPatientProps = {
  patient: Patient | undefined;
};

export default function PrintPatient({ patient }: PrintPatientProps) {
  const cunanerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const print = useReactToPrint({ contentRef: printRef });

  useEffect(() => {
    function updateScale() {
      if (!cunanerRef.current || !contentRef.current) return;

      const parentHeight = cunanerRef.current.clientHeight;
      const parentWidth = cunanerRef.current.clientWidth;

      const childHeightPx = 297 * 3.78;
      const childWidthPx = 210 * 3.78;

      const scaleBH = parentHeight / childHeightPx;
      const scaleBW = parentWidth / childWidthPx;
      const scale = scaleBH < scaleBW ? scaleBH : scaleBW;
      contentRef.current.style.transform = `scale(${scale * 0.97})`;
      contentRef.current.style.transformOrigin = "top";

      cunanerRef.current.style.height = `${childHeightPx * scale + 80}px`;
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className="flex flex-col items-center relative bg-white  overflow-hidden rounded-md shadow-md  p-3 max-h-200"
      ref={cunanerRef}
    >
      <button
        onClick={() => print()}
        className="m-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Print A4
      </button>
      <div
        ref={contentRef}
        dir="rtl"
        className="bg-white shadow-lg border border-gray-600 p-8 
                    w-[210mm] h-[297mm]
                    print:block print:scale-[1]
                  "
      >
        <div className="w-full h-full p-5 flex flex-col items-center">
          <div>کلیتیک دکتر یزدانی</div>
          <div className="w-full border-gray-300 border-b-1 p-4">
            نام‌ بیمار:{patient?.name}
          </div>
          <div className="w-full px-4 mt-4">سرکارخانم فلانی</div>
          <div className="w-full px-4">سنوگرافی شکم و لگن</div>

          <div className="w-full p-8">
            {patient?.visits[0].notes?.split(/\r?\n/).map((t, i) => (
              <div key={i}>{t === "" ? "\u00A0" : t}</div>
            ))}
          </div>
          <div className="w-full h-[120mm]">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full place-items-center">
              {patient?.visits[0].photo?.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="w-full h-full flex justify-center items-center p-2 bg-gray-100"
                >
                  <img
                    className="w-auto h-full object-cover"
                    src={BASE_URL + "/api/image/" + p}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={printRef}
        dir="rtl"
        className="bg-white shadow-lg border border-gray-600 p-8 
                    w-[210mm] h-[297mm]
                    print:block print:scale-[1]
                  "
      >
        <div className="w-full h-full p-5 flex flex-col items-center">
          <div>کلیتیک دکتر یزدانی</div>
          <div className="w-full border-gray-300 border-b-1 p-4">
            نام‌ بیمار:{patient?.name}
          </div>
          <div className="w-full px-4 mt-4">سرکارخانم فلانی</div>
          <div className="w-full px-4">سنوگرافی شکم و لگن</div>

          <div className="w-full p-8">
            {patient?.visits[0].notes?.split(/\r?\n/).map((t, i) => (
              <div key={i}>{t === "" ? "\u00A0" : t}</div>
            ))}
          </div>
          <div className="w-full h-[120mm]">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full place-items-center">
              {patient?.visits[0].photo?.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="w-full h-full flex justify-center items-center p-2 bg-gray-100"
                >
                  <img
                    className="w-auto h-full object-cover"
                    src={BASE_URL + "/api/image/" + p}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
