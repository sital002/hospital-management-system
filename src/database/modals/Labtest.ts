import mongoose, { InferSchemaType, Schema, Types } from "mongoose";
import { PatientType } from "./PatientModel";
import { LabtestFormType } from "@/app/dashboard/labtest/_utils/CBC";

const LabtestSchema = new Schema({
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  patient: {
    type: Types.ObjectId,
    ref: "Patient",
    required: [true, "Please provide a patient"],
  },
  test: {
    type: Array,
    required: [true, "Please provide a test"],
  },
});

export const Labtest =
  mongoose.models.Labtest || mongoose.model("Labtest", LabtestSchema);

export type LabtestType = {
  _id: string | Types.ObjectId;
  patient: PatientType;
  category: string;
  test: LabtestFormType[];
};
