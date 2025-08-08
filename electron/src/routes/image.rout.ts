import { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { addImageToPatinet } from "../services/patients.services";

const router = Router();

const imageDir = path.resolve(__dirname, "../../images");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
  destination: imageDir,
  filename: (req: Request, file, cb) => {
    // Store the original file temporarily with a timestamp
    const timestamp = new Date().getTime();
    const extension = path.extname(file.originalname);
    const tempName = `temp-${timestamp}${extension}`;
    cb(null, tempName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
  if (allowed.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No image file uploaded" });
    return;
  }

  const name = req.body.name || "unnamed";
  const id = req.body.id || "noid";
  const visit = req.body.visit || "novisit";
  const date = new Date().getTime();
  const extension = path.extname(req.file.originalname);

  const newFilename = `${name}-${id}-${visit}-${date}${extension}`;
  const oldPath = path.join(imageDir, req.file.filename);
  const newPath = path.join(imageDir, newFilename);

  try {
    fs.renameSync(oldPath, newPath);
    res.json({
      message: "File uploaded successfully",
      filename: newFilename,
      fields: req.body, // This will help you debug what fields were received
    });

    addImageToPatinet({
      image: newFilename,
      id: id,
      visitIndex: parseInt(visit, 10),
    });
  } catch (error) {
    res.status(500).json({
      error: "Error renaming file",
      details: error instanceof Error ? error.message : "Unknown error",
      receivedFields: req.body, // This will help you debug what fields were received
    });
  }
});

router.get("/:name", (req: Request, res: Response) => {
  const fileName = req.params.name;
  const filePath = path.join(imageDir, fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Image not found");
  }
});

export default router;
