import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

const PatientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  status: {
    type: String,
    enum: ["approved", "pending", "active", "inactive", "rejected"],
    default: "pending",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Please provide a gender"],
  },
  dob: {
    type: String,
    required: [true, "Please provide a dob"],
  },
  admitType: {
    type: String,
    enum: ["emergency", "normal"],
  },
  patientType: {
    type: String,
    enum: ["outpatient", "inpatient"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a contact"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
});

export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

type P = mongoose.InferSchemaType<typeof PatientSchema>;
export type PatientType = {
  _id: string | Types.ObjectId;
  name: string;
  phone: string;
  dob: string;
  address: string;
  gender: "male" | "female";
  patientType: "outpatient" | "inpatient";
  admitType: "emergency" | "normal";
};
export type PatientTypePlus = PatientType & {
  email: string;
  status: "approved" | "pending" | "active" | "inactive" | "rejected";
  password: string;
};
