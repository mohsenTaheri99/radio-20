import express from "express";
import patienRout from "./routes/patients.rout";
import settingsRout from "./routes/settings.rout";
import imageRout from "./routes/image.rout";
import stateRoutes from "./routes/state.rout";

import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/image", imageRout);
app.use("/api/patient", patienRout);
app.use("/api/settings", settingsRout);
app.use("/api/state", stateRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
