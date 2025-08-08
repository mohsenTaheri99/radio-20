import { Router, Request, Response } from "express";
import {
  addToQueue,
  removeFromQueue,
  getQueue,
} from "../services/state.service";

const router = Router();

// GET /api/state/queue
router.get("/queue", async (_req: Request, res: Response) => {
  try {
    const queue = await getQueue();
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: "Error fetching queue" });
  }
});

// POST /api/state/queue
router.post("/queue", async (req: Request, res: Response) => {
  const { patientId } = req.body as { patientId?: string };
  if (patientId) {
    try {
      const queue = await addToQueue(patientId);
      res.json(queue);
    } catch (err) {
      res.status(500).json({ message: "Error adding to queue" });
    }
  } else {
    res.status(400).json({ message: "patientId is required" });
  }
});

// DELETE /api/state/queue
router.delete("/queue", async (req: Request, res: Response) => {
  const { patientId } = req.body as { patientId?: string };
  if (patientId) {
    try {
      const queue = await removeFromQueue(patientId);
      res.json(queue);
    } catch (err) {
      res.status(500).json({ message: "Error removing from queue" });
    }
  } else {
    res.status(400).json({ message: "patientId is required" });
  }
});

export default router;
