import { useEffect, useState, type ChangeEvent } from "react";
import { FcAddImage } from "react-icons/fc";
import CustomButton from "../../../components/ui/CustomButton";
import { BASE_URL } from "../../../util/axios";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import ImageStatus from "./ui/imageStatus";
type UploadStatus = "idel" | "upLading" | "seccess" | "error";
type Props = {
  id: string;
  visit: string;
  name: string;
  imagesUlr: string[];
};

type Image = {
  imageFile: File;
  status: "uploaded" | "uploading" | "newImage" | "error";
  progress: number;
};
const UploadImage = ({ id, name, visit, imagesUlr }: Props) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<UploadStatus>("idel");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) return;
    const images = Array.from(files);

    images.forEach((image) => {
      if (!image.type.startsWith("image/")) {
        setError("Only image files are allowed.");
      } else {
        setImages((perv) => {
          const newImages = [...perv];
          newImages.push({
            imageFile: image,
            status: "newImage",
            progress: 0,
          });
          return newImages;
        });
      }
    });

    setError("");
  };
  useEffect(() => {
    handelSaveFiles();
  }, [images]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const file = items[i].getAsFile();
          if (file) {
            if (file.type.startsWith("image/")) {
              console.log("Pasted file:", file);
              setImages((prev) => {
                const newImages = [...prev];
                newImages.push({
                  imageFile: file,
                  status: "newImage",
                  progress: 0,
                });
                return newImages;
              });
            }
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handelSaveFiles = async () => {
    images.forEach((image) => {
      if (image.status !== "newImage") return;
      const imageFile = image.imageFile;
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", name);
      formData.append("id", id);
      formData.append("visit", visit);
      setImages((prev) => {
        return prev.map((img) =>
          img.imageFile === imageFile
            ? { ...img, status: "uploading", progress: 100 }
            : img
        );
      });
      axios
        .post(BASE_URL + "/api/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Server Response:", res.data);
          queryClient.invalidateQueries({ queryKey: ["patient", id] });
          setImages((prev) => {
            return prev.map((img) =>
              img.imageFile === imageFile
                ? { ...img, status: "uploaded", progress: 100 }
                : img
            );
          });
          setStatus("seccess");
        })
        .catch((e) => {
          console.error("Upload Error:", e.response?.data || e.message);
          setImages((prev) => {
            return prev.map((img) =>
              img.imageFile === imageFile
                ? { ...img, status: "error", progress: 100 }
                : img
            );
          });
          setStatus("error");
        });
    });
  };

  return (
    <div className="space-y-2 relative">
      <div className=" flex-col z-0 absolute w-full h-20 border border-gray-300 rounded-xl top-0 left-0 flex justify-center items-center">
        <FcAddImage size={40} />
        <span className="text-gray-500 text-xs">اضافه کردن عکس</span>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            border-2 border-dashed border-blue-500
             rounded-xl"
          style={{
            width: "calc(100% - 10px)",
            height: "calc(100% - 10px)",
          }}
        ></div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="bg-red-400 w-full rounded-md h-20 z-10 absolute opacity-0 cursor-pointer"
      />
      <div className=" z-0  w-full h-20"></div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2 flex-wrap justify-center">
        {images.map((image) => {
          if (image.status === "uploaded") return null;
          return (
            <div className="  h-28   rounded-4xl border border-gray-300 overflow-hidden flex justify-center items-center relative">
              <img
                src={URL.createObjectURL(image.imageFile)}
                alt="Preview"
                className="w-auto h-28 "
              />
              <ImageStatus status={image.status} />
            </div>
          );
        })}
        {[...imagesUlr].reverse().map((Url) => {
          return (
            <div className="  h-28   rounded-4xl border border-gray-300 overflow-hidden flex justify-center items-center relative">
              <img src={Url} alt="Preview" className="w-auto h-28 " />
              <ImageStatus status={"uploaded"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadImage;
