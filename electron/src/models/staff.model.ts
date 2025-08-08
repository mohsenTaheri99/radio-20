import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
});

export const Staff = mongoose.model("staff", staffSchema);
