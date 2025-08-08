import { Router, Request, Response } from "express";
import {
  addInsurance,
  addService,
  getSettings,
  removeInsurance,
  removeService,
  updateGeneralSettings,
} from "../services/settings.services";
const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  const settings = await getSettings();
  res.json(settings);
});
router.post("/update", async (req: Request, res: Response) => {
  const { update } = req.body;
  const settings = await updateGeneralSettings(update);
  res.json(settings);
});
router.post("/add-insurance", async (req: Request, res: Response) => {
  const { insurance } = req.body;
  const settings = await addInsurance(insurance);
  res.json(settings);
});

router.post("/remove-insurance", async (req: Request, res: Response) => {
  const { insuranceName } = req.body;
  const settings = await removeInsurance(insuranceName);
  res.json(settings);
});
router.post("/add-service", async (req: Request, res: Response) => {
  const { service } = req.body;
  const settings = await addService(service);
  res.json(settings);
});

router.post("/remove-service", async (req: Request, res: Response) => {
  const { serviceName } = req.body;
  const settings = await removeService(serviceName);
  res.json(settings);
});
export default router;
