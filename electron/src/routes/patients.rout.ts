import { Router, Request, Response } from "express";
import {
  addNote,
  CreateNewPationt,
  getAllPatients,
  getByNationalId,
  getPatientById,
  getPatientsByName,
  addNewVisitTOPatient,
} from "../services/patients.services";
import { addToQueue } from "../services/state.service";
const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  const allPatients = await getAllPatients();
  res.json(allPatients);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const patient = await getPatientById(id);

    if (!patient) {
      throw new Error("بیمار پیدا نشد.");
    }

    res.status(200).json(patient);
  } catch (err) {
    console.log("error ----:", err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "خطای ناشناخته" });
    }
  }
});

router.get("/by-national-id/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const patient = await getByNationalId(id);

    if (!patient) res.status(404).json({ message: "بیماری پیدا نشد." });

    res.status(200).json(patient);
  } catch (err) {
    console.error("خطا:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
});

router.get("/by-name/:name", async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const patient = await getPatientsByName(name);
    res.status(200).json(patient);
  } catch (err) {
    console.error("خطا:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
});

router.post("/add-new", async (req: Request, res: Response) => {
  try {
    const { patient } = req.body;

    if (!patient) throw new Error("اطلاعات ناقص است.");

    const cPatient = await CreateNewPationt(patient);
    await addToQueue(String(cPatient._id));
    res.status(200).json({ meesage: "مراجع اضافه شد.", patient: cPatient });
  } catch (err) {
    console.log("error ----:", err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
});

router.post("/add-note", async (req: Request, res: Response) => {
  try {
    const { patientId, note, index } = req.body;
    console.log("body:", req.body);
    if (!patientId || !note || typeof index !== "number") {
      throw new Error("اطلاعات ناقص است.");
    }
    const patient = await addNote({
      note: note,
      visitIndex: index,
      id: patientId,
    });
    res.status(200).json({ meesage: "پرونده آپدیت شد." });
  } catch (err) {
    console.log("error ----:", err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
});
router.post("/add-visit", async (req: Request, res: Response) => {
  try {
    const { patientId, visit } = req.body;

    if (!patientId || !visit) {
      throw new Error("اطلاعات ناقص است.");
    }

    const updatedPatient = await addNewVisitTOPatient(patientId, visit);
    res
      .status(200)
      .json({ message: "ویزیت با موفقیت اضافه شد.", patient: updatedPatient });

    await addToQueue(String(updatedPatient._id));
  } catch (err) {
    console.log("error ----:", err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "خطای ناشناخته" });
    }
  }
});

export default router;
