import { app, BrowserWindow } from "electron";
import appEx from "./appEx";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/devtesting")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error  :", err));

appEx.listen(port, () => {
  console.log("listening on port ", port);
});

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL("http://localhost:5173");
  // win.loadURL("www.goole.com");
});
